// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import VueResource from 'vue-resource'
import Vuex from 'vuex'

// components
import VueMaterial from 'vue-material'

Vue.use(VueMaterial)

Vue.use(Vuex)
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
