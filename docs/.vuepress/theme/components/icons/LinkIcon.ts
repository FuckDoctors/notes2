import type { FunctionalComponent } from 'vue'

import { h, resolveComponent } from 'vue'

export interface LinkIconProps {
  link?: string | undefined
  target?: string | undefined
  label?: string | undefined
  icon?: string | undefined
  color?: string | undefined
  size?: string | number | undefined
}

const LinkIcon: FunctionalComponent<LinkIconProps> = props => {
  const { link, target, label = '' } = props

  return link
    ? h(
        'div',
        { class: 'link-icon' },
        h(
          'a',
          {
            class: 'link',
            href: link,
            target,
            rel: 'noopener noreferrer',
            'aria-label': label,
          },
          h(resolveComponent('VPIcon'), {
            icon: props.icon,
            color: props.color,
            size: props.size,
            class: 'icon',
          })
        )
      )
    : h(
        'div',
        { class: 'link-icon' },
        h(resolveComponent('VPIcon'), {
          icon: props.icon,
          color: props.color,
          size: props.size,
        })
      )
}

LinkIcon.displayName = 'LinkIcon'

export default LinkIcon
