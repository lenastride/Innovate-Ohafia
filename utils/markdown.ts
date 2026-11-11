import MarkdownIt from 'markdown-it'

const markdown = new MarkdownIt({
  html: false,
  linkify: true,
  breaks: true,
  typographer: true,
})

markdown.renderer.rules.link_open = (tokens, idx, options, env, self) => {
  tokens[idx].attrSet('target', '_blank')
  tokens[idx].attrSet('rel', 'noopener noreferrer')
  return self.renderToken(tokens, idx, options)
}

export function renderMarkdown(value: string): string {
  return markdown.render(value)
}
