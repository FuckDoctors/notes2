/**
 * 从以下地址获得代码，自己稍微改了一下，感谢原作者分享。
 * 【教你】制作可翻转的3D卡片
 * https://juejin.cn/post/7244077531607941179
 */

export function toggleFlipped(el: HTMLDivElement) {
  el.classList.toggle('flipped')
}

export function isFlipped(el: HTMLDivElement) {
  return el.classList.contains('flipped')
}

export function calculateAngle(
  e: MouseEvent,
  wrapper: HTMLDivElement,
  dropShadowColor: string,
  glareColor: string
) {
  const front = wrapper.querySelector('.flippy-card__front') as HTMLDivElement
  const backface = wrapper.querySelector('.flippy-card__back') as HTMLDivElement

  if (front === null || backface === null) {
    return
  }

  wrapper.classList.add('animated')
  // 获取用户鼠标相对于卡片本身的x位置
  const x = Math.abs(front.getBoundingClientRect().x - e.clientX)
  // 获取相对于片的y位置
  const y = Math.abs(front.getBoundingClientRect().y - e.clientY)

  // 计算宽度和高度的一半
  const halfWidth = front.getBoundingClientRect().width / 2
  const halfHeight = front.getBoundingClientRect().height / 2
  // 创建一个角度。我已经分别除以6和4，所以效果看起来很好。
  // 改变这些数字将改变效果的深度。
  const calcAngleX = (x - halfWidth) / 6
  const calcAngleY = (y - halfHeight) / 14

  const gX = (1 - x / (halfWidth * 2)) * 100
  const gY = (1 - y / (halfHeight * 2)) * 100

  const glare = wrapper.querySelector('.glare') as HTMLDivElement
  if (glare) {
    glare.style.background = `radial-gradient(circle at ${gX}% ${gY}%, ${glareColor}, transparent)`
    glare.style.perspective = `${halfWidth * 6}px`

    if (isFlipped(wrapper)) {
      glare.style.transform = `rotateY(${180 + calcAngleX}deg) rotateX(${calcAngleY}deg) scale(1.04)`
    } else {
      glare.style.transform = `rotateY(${calcAngleX}deg) rotateX(${-calcAngleY}deg) scale(1.04)`
    }
  }

  // 并设置其容器的视角。
  wrapper.style.perspective = `${halfWidth * 6}px`
  front.style.perspective = `${halfWidth * 6}px`

  // 设置项目转换CSS属性
  front.style.transform = `rotateY(${calcAngleX}deg) rotateX(${-calcAngleY}deg) scale(1.04)`
  backface.style.transform = `rotateY(${180 + calcAngleX}deg) rotateX(${calcAngleY}deg) scale(1.04)`

  // 重新应用到阴影上，使用不同的分割线
  const calcShadowX = (x - halfWidth) / 3
  const calcShadowY = (y - halfHeight) / 6

  // 添加一个滤镜阴影——这比普通的框阴影更能表现动画效果。
  front.style.filter = `drop-shadow(${-calcShadowX}px ${-calcShadowY}px 15px ${dropShadowColor})`
  backface.style.filter = `drop-shadow(${calcShadowX}px ${-calcShadowY}px 15px ${dropShadowColor})`
}

export function resetCard(wrapper: HTMLDivElement) {
  wrapper.classList.remove('animated')

  const front = wrapper.querySelector('.flippy-card__front') as HTMLDivElement
  const backface = wrapper.querySelector('.flippy-card__back') as HTMLDivElement

  front.style.transform = `rotateY(0deg) rotateX(0deg) scale(1)`
  front.style.filter = `unset`
  backface.style.transform = `rotateY(180deg) rotateX(0deg) scale(1)`
  backface.style.filter = `unset`
  const glare = wrapper.querySelector('.glare') as HTMLDivElement
  if (glare) {
    glare.style.transform = `rotateY(0deg) rotateX(0deg) scale(1)`
  }
}
