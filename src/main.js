import Vue from 'vue'
import VueRouter from 'vue-router'
import ConfigRoute from './route.js'
import VueTap from './libs/touch.js'

Vue.use(VueTap);

// //require css
require('./common/style.css');

Vue.use(VueRouter)
var App = Vue.extend(require('./App.vue'))
var router = new VueRouter()
ConfigRoute(router)
router.start(App, '#app')

