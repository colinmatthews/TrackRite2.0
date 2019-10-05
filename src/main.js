import Vue from 'vue'
import App from './App.vue'
import VueCookies from 'vue-cookie'
Vue.use(VueCookies);

import Vuesax from 'vuesax'
import 'material-icons/iconfont/material-icons.css' //Material Icons
import 'vuesax/dist/vuesax.css'; // Vuesax
Vue.use(Vuesax)

//Ag-grid
import "../node_modules/ag-grid-community/dist/styles/ag-grid.css";
import "../node_modules/ag-grid-community/dist/styles/ag-theme-balham.css";

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


// Vuex Store
import store from './store/store'

// Vuesax Admin Filters
import './filters/filters'

// Vuejs - Vue wrapper for hammerjs
import { VueHammer } from 'vue2-hammer'
Vue.use(VueHammer)

// PrismJS
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'

import axios from 'axios'
Vue.prototype.$http = axios.create({ baseURL: 'https://trackriteapi.azure-api.net'});

// Feather font icon
require('./assets/css/iconfont.css')


Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
