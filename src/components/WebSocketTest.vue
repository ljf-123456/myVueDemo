<template>
  <Button type="success" @click="init">刷新</Button>
</template>
<script>
export default {
  methods: {

    init () {
      let socket
      if (typeof (WebSocket) === 'undefined') {
        console.log('您的浏览器不支持WebSocket')
      } else {
        console.log('您的浏览器支持WebSocket')

        socket = new WebSocket('ws://localhost:8082/productWebSocket/20')
        socket.onopen = function () {
          console.log('Socket 已打开')
        }
        socket.onmessage = function (msg) {
          var dataTemp = JSON.parse(msg.data)
          console.log(dataTemp.msg.catalogSurplus)
          // 发现消息进入    开始处理前端触发逻辑
        }
        // 关闭事件
        socket.onclose = function () {
          console.log('Socket已关闭')
        }
        //socket.send('my message');
        // 发生了错误事件
        socket.onerror = function () {
          alert('Socket发生了错误')
          // 此时可以尝试刷新页面
        }
      }
    }
  }
}
</script>

<style>
</style>
