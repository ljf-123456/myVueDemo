<template>
    <div class="echarts">
       <div ref='bar_dv' :style="{width: '300px', height: '300px'}"></div>
    </div>
</template>

<script>
export default {
  props: ['data', 'title'],
  watch: {
    data: {
      handler (newName, oldName) {
        this.init()
      },
      deep: true
      // immediate: true
    }
  },
  data () {
    return {
      data2: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
  },
  methods: {
    init () {
      this.data2 = []
      for (var i in this.data) {
        this.data2.push(i)
      }
    
      var myChart = this.$echarts.init(this.$refs.bar_dv)
      // 绘制图表
      myChart.setOption({
        title: {
          text: this.title,
          left: 'center',
          /*    top: 20, */
          textStyle: {
            color: 'gray'
          }
        },
        xAxis: {
          type: 'category',
          data: this.data2
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: this.data,
          type: 'line'
        }]
      })
    }
  },
  mounted () {
    this.init()
  }

}
</script>

<style>
</style>
