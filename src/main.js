// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import echarts from 'echarts'
import App from './App'
import router from './router'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import axios from 'axios'
import Goeasy from 'goeasy'

Vue.config.productionTip = false
Vue.use(ViewUI)
Vue.prototype.$echarts = echarts
Vue.prototype.$http = axios
Vue.prototype.$goEasy = Goeasy

Vue.prototype.$axios = axios
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.baseURL="/api"
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render:h=>h(App)
})
