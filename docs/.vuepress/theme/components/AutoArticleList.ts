import { type VNode, computed, defineComponent, h } from 'vue'

import BreadCrumb from '@theme-hope/components/BreadCrumb'
import MarkdownContent from '@theme-hope/components/MarkdownContent'
import { DropTransition } from '@theme-hope/components/transitions/index'
import ArticleList from '@theme-hope/modules/blog/components/ArticleList'
import { useArticles } from '@theme-hope/modules/blog/composables/index'

import '../styles/auto-article-list.scss'
import { useRouter } from 'vue-router'

// import { usePageData } from '@vuepress/client'

export default defineComponent({
  name: 'AutoArticleList',

  setup() {
    const articles = useArticles()
    const router = useRouter()
    // const page = usePageData()

    const currRoute = router.currentRoute

    const currArticles = computed(() => {
      return articles.value.items.filter(
        // 需要去掉本身的路径，不然多渲染一个空的列表
        item =>
          item.path.startsWith(currRoute.value.path) &&
          item.path !== currRoute.value.path
      )
    })

    return (): VNode =>
      h('div', { class: 'page blog' }, [
        h('div', { class: 'blog-page-wrapper' }, [
          h(
            'main',
            {
              class: 'auto-article-list',
              id: 'auto-article-list-main-content',
            },
            [
              h(BreadCrumb),
              h(DropTransition, { appear: true, delay: 0.24 }, () =>
                h(ArticleList, { items: currArticles.value })
              ),
            ]
          ),
        ]),
        h(DropTransition, { appear: true, delay: 0.28 }, () =>
          h(MarkdownContent)
        ),
      ])
  },
})
