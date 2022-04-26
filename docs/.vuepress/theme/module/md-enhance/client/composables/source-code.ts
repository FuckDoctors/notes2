import { computed } from 'vue'
import { useThemeData } from '@vuepress/plugin-theme-data/lib/client'

import { createGitHubUrl } from '../../../../shared/utils'

import type { Ref } from 'vue'

export const useSourceCode = (path: Ref<string>) => {
  const themeData = useThemeData()

  const demoUrl = computed(() => {
    const {
      repo,
      docsDir = 'docs',
      docsBranch = 'main',
      docsRepo = repo,
    } = themeData.value

    return createGitHubUrl(docsRepo, docsDir, docsBranch, path.value, null)
  })

  return demoUrl
}
