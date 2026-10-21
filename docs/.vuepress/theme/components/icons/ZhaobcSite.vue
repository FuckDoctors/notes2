<script setup lang="js">
// 鼠标进入时重播动画
function handleReplay() {
  const zhao = document.querySelector('.ani-zhao')
  const b = document.querySelector('.ani-b')
  const c = document.querySelector('.ani-c')
  const site = document.querySelector('.ani-site')
  const domain = document.querySelector('.ani-domain')

  // 移除动画类，强制重置时间轴
  zhao.classList.remove('ani-zhao')
  b.classList.remove('ani-b')
  c.classList.remove('ani-c')
  site.classList.remove('ani-site')
  domain.classList.remove('ani-domain')

  // 触发回流
  void zhao.offsetWidth
  void b.offsetWidth
  void c.offsetWidth
  void site.offsetWidth
  void domain.offsetWidth
  setTimeout(() => {
    // 重新加上，从头播放
    zhao.classList.add('ani-zhao')
    b.classList.add('ani-b')
    c.classList.add('ani-c')
    site.classList.add('ani-site')
    domain.classList.add('ani-domain')
  }, 4)
}
</script>

<template>
  <svg width="420" height="220" viewBox="0 0 420 120" xmlns="http://www.w3.org/2000/svg">
    <!-- 透明捕获层，用来接收mouseenter -->
    <rect id="hoverArea" width="420" height="220" fill="transparent" @mouseenter="handleReplay" />
    <!-- 上方源文本 -->
    <g>
      <text class="domain-parts ani-zhao" x="75" y="40">
        Zhao
      </text>
      <text class="domain-parts ani-b" x="150" y="40">
        B
      </text>
      <text x="170" y="40">
        in
      </text>
      <text class="domain-parts ani-c" x="205" y="40">
        c
      </text>
      <text x="220" y="40">
        hen&apos;s
      </text>
      <text class="domain-parts ani-site" x="295" y="40">
        site
      </text>
    </g>
    <!-- 目标域名：SVG画布水平居中 -->
    <text class="domain-text ani-domain" x="205" y="100">
      zhaobc.site
    </text>
  </svg>
</template>

<style scoped>
/* stylelint-disable selector-max-type */
text {
  font-size: 26px;
  fill: currentColor;
}

.domain-parts {
  font-weight: bold;
  text-decoration: underline;
}

.ani-zhao,
.ani-b,
.ani-c,
.ani-site {
  transform-origin: center;
  /* 第一段：1.5s 缩放+移动 */
  animation:
    blink-zhao 1.5s linear forwards,
    reset-pos 0s step-end forwards,
    reset-zhao 0s forwards;
  animation-delay: 0s, 1.5s, 1.5s;
}

.ani-zhao {
  animation-name: blink-zhao, reset-pos, reset-zhao;
  animation-delay: 0s, 1.5s, 1.5s;
}

.ani-b {
  animation-name: blink-b, reset-pos, reset-b;
}

.ani-c {
  animation-name: blink-c, reset-pos, kf-noop;
}

.ani-site {
  animation-name: blink-site, reset-pos, kf-noop;
}

.domain-text {
  opacity: 0;
  text-anchor: middle;
  /* 文字居中 */
}

.ani-domain {
  animation: domainFadeIn 0.6s linear forwards;
  animation-delay: 1.5s;
}

@keyframes blink-zhao {
  0% {
    text-decoration: none;
  }

  15% {
    transform: scale(1.3);
  }

  30% {
    transform: scale(1);
  }

  45% {
    transform: scale(1.3);
  }

  60% {
    transform: scale(1);
  }

  100% {
    text-decoration: none;
    text-transform: lowercase;
    transform: scale(0.8) translate(55px, 70px);
  }
}

@keyframes blink-b {
  0% {
    text-decoration: none;
  }

  15% {
    transform: scale(1.3);
  }

  30% {
    transform: scale(1);
  }

  45% {
    transform: scale(1.3);
  }

  60% {
    transform: scale(1);
  }

  100% {
    text-decoration: none;
    text-transform: lowercase;
    transform: scale(0.8) translate(45px, 70px);
  }
}

@keyframes blink-c {
  0% {
    text-decoration: none;
  }

  15% {
    transform: scale(1.3);
  }

  30% {
    transform: scale(1);
  }

  45% {
    transform: scale(1.3);
  }

  60% {
    transform: scale(1);
  }

  100% {
    text-decoration: none;
    transform: scale(0.8) translate(15px, 70px);
  }
}

@keyframes blink-site {
  0% {
    text-decoration: none;
  }

  15% {
    transform: scale(1.3);
  }

  30% {
    transform: scale(1);
  }

  45% {
    transform: scale(1.3);
  }

  60% {
    transform: scale(1);
  }

  100% {
    text-decoration: none;
    transform: scale(0.8) translate(-55px, 70px);
  }
}

/* 瞬间重置回原始位置，step-end 无动画过渡 */
@keyframes reset-pos {
  to {
    text-decoration: underline;
    transform: translate(0, 0) scale(1);
  }
}

@keyframes reset-zhao {
  to {
    text-transform: capitalize;
  }
}

@keyframes reset-b {
  to {
    text-transform: capitalize;
  }
}

@keyframes kf-noop {
}

@keyframes domainFadeIn {
  to {
    opacity: 1;
  }
}
</style>
