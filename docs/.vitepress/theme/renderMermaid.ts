type MermaidTheme = 'default' | 'dark'

let nextId = 0
let queue: Promise<void> = Promise.resolve()

// Mermaid has shared configuration. Serialize initialize + render so diagrams
// with different themes cannot overwrite each other's settings.
export function renderMermaid(source: string, theme: MermaidTheme): Promise<string> {
  const job = queue.then(async () => {
    // Loaded only on the client, when a diagram is actually rendered.
    const { default: mermaid } = await import('mermaid')

    mermaid.initialize({
      startOnLoad: false,
      theme,
      securityLevel: 'strict',
      suppressErrorRendering: true,
    })

    const { svg } = await mermaid.render(`vitepress-mermaid-${++nextId}`, source)
    return svg
  })

  // A failed diagram must not prevent later diagrams from rendering.
  queue = job.then(() => undefined, () => undefined)
  return job
}
