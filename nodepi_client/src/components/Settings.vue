<template>
  <div class="settings">
    <div>
      <md-radio v-model="colour" id="red" name="red" md-value="red" class="md-warn" @change="colour1('r')">Red</md-radio>
      <md-radio v-model="colour" id="green" name="green" md-value="green" class="md-warn" @change="colour1('g')">Green</md-radio>
      <md-radio v-model="colour" id="blue" name="blue" md-value="blue" class="md-warn" @change="colour1('b')">Blue</md-radio>
    </div>
    <div v-on:mousedown="drive('left', 1)" v-on:mouseup="drive('left', 0)">drive left</div>
    <div v-on:mousedown="drive('right', 1)" v-on:mouseup="drive('right', 0)">drive right</div>
<!-- 
    <md-switch md-theme="green" v-model="colour" @change="color" id="colour" name="my-test5" class="md-primary">Green Primary Color</md-switch> -->
    <md-switch v-model="lighton" @change="light" id="lighton" name="lighton" class="md-primary">Switch Light on/off</md-switch>
  </div>
</template>

<script>
import { lights, colourChange } from '@/helpers/resources'

export default {
  name: 'settings',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      lighton: true,
      colour: 'r'
    }
  },
  sockets: {
    helloworld: function (data) {
      console.log(data)
    }
  },
  created () {
    this.$socket.emit('drive', 'left')
  },
  methods: {
    drive (direction, speed) {
      const data = {
        'direction': direction,
        'speed': speed
      }
      this.$socket.emit('drive', data)
    },
    light () {
      return lights
        .save({ light: this.lighton })
        .then((response) => {
          console.log(response.body)
        }, (errorResponse) => {
          console.log(errorResponse)
        })
    },
    colour1 (b) {
      return colourChange
        .save({ colour: b })
        .then((response) => {
          console.log(response.body)
        }, (errorResponse) => {
          console.log(errorResponse)
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
