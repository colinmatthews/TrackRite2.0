import Vue from 'vue'
import App from './App.vue'
import VueCookies from 'vue-cookie'
Vue.use(VueCookies);

import Vuesax from 'vuesax'
import 'material-icons/iconfont/material-icons.css' //Material Icons
import 'vuesax/dist/vuesax.css'; // Vuesax
Vue.use(Vuesax)


// Vee validate 
import VeeValidate from 'vee-validate'
Vue.use(VeeValidate);

// Apex charts
import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts);

Vue.component('apexchart', VueApexCharts)

// Theme Configurations
import '../themeConfig.js'

// AgGrid Vuesax Stylex
import "./assets/scss/vuesax/extraComponents/agGridStyleOverride.scss";

// Globally Registered Components
import './globalComponents.js'


// Styles: SCSS
import './assets/scss/main.scss'


// Tailwind
import '@/assets/css/main.css';


// Vue Router
import router from './router'

let HTTPClient = axios.create({ baseURL: 'https://trackrite.azure-api.net/trackriteprod/'});

// Vuex Store
import store from './store/store'
store.$http = axios.create({ baseURL: HTTPClient })
// Vuesax Admin Filters
import './filters/filters'

// Vuejs - Vue wrapper for hammerjs
import { VueHammer } from 'vue2-hammer'
Vue.use(VueHammer)

// PrismJS
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'

import axios from 'axios'
Vue.prototype.$http = HTTPClient;

// Feather font icon
require('./assets/css/iconfont.css')


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
