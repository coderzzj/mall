import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from "fastclick"
import VueLazyLoad from "vue-lazyload"
import toast from "../src/components/common/Toast"

Vue.config.productionTip = false

// 在原型中定义事件总线
// 事件总线 是用来在没有父子关系组件之间进行通信的方式
Vue.prototype.$eventBus = new Vue()

// 使用 toast
Vue.use(toast)

// 使用 FastClick，解决移动端 300ms 延迟
// FastClick.attach(document.body)

// 图片懒加载插件
Vue.use(VueLazyLoad, {
  loading: require("../src/assets/image/lazyload-img/lazyloadimg.svg")
})

new Vue({
  el: "#app",
  router,
  store,
  render: function (h) { return h(App) }
})
