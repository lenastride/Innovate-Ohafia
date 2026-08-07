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

  if (!supabaseUrl || !supabaseKey || !resendApiKey || !communityWelcomeFrom || !communityWhatsappGroupUrl) {
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

  const welcomeResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${resendApiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: communityWelcomeFrom,
      to: [email],
      subject: 'Welcome to the Innovate Ohafia community',
      text: `Hello ${firstName},\n\nWelcome to the Innovate Ohafia community! Join our WhatsApp group here: ${communityWhatsappGroupUrl}`,
      html: `<p>Hello ${escapeHtml(firstName)},</p><p>Welcome to the Innovate Ohafia community!</p><p><a href="${communityWhatsappGroupUrl}">Join our WhatsApp group</a></p>`,
    }),
  });

  if (!welcomeResponse.ok) {
    const welcomeErrorBody = await welcomeResponse.text();
    console.error('[community-join] failed to send welcome email', welcomeResponse.status, welcomeErrorBody);
    throw createError({ statusCode: 502, statusMessage: 'Your registration was saved, but we could not send the welcome email. Please contact us for the WhatsApp link.' });
  }

  return { success: true };
});
