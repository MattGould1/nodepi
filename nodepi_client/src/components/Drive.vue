<template>
  <div class="drive">
    <div class="move">
      <div v-for="direction in move"
        v-on:touchstart="drive(direction, 1)"
        v-on:touchend="drive(direction, 0)"
        v-on:mousedown="drive(direction, 1)"
        v-on:mouseup="drive(direction, 0)">
        <div :class="direction + ' direction'"></div>
      </div>
    </div>
    <div class="steer">
      <div v-for="direction in steer"
        v-on:touchstart="drive(direction, 1)"
        v-on:touchend="drive(direction, 0)"
        v-on:mousedown="drive(direction, 1)"
        v-on:mouseup="drive(direction, 0)">
        <div :class="direction + ' direction'"></div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'drive',
  data () {
    return {
      msg: 'Drive the car!',
      move: [
        'forward',
        'backward'
      ],
      steer: [
        'left',
        'right'
      ]
    }
  },
  sockets: {
    helloworld: function (data) {
      console.log(data)
    }
  },
  created () {
  },
  methods: {
    drive (direction, speed) {
      const data = {
        'direction': direction,
        'speed': speed
      }
      this.$socket.emit('drive', data)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .drive {
    width: 300px;
    margin: 0 auto;
  }
  .move {
    width: 120px;
    float: right;
    .direction {
      width: 0;
      height: 0;
    }
    .forward {
      border-left: 50px solid transparent;
      border-right: 50px solid transparent;
      border-bottom: 50px solid blue;
      padding-top: 20px;
      margin-bottom: 20px;
    }
    .backward {
      border-left: 50px solid transparent;
      border-right: 50px solid transparent;
      border-top: 50px solid blue;
      padding-bottom: 20px;
      margin-top: 20px;
    }
  }

  .steer {
    width: 120px;
    float: left;
    margin-top: 30px;
    .left  {
      border-top: 50px solid transparent;
      border-bottom: 50px solid transparent; 
      border-right:50px solid blue;
      float: left;
    }
    .right {
      border-top: 50px solid transparent;
      border-bottom: 50px solid transparent;
      border-left: 50px solid blue;
      float: left;
      margin-left: 10px;
    }
  }
</style>
