import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import './plugins/element.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入并配置axios
import axios from 'axios'
Vue.prototype.$http = axios


Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
