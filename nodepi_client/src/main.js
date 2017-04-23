// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import VueSocketio from 'vue-socket.io'

// components
import VueMaterial from 'vue-material'

// options
Vue.http.options.root = 'http://192.168.1.10:3000/'

Vue.use(VueMaterial)
Vue.use(Vuex)
Vue.use(VueSocketio, Vue.http.options.root)
Vue.use(VueResource)

const store = new Vuex.Store({
  state: {
    user: {
      first_name: 'Matthew'
    }
  },
  mutations: {

  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
export const nodepi = new Vue({
  router,
  store,
  components: {
    VueMaterial
  }
}).$mount('#app')
