// copy from here:
// https://github.com/element-plus/element-plus/blob/dev/docs/.vitepress/vitepress/utils/index.ts

export const endingSlashRE = /\/$/

export function utoa(data: string): string {
  // btoa 编码： https://developer.mozilla.org/en-US/docs/Web/API/btoa
  // 使用 atob 解码
  return btoa(unescape(encodeURIComponent(data)))
}

export const throttleAndDebounce = (fn: () => any, delay: number) => {
  let timeout: ReturnType<typeof setTimeout>
  let called = false
  return () => {
    if (timeout) {
      clearTimeout(timeout)
    }
    if (!called) {
      fn()
      called = true
      setTimeout(() => {
        called = false
      }, delay)
    } else {
      timeout = setTimeout(fn, delay)
    }
  }
}

export function isExternal(link: string): boolean {
  return /^(https?:)?\/\//.test(link)
}

export function createGitHubUrl(
  docsRepo: string,
  docsDir: string,
  docsBranch: string,
  path: string,
  folder: string,
  ext = '.vue'
) {
  const base = isExternal(docsRepo)
    ? docsRepo
    : `https://github.com/${docsRepo}`
  return `${base.replace(endingSlashRE, '')}/edit/${docsBranch}/${
    docsDir ? `${docsDir.replace(endingSlashRE, '')}/` : ''
  }${folder || ''}${path}${ext || ''}`
}
