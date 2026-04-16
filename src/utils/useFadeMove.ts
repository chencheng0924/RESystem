import { Directive, DirectiveBinding } from 'vue'

type Direction = 'up' | 'down' | 'left' | 'right'

const fadeMove: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const direction = (binding.arg as Direction) || 'up'
    const validDirections: Direction[] = ['up', 'down', 'left', 'right']
    
    if (validDirections.includes(direction)) {
      el.classList.add(`fade-move-${direction}`)
    } else {
      console.warn(`Invalid direction: ${direction}. Using 'up' as default.`)
      el.classList.add('fade-move-up')
    }

    updateVisibility(el, binding.value)
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    updateVisibility(el, binding.value)
  }
}

function updateVisibility(el: HTMLElement, isVisible: boolean) {
  if (isVisible) {
    el.classList.remove('fade-out')
    // 使用 setTimeout 來確保 CSS 過渡效果能夠被觸發
    setTimeout(() => {
      el.classList.remove('fade-out-hidden')
    }, 10)
  } else {
    el.classList.add('fade-out')
    el.addEventListener('transitionend', () => {
      if (!el.classList.contains('fade-out')) return
      el.classList.add('fade-out-hidden')
    }, { once: true })
  }
}

export default fadeMove