import vue from 'vue'
import toastComponent from './toast.vue'
const ToastConstructor = vue.extend(toastComponent)

function toast(text, duration = 1500) {
  const toastDom = new ToastConstructor({
    el: document.createElement('div'),
    data() {
      return {
        text: text,
        show: true
      }
    }
  })
  document.body.appendChild(toastDom.$el)
  setTimeout(() => {
    toastDom.show = false
  }, duration)
}

export default toast