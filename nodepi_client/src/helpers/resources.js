import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

// Vue.http.options = {
//   root: process.env.CS_URL
// }

// // var token = '';
Vue.http.options.root = 'http://192.168.1.19:3000/'
// // Vue.http.headers.common['x-access-token'] = token;

export const lights = Vue.resource(Vue.http.options.root + 'lights')
export const colourChange = Vue.resource(Vue.http.options.root + 'colourChange')
