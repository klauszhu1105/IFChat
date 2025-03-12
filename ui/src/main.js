import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import '@/permission'
Vue.use(Element)
Vue.config.productionTip = false
//定义全局ip地址
Vue.prototype.ipaddress = 'https://8.130.141.84:9999'
Vue.prototype.proxyaddress = store.getters.proxyaddress
Vue.prototype.wssaddress = store.getters.ipaddress.replace("https://","wss://")

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


