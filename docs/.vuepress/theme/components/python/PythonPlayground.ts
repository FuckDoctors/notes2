import type { FunctionalComponent } from 'vue'
import { h } from 'vue'

import { PLAY_SVG } from './icons'

export interface PythonPlaygroundProps {
  /**
   * PythonPlayground title
   *
   * 演示标题
   */
  title?: string
  /**
   * PythonPlayground link
   *
   * 演示链接
   */
  link: string

  /**
   * Specifies a Permissions Policy for the <iframe>.
   * The policy defines what features are available to the <iframe>
   * (for example, access to the microphone, camera, battery, web-share, etc.) based on the origin of the request.
   *
   * 用于为 <iframe> 指定其权限策略。该策略根据请求的来源规定 <iframe> 可以使用哪些特性（例如，访问麦克风、摄像头、电池、web 共享等）。
   */
  allow?: string

  /**
   * Controls the restrictions applied to the content embedded in the <iframe>.
   * The value of the attribute can either be empty to apply all restrictions,
   * or space-separated tokens to lift particular restrictions.
   *
   * 控制应用于嵌入在 <iframe> 中的内容的限制。该属性的值可以为空以应用所有限制，也可以为空格分隔的标记以解除特定的限制。
   */
  sandbox?: string

  /**
   * IFrame credentialless provides a mechanism for developers to load third-party resources in <iframe>s using a new, ephemeral context.
   *
   * 设置为 true 可以将 <iframe> 设为无凭据模式。
   * https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/iframe#credentialless
   */
  credentialless: boolean
}

const PythonPlayground: FunctionalComponent<PythonPlaygroundProps> = ({
  title = '',
  link,
  allow = 'cross-origin-isolated',
  // sandbox = 'allow-downloads allow-forms allow-modals allow-popups allow-same-origin allow-scripts',
  sandbox = 'allow-scripts allow-same-origin',
  credentialless = true,
}) =>
  h('div', { class: 'vp-container vp-playground' }, [
    h('div', { class: 'vp-container-header' }, [
      title
        ? h('div', { class: 'vp-container-title' }, decodeURIComponent(title))
        : null,
      h('div', { class: 'vp-playground-actions' }, [
        h('a', {
          class: 'vp-playground-action no-external-link-icon',
          href: decodeURIComponent(link),
          target: '_blank',
          innerHTML: PLAY_SVG,
        }),
      ]),
    ]),
    h(
      'div',
      { class: 'vp-playground-container' },
      h('iframe', {
        src: decodeURIComponent(link),
        allow,
        sandbox,
        credentialless,
      })
    ),
  ])

PythonPlayground.displayName = 'PythonPlayground'

export default PythonPlayground
