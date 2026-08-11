type JoinCommunityRequest = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[\d\s+()-]+$/;
const escapeHtml = (value: string) => value.replace(/[&<>'"]/g, (character) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  "'": '&#39;',
  '"': '&quot;',
}[character] as string));

export default defineEventHandler(async (event) => {
  const body = await readBody<JoinCommunityRequest>(event);
  const firstName = body.firstName?.trim();
  const lastName = body.lastName?.trim();
  const email = body.email?.trim().toLowerCase();
  const phoneNumber = body.phoneNumber?.trim();

  if (!firstName || firstName.length > 50 || !lastName || lastName.length > 50 || !email || !emailPattern.test(email) || !phoneNumber || phoneNumber.length > 25 || !phonePattern.test(phoneNumber)) {
    throw createError({ statusCode: 400, statusMessage: 'Please provide a valid first name, last name, email address, and phone number.' });
  }

  const config = useRuntimeConfig();
  const { supabaseUrl, supabaseKey, communityMembersTable, resendApiKey, communityWelcomeFrom, communityWhatsappGroupUrl } = config;

  if (!supabaseUrl || !supabaseKey) {
    throw createError({ statusCode: 503, statusMessage: 'Community registrations are not configured yet. Please try again later.' });
  }

  const possibleTables = Array.from(new Set([communityMembersTable, 'community_members', 'members']));
  let memberResponse: Response | undefined;
  let memberErrorBody = '';
  let lastStatus = 0;

  for (const tableName of possibleTables) {
    const membersUrl = new URL(`/rest/v1/${encodeURIComponent(tableName)}`, supabaseUrl);
    membersUrl.searchParams.set('on_conflict', 'email');
    memberResponse = await fetch(membersUrl, {
      method: 'POST',
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        Prefer: 'resolution=merge-duplicates,return=minimal',
      },
      body: JSON.stringify({ first_name: firstName, last_name: lastName, email, phone_number: phoneNumber }),
    });

    if (memberResponse.ok) {
      break;
    }

    lastStatus = memberResponse.status;
    memberErrorBody = await memberResponse.text();
    if (memberResponse.status !== 404) {
      break;
    }
  }

  if (!memberResponse?.ok) {
    console.error('[community-join] failed to save member', lastStatus, memberErrorBody);
    throw createError({ statusCode: 502, statusMessage: 'We could not save your registration. Please try again.' });
  }

  let emailNotice = '';

  if (resendApiKey && communityWelcomeFrom && communityWhatsappGroupUrl) {
    try {
      const welcomeResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${resendApiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: communityWelcomeFrom,
          to: [email],
          subject: 'Welcome to the Innovate Ohafia community',
          text: `Hello ${firstName},\n\nWelcome to Innovate Ohafia! You are now part of a growing community focused on technology, creativity, and opportunity in Ohafia.\n\nJoin the WhatsApp group here: ${communityWhatsappGroupUrl}\n\nWe look forward to learning and building together.\n\nWith warm regards,\nInnovate Ohafia`,
          html: `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;font-family:Arial,sans-serif;background:#f5f7fb;color:#1f2937;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f7fb;padding:24px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 24px 60px rgba(15,23,42,0.08);">
            <tr>
              <td style="background:#004873;padding:32px;text-align:center;color:#ffffff;">
                <p style="margin:0;font-size:14px;letter-spacing:0.16em;text-transform:uppercase;color:#ff8383;">Welcome aboard</p>
                <h1 style="margin:16px 0 0;font-size:32px;line-height:1.1;font-weight:700;">Welcome to Innovate Ohafia</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:32px 32px 16px;">
                <p style="margin:0 0 18px;font-size:16px;line-height:1.75;">Hello ${escapeHtml(firstName)},</p>
                <p style="margin:0 0 18px;font-size:16px;line-height:1.75;">You are now part of a growing community focused on technology, creativity, and opportunity in Ohafia. We’re excited to share updates, events, and ways you can connect with people who are building the future.</p>
                <p style="margin:0 0 26px;font-size:16px;line-height:1.75;">Click the button below to join our WhatsApp group and start engaging with fellow members.</p>
                <p style="margin:0;text-align:center;"><a href="${communityWhatsappGroupUrl}" style="display:inline-block;padding:14px 24px;background:#D90000;color:#ffffff;text-decoration:none;font-weight:700;border-radius:999px;">Join the WhatsApp group</a></p>
              </td>
            </tr>
            <tr>
              <td style="background:#f8fafc;padding:24px 32px 32px;">
                <p style="margin:0 0 12px;font-size:14px;line-height:1.75;color:#64748b;"><strong>What to expect:</strong></p>
                <ul style="margin:0;padding-left:20px;color:#64748b;font-size:14px;line-height:1.8;">
                  <li>Community news and events</li>
                  <li>Practical technology opportunities</li>
                  <li>Inspiration for local innovation</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px 32px;color:#475569;font-size:14px;line-height:1.75;">
                <p style="margin:0;">Warmly,<br><strong>Innovate Ohafia</strong></p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`,
        }),
      });

      if (!welcomeResponse.ok) {
        const welcomeErrorBody = await welcomeResponse.text();
        console.error('[community-join] failed to send welcome email', welcomeResponse.status, welcomeErrorBody);
        emailNotice = 'Your registration was saved, but we could not send the welcome email. Please contact us for the WhatsApp link.';
      }
    } catch (error: any) {
      console.error('[community-join] welcome email request failed', error);
      emailNotice = 'Your registration was saved, but we could not send the welcome email. Please contact us for the WhatsApp link.';
    }
  } else {
    console.warn('[community-join] welcome email is not configured');
    emailNotice = 'Your registration was saved, but we could not send the welcome email at this time. Please contact us for the WhatsApp link.';
  }

  return { success: true, emailNotice };
});
