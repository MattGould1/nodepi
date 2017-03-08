<template>
  <div class="settings">
    <md-switch v-model="lighton" @change="light" id="lighton" name="lighton" class="md-primary">Switch Light on/off</md-switch>
  </div>
</template>

<script>
import { lights } from '@/helpers/resources'

export default {
  name: 'settings',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      lighton: true
    }
  },
  methods: {
    light () {
      return lights
        .save({ light: this.lighton })
        .then((response) => {
          this.posts = response.body
        }, (errorResponse) => {
          this.posts = null
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
