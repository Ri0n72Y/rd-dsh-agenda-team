<template>
  <div
    ref="container"
    class="mermaid-diagram"
    :style="minHeight ? { minHeight: `${minHeight}px` } : undefined"
  >
    <div v-if="error" class="mermaid-error" role="alert">
      <strong>Mermaid 图表渲染失败</strong>
      <p>{{ error }}</p>
      <pre>{{ code }}</pre>
    </div>
    <div v-else-if="svg" class="mermaid-svg" v-html="svg"></div>
    <p v-else class="mermaid-loading">图表加载中…</p>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useData } from 'vitepress'
import { renderMermaid } from './renderMermaid'

const props = defineProps<{ code: string }>()
const { isDark } = useData()
const container = ref<HTMLElement | null>(null)
const svg = ref('')
const error = ref('')
const minHeight = ref(0)

let version = 0
let stopWatching: (() => void) | undefined

onMounted(() => {
  stopWatching = watch(
    [isDark, () => props.code],
    async ([dark, code], previous) => {
      const current = ++version

      // Keep the previous SVG and height during a theme change.
      minHeight.value = container.value?.getBoundingClientRect().height ?? 0
      error.value = ''
      if (previous && previous[1] !== code) svg.value = ''

      try {
        const nextSvg = await renderMermaid(code, dark ? 'dark' : 'default')
        if (current !== version) return
        svg.value = nextSvg
      } catch (cause) {
        if (current !== version) return
        svg.value = ''
        error.value = cause instanceof Error ? cause.message : String(cause)
      } finally {
        if (current === version) {
          await nextTick()
          if (current === version) minHeight.value = 0
        }
      }
    },
    { immediate: true },
  )
})

onUnmounted(() => {
  version++
  stopWatching?.()
})
</script>

<style scoped>
.mermaid-diagram {
  margin: 1rem 0;
  min-width: 0;
}

.mermaid-svg {
  overflow-x: auto;
}

.mermaid-svg :deep(svg) {
  display: block;
  max-width: 100%;
  height: auto;
  margin: 0 auto;
}

.mermaid-loading {
  color: var(--vp-c-text-2);
  text-align: center;
}

.mermaid-error {
  padding: 0.75rem;
  border: 1px solid var(--vp-c-danger-2);
  border-radius: 0.5rem;
  color: var(--vp-c-text-1);
}

.mermaid-error pre {
  overflow-x: auto;
  white-space: pre-wrap;
  font-size: 0.85em;
}
</style>
