// src/types/global.d.ts

declare module '*.jpg' {
  const src: string
  export default src
}

declare module '*.jpeg' {
  const src: string
  export default src
}

declare module '*.png' {
  const src: string
  export default src
}

declare module '*.gif' {
  const src: string
  export default src
}

declare module '*.svg' {
  const src: string
  export default src
}

declare module '*.webp' {
  const src: string
  export default src
}

declare module '*.mp4' {
  const src: string
  export default src
}

declare module '*.webm' {
  const src: string
  export default src
}

interface GoatCounter {
  count: (vars?: { path?: string; title?: string; event?: boolean }) => void
  visit_count: (opts?: {
    append?: string
    type?: 'html' | 'svg' | 'png'
    path?: string
    no_branding?: boolean
    style?: string
    start?: string
    end?: string
  }) => void
}

interface Window {
  goatcounter?: GoatCounter
}
