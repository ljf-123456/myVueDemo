<style scoped>

  .layout {
    /* border: 1px solid #d7dde4; */
  /*  background: #f5f7f9; */
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }

  .layout-nav {
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
  }
  .a {
   /* border: 1px solid white; */
    height: 40px;
   /* color: #000000; */
    /* //font-size: 16px; */
   /* // color:black; */

    line-height: 40px;
  }

  .b {
    /* border: 1px solid white; */
    height: 340px;

    text-align: center;
  }
  .c {
  /*  border: 1px solid white; */
    height: 160px;
  }
  Button{
    margin-top: 30px;
  }
 .pic{
   float:left;
   margin-left: 60px;
   margin-top: 20px;
 }
 #tab{
    text-align: center;
 }
</style>
<template>
  <div class="layout">
    <Layout>
      <!-- <Header>
      </Header> -->
      <Layout :style="{}">
        <Content :style="{padding: '24px', minHeight: '400px' ,background:'white'}">
          <Row>
            <Col span="22">
            <div class="a">
              <Row>
                <Col span="6" style="text-align: center;">
                IP:
                <span>{{ip}}</span>
                </Col>
                <Col span="6" style="text-align: center;">
                操作系統版本:
                <span>{{os}}</span>
                </Col>
                <Col span="6" style="text-align: center;">
                jdk版本:
                <span>{{jdk}}</span>
                </Col>
                <Col span="6" style="text-align: center;color: gray;">
                </Col>
              </Row>
            </div>
            </Col>
            <Col span="2">
            <div class="a"></div>
            </Col>
          </Row>
          <Row>
            <Col span="22">
            <Row class="b" id="tab">

              <transition name="fade" mode="out-in">
      <!-- 实况-->
                <Col Col span="24" v-if="show">
                <!-- cpu仪表盘-->
                <Col Col span="6" id="cpu" class="pic">
                <Echart ref="child" />
                </Col>
                <!-- 内存仪表盘-->
                <Col Col span="6" id="neicun" class="pic">
                <Echart ref="child2" />
                </Col>
                <!-- 目录仪表盘-->
                <Col Col span="6" id="mulu" class="pic">
                <Echart ref="child3" />
                </Col>
                <div style="clear: both;">
                  <Button size="small" @click="tab">实时</Button>
                  <Button size="small" @click="tab1">时报</Button>
                  <Button size="small" @click="tab1">日报</Button>
                </div>
                </Col>
    <!-- 一小时的记录-->
                <Col Col span="24" v-if="show1">
                <!-- cpu折线-->
                <Col Col span="6" id="cpu" class="pic">
                <Zhexian :data='cpuHoursdata' :title='title1' ref="zchild" />
                </Col>
                <!-- 内存折现-->
                <Col Col span="6" id="neicun" class="pic">
                <Zhexian :data='neicunHoursdata' :title='title2' ref="zchild2" />
                </Col>
                <!-- 目录折现-->
                <Col Col span="6" id="mulu" class="pic">
                <Zhexian :data='yingpanHoursdata' :title='title3' ref="zchild3" />
                </Col>
                <div style="clear: both;">
                  <Button size="small" @click="tab">实时</Button>
                  <Button size="small" @click="tab1">时报</Button>
                  <Button size="small" @click="tab2">日报</Button>
                </div>
                </Col>
                <Col Col span="24" v-if="show2">
                <!-- cpu曲线-->
                <Col Col span="6" id="cpu" class="pic">
                <quxian :data='cpudaydata' :title='title1'  ref="qchild" />
                </Col>
                <!-- 内存曲线-->
                <Col Col span="6" id="neicun" class="pic">
                <quxian :data='neicundaydata' :title='title2'  ref="qchild2" />
                </Col>
                <!-- 硬盘曲线-->
                <Col Col span="6" id="mulu" class="pic">
                <quxian :data='yingpandaydata' :title='title3'  ref="qchild3" />
                </Col>
                <div style="clear: both;">
                  <Button size="small" @click="tab">实时</Button>
                  <Button size="small" @click="tab1">时报</Button>
                  <Button size="small" @click="tab2">日报</Button>
                </div>
                </Col>
              </transition>
            </Row>
            </Col>
            <Col span="2">
            <div class="b">

             <Upload action='/api/uploadFile'
                      :show-upload-list="false"
                      :data = 'filedata'
                      :before-upload = 'beforeUpload'
                      :on-success = 'fileUploadSuccess'
                      :format="['war','jar']"
                      :on-format-error="uploadFormatError"
                      >
                      <Button  type="success">上传服务</Button>
                  </Upload>
                <Spin size="large" fix v-if="spinShow"></Spin>
              <Button type="success" @click="startService">服务启动</Button>

              <Button type="success" @click="closeService">服务停止</Button>
            </div>
            </Col>
          </Row>
          <Row>
            <Col span="24">
            <Collapse v-model="value1" simple style="border: 0;">
              <Panel name="1">
                详情
                <p slot="content">
                  <template>
                    <Row>
                      <Col span="8">最大cpu:&emsp;&emsp;<span>{{cpumax}}</span></Col>
                      <Col span="8">已用cpu:&emsp;&emsp;<span>{{cpuuse}}</span></Col>
                      <Col span="8">可用cpu:&emsp;&emsp;<span>{{cpusy}}</span></Col>
                    </Row>
                    <br>
                    <Row>
                      <Col span="8">最大内存:&emsp;&emsp;<span>{{ncmax}}</span></Col>
                      <Col span="8">已用内存:&emsp;&emsp;<span>{{ncuse}}</span></Col>
                      <Col span="8">可用内存:&emsp;&emsp;<span>{{ncsy}}</span></Col>
                    </Row>
                    <br>
                    <Row>
                      <Col span="8">目录空闲空间:&emsp;&emsp;<span>{{mlmax}}</span></Col>
                      <Col span="8">目录已用空间:&emsp;&emsp;<span>{{mluse}}</span></Col>
                      <Col span="8">目录剩余空间:&emsp;&emsp;<span>{{mlsy}}</span></Col>
                    </Row>
                  </template>
                </p>
              </Panel>
              <Panel name="2" >
                {{logger}}
                <p slot="content" v-for="index of loggers">
                 {{index}}
                </p>
              </Panel>
            </Collapse>

            </Col>
          </Row>
          <Row>
            <Col span='10'>
              &emsp;
            </Col>
            <Col span='14'>
              <Page :current="index" :total="total" simple @on-change='chagepage' />
            </Col>
          </Row>

        </Content>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import Echart from './yibiaopan.vue'
import Zhexian from './zhexiantu.vue'
import quxian from './quxian.vue'
const math = require('mathjs')
export default {

  data () {
    return {
      logger: 'hehherr',
      title1: 'Cpu',
      title2: '内存',
      title3: '硬盘',
      loggers: [],
      spinShow: false,
      filedata: {
        ip: '',
        port: '',
        usr: '',
        psw: '',
        dir: '',
        s_name: ''
      },
      dataHours: [],
      dataDay: [],

      cpudaydata: [],
      neicundaydata: [],
      yingpandaydata: [],

      cpuHoursdata: [],
      neicunHoursdata: [],
      yingpanHoursdata: [],

      ws: '',
      localws: '',
      total: 50,
      index: 1,
      ip: '',
      port: '',
      s_name: '',
      show: true,
      show1: false,
      show2: false,
      serviceName: '',

      os: '',
      jdk: '',
      cpumax: '0',
      cpuuse: '0',
      cpusy: '0',
      ncmax: '0',
      ncuse: '0',
      ncsy: '0',
      mlmax: '0',
      mluse: '0',
      mlsy: '0',
      value1: '1',
      value2: '1',
      list: []
    }
  },

  methods: {
    uploadFormatError () {
      this.$Notice.warning({
        title: '文件格式错误'})
      this.spinShow = false
    },
    closeService () {
      this.logger = ''
      this.loggers = []
      this.spinShow = true
      this.$axios({
        method: 'post',
        url: '/closeService',
        data: {
          's_name': this.s_name,
          'ip': this.list[this.index - 1].s_ip,
          'port': this.list[this.index - 1].s_port,
          'user': this.list[this.index - 1].s_user,
          'psw': this.list[this.index - 1].s_psw,
          'dir': this.list[this.index - 1].s_dir
        }
      }).then(resp => {
        this.spinShow = false
        this.$Notice.success({
          title: resp.data
        })
      }).catch(resp => {

      })
    },
    startService () {
      this.logger = ''
      this.loggers = []
      this.spinShow = true
      this.$axios({
        method: 'post',
        url: '/startService',
        data: {
          's_name': this.s_name,
          'ip': this.list[this.index - 1].s_ip,
          'port': this.list[this.index - 1].s_port,
          'user': this.list[this.index - 1].s_user,
          'psw': this.list[this.index - 1].s_psw,
          'dir': this.list[this.index - 1].s_dir
        }
      }).then(resp => {
        this.spinShow = false
        this.$Notice.success({
          title: resp.data
        })
      }).catch(resp => {
        this.spinShow = false
      })
    },
    fileUploadSuccess (res, file, fileList) {
      this.spinShow = false
      if (res == 0) {
        this.$Notice.success({
          title: '上传成功'
        })
      }
    },
    beforeUpload (file) {
    /*  console.log("size=:"+file.size) */
      this.logger = ''
      this.loggers = []
      if (file.size < 40485760) {
        this.spinShow = true
        console.log(this.index)
        this.filedata.ip = this.list[this.index - 1].s_ip
        this.filedata.port = this.list[this.index - 1].s_port
        this.filedata.usr = this.list[this.index - 1].s_user
        this.filedata.psw = this.list[this.index - 1].s_psw
        this.filedata.dir = this.list[this.index - 1].s_dir
        console.log(this.s_name)
        this.filedata.s_name = this.s_name
        return true
      } else {
        this.$Message.error('文件不得大于20M')
        this.spinShow = false
      }
      return false
    },
    chagepage (index) {
      this.logger = '',
      this.loggers = [],
      this.index = index
      let that = this
      this.ws.close()
      const inn = index - 1
      this.ip = this.list[inn].s_ip
      this.port = this.list[inn].s_port
      let url1 = 'http://' + this.ip + ':' + 8085 + '/showHistrory'
      this.$axios({
        method: 'post',
        url: url1,
        data: {
          'ip': that.ip
        }
      }).then(resp => {
        // console.log(resp.data.hours)
        this.dataHours = resp.data.hours
        this.dataDay = resp.data.day
        // console.log(this.dataHours)
        // console.log(this.dataDay)
        this.cpuHoursdata = []
        this.neicunHoursdata = []
        this.yingpanHoursdata = []

        for (var i in this.dataHours) {
          /* Number(math.format(this.dataHours[i] * 100, 2) */
          this.cpuHoursdata.push(Number(math.format(this.dataHours[i].cupUse * 100, 2)))
          // this.cpuHoursdata.push(this.dataHours[i].cupUse)
          this.neicunHoursdata.push(Number(math.format(this.dataHours[i].memUse / this.dataHours[i].memTotal * 100, 2)))
          this.yingpanHoursdata.push(Number(math.format(this.dataHours[i].ygUse / this.dataHours[i].ygTotal * 100, 2)))
        }
        // console.log(this.yingpanHoursdata)
        this.cpudaydata = []
        this.neicundaydata = []
        this.yingpandaydata = []
        for (var j in this.dataDay) {
          /* Number(math.format(this.dataHours[i] * 100, 2) */
          this.cpudaydata.push(Number(math.format(this.dataDay[j].cupUse * 100, 2)))
          this.neicundaydata.push(Number(math.format(this.dataDay[j].memUse / this.dataDay[j].memTotal * 100, 2)))
          this.yingpandaydata.push(Number(math.format(this.dataDay[j].ygUse / this.dataDay[j].ygTotal * 100, 2)))
        }
        this.init()
      }).catch(resp => {

      })
    },
    tab () {
      this.show = true
      this.show1 = false
      this.show2 = false
    },
    tab1 () {
      this.show1 = true
      this.show = false
      this.show2 = false
    },
    tab2 () {
      this.show2 = true
      this.show = false
      this.show1 = false
    },
    WebSocketClose () {
      this.ws.close()
    },
    websocketsend (Data) { // 数据发送

    },

    // 初始化数据
    init () {
      /* this.$refs.zchild.zhexianData = this.dataDay */
      let that = this
      that.total = that.list.length * 10
      let url = 'ws://' + this.ip + ':' + 8085 + '/productWebSocket/20'
      let url2 = 'ws://127.0.0.1:' + 8081 + '/productWebSocket/20'
      this.ws = new WebSocket(url)
      this.ws2 = new WebSocket(url2)

      // 日志记录
      this.ws2.onopen = function () {
        console.log('日志 已打开')
      }
      this.ws2.onmessage = function (message) {
        var msg = JSON.parse(message.data)
        //这里不能用this
        that.logger = msg.msg
        that.loggers.push(msg.msg)
      }
      this.ws.onerror = function () {
        console.log('日志连接失败')
      }
      // 仪表盘
      this.ws.onopen = function () {
        console.log('Socket 已打开')
        let data = [that.ip, that.list[that.index - 1].s_dir]
        that.ws.send(data)
      }

      this.ws.onmessage = function (message) {
        var dataTemp = JSON.parse(message.data)
        var cupUse = Number(math.format(dataTemp.msg.cupUse * 100, 2))
        // console.log(cupUse)
        var memUse = Number(math.format(dataTemp.msg.memUse / dataTemp.msg.memTotal * 100, 2))
        var ygUse = Number(math.format(dataTemp.msg.ygUse / dataTemp.msg.ygTotal * 100, 2))
        // var catalogUse = dataTemp.msg.catalogUse

        // console.log(that.show)
        if (that.show) {
          that.$refs.child2.echartObj.series[0].data[0].value = memUse
          that.$refs.child.echartObj.series[0].data[0].value = cupUse
          that.$refs.child3.echartObj.series[0].data[0].value = ygUse
          that.$refs.child2.echartObj.title.text = '内存使用率'
          that.$refs.child.echartObj.title.text = 'cpu使用率'
          that.$refs.child3.echartObj.title.text = '硬盘使用率'
        }

        that.os = dataTemp.msg.os
        that.jdk = dataTemp.msg.jdk
        that.cpumax = dataTemp.msg.cupCount / 1000 + 'GHZ'
        that.cpuuse = Number(math.format((dataTemp.msg.cupUse) * 100, 2)) + '%'
        that.cpusy = Number(math.format((1 - dataTemp.msg.cupUse) * 100, 2)) + '%'

        that.ncmax = Number(math.format(dataTemp.msg.memTotal / 1024 / 1024, 2)) + 'G'
        that.ncuse = memUse + '%'
        that.ncsy = (100 - memUse) + '%'
        // console.log(dataTemp.msg)
        that.mlmax = dataTemp.msg.catalogTotal + 'G'
        that.mluse = dataTemp.msg.catalogUse + ' G'
        that.mlsy = dataTemp.msg.catalogSurplus + 'G'
      }
      this.ws.onerror = function () {
        console.log('连接失败')
      }
      this.ws.onclose = function () {
        this.spinShow = false
        that.$refs.child2.echartObj.series[0].data[0].value = 0
        that.$refs.child.echartObj.series[0].data[0].value = 0
        that.$refs.child3.echartObj.series[0].data[0].value = 0
        console.log('连接断开')
      }
    }
  },
  /* destroyed () {
    this.WebSocketClose()
  }, */

  components: {
    Echart,
    Zhexian,
    quxian
  },
  mounted () {
    /* console.log(this.$props) */

  }

}
</script>
