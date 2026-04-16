import { Directive, DirectiveBinding } from 'vue'

const testDirective: Directive = {
  updated(el: HTMLElement, binding: DirectiveBinding) {
    console.log('el', el)
    console.log('binding', binding)
    if(binding.value){
      el.querySelector('h1').classList.add('text-h1')
      el.querySelector('h3').classList.add('text-h3')
    } else {
      el.querySelector('h1').classList.remove('text-h1')
      el.querySelector('h3').classList.remove('text-h3')
    }
  },
  // 在綁定元素的父組件掛載之前調用
  beforeMount(el, binding) {
    // console.log('beforeMount')
    // el: 指令綁定的元素
    // binding: 一個包含以下屬性的對象
    // - value: 指令的綁定值
    // - oldValue: 之前的值（僅在 updated 中可用）
    // - arg: 傳給指令的參數
    // - modifiers: 修飾符對象
  },

  // 綁定元素的父組件掛載時調用
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    // console.log('el', el)
    // console.log('binding', binding)
    // const instance = binding.instance as any
    // console.log('instance', instance)
    const data = binding.value
    console.log('data', data)
    if(!data.enabled) return
  },

  // 在包含組件的 VNode 更新之前調用
  beforeUpdate(el, binding) {},

  // 在包含組件的 VNode 及其子 VNode 更新之後調用
  // updated(el: HTMLElement, binding: DirectiveBinding) {
  //   console.log('el', el)
  //   console.log('binding', binding)
  //   if(binding.value){
  //     el.querySelector('h1').classList.add('text-h1')
  //     el.querySelector('h3').classList.add('text-h3')
  //   } else {
  //     el.querySelector('h1').classList.remove('text-h1')
  //     el.querySelector('h3').classList.remove('text-h3')
  //   }
  // },

  // 在綁定元素的父組件卸載之前調用
  beforeUnmount(el, binding) {},

  // 卸載時調用
  unmounted(el, binding) {}
}

export default testDirective