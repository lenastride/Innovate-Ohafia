<script setup lang="ts">
import { renderMarkdown } from '~/utils/markdown'

const props = defineProps<{
  content: string
}>()

const html = computed(() => renderMarkdown(props.content || ''))
</script>

<template>
  <div class="markdown-content" v-html="html" />
</template>

<style scoped>
.markdown-content {
  color: #374151;
  line-height: 1.75;
}

.markdown-content :deep(> :first-child) {
  margin-top: 0;
}

.markdown-content :deep(> :last-child) {
  margin-bottom: 0;
}

.markdown-content :deep(p) {
  margin: 0.75rem 0;
}

.markdown-content :deep(h1),
.markdown-content :deep(h2),
.markdown-content :deep(h3) {
  margin: 1.5rem 0 0.75rem;
  color: #111827;
  font-weight: 700;
  line-height: 1.3;
}

.markdown-content :deep(h1) {
  font-size: 1.875rem;
}

.markdown-content :deep(h2) {
  font-size: 1.5rem;
}

.markdown-content :deep(h3) {
  font-size: 1.25rem;
}

.markdown-content :deep(ul) {
  margin: 0.75rem 0;
  padding-left: 1.5rem;
  list-style: disc;
}

.markdown-content :deep(ol) {
  margin: 0.75rem 0;
  padding-left: 1.5rem;
  list-style: decimal;
}

.markdown-content :deep(li) {
  margin: 0.35rem 0;
}

.markdown-content :deep(blockquote) {
  margin: 1rem 0;
  border-left: 4px solid #d90000;
  padding-left: 1rem;
  color: #4b5563;
  font-style: italic;
}

.markdown-content :deep(a) {
  color: #d90000;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.markdown-content :deep(strong) {
  color: #111827;
  font-weight: 700;
}

.markdown-content :deep(s) {
  text-decoration: line-through;
}

.markdown-content :deep(code) {
  border-radius: 0.25rem;
  background: #f3f4f6;
  padding: 0.1rem 0.3rem;
  font-size: 0.875em;
}

.markdown-content :deep(pre) {
  margin: 1rem 0;
  overflow-x: auto;
  border-radius: 0.5rem;
  background: #f3f4f6;
  padding: 1rem;
}

.markdown-content :deep(pre code) {
  background: transparent;
  padding: 0;
}

.markdown-content :deep(table) {
  width: 100%;
  margin: 1rem 0;
  border-collapse: collapse;
}

.markdown-content :deep(th),
.markdown-content :deep(td) {
  border: 1px solid #e5e7eb;
  padding: 0.5rem;
  text-align: left;
}

.markdown-content :deep(hr) {
  margin: 2rem 0;
  border-color: #e5e7eb;
}

.markdown-content :deep(img) {
  max-width: 100%;
  height: auto;
  margin: 1rem 0;
  border-radius: 0.5rem;
}
</style>
