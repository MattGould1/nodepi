import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

// Vue.http.options = {
//   root: process.env.CS_URL
// }

// // var token = '';
Vue.http.options.root = 'http://localhost:3000/'
// // Vue.http.headers.common['x-access-token'] = token;

export const lights = Vue.resource(Vue.http.options.root + 'lights')
export const post = Vue.resource(Vue.http.options.root + 'wp-json/wp/v2/posts')
