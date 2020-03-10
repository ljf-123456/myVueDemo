<template>
  <div class="echarts">
    <div ref='bar_dv' :style="{width: '300px', height: '300px'}"></div>
  </div>
</template>

<script>
export default {

  data () {
    return {
      mdata: '',
      echartObj: {
        title: {
          text: 'cpu使用率',
          left: 'center',
          textStyle: {
            color: 'gray'
          }
        },
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        toolbox: {

        },
        series: [{
          name: '业务指标',
          type: 'gauge',
          detail: {
            formatter: '{value}%'
          },
          data: [{
            value: 0,
            name: ''
          }]
        }]
      }
    }
  },
  watch: {
    echartObj: {
      handler (newName, oldName) {
        this.init()
      },
      deep: true
      // immediate: true
    }
  },
  methods: {
    init () {
      var myChart = this.$echarts.init(this.$refs.bar_dv)
      // var myChart = this.$echarts.init(dom)
      // 绘制图表
      myChart.setOption({
        title: this.echartObj.title,
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        toolbox: {

        },
        series: this.echartObj.series
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
