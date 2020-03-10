<style>
  .foot{
    border-top: 1px solid #263248;
    text-align: center;
    line-height: 70px;
  }
  .top{
height: 350px;
    border:1px solid saddlebrown ;

    background: #f5f7f9;
  }

  .newServ{
 text-align: center;
    line-height: 50px;
    border-bottom: 1px solid saddlebrown;
    margin-bottom:15px;
    font-size: 18px;
    color: #00A000;
  }
</style>
<template>
  <div id="oo">
    <template>
      <div style="float: left;">
        <Input v-model="imodel" placeholder="输入服务名..." style="width: 300px" /><Button icon="ios-search" @click="find"></Button>
        <Button type="success" @click="init">刷新</Button>
      </div>
      <Button type="success" style="float: right;margin-right: 30px;" @click="modal1 = true">新增服务</Button>
      <Modal v-model="modal1" :closable="false" :footer-hide="true" width="500px">
        <div class="top">
          <div class="newServ">新增服务</div>
          <div style="margin-left: 50px;">
            <Form ref="formInline" :model="formInline" :rules="ruleInline" label-position="left" :label-width="100">
              <FormItem label="服务名称" prop="name">
                <Input v-model="formInline.name" style="width: 200px;"></Input>
              </FormItem>
              <FormItem label="服务类型" prop="type">
                <Select v-model="formInline.type0" style="width: 200px;margin-right: 40px;">
                  <Option v-for="item in formInline.type" :value="item.value" :key="item.value">{{item.label}}</Option>
                </Select>
              </FormItem>
              <FormItem label="服务器说明" prop="beizhu">
                <Input v-model="formInline.beizhu" type="textarea" :rows="3" style="width:250px" maxlength="100"
                  show-word-limit></Input>
              </FormItem>
              <FormItem>
                <Button type="primary" @click="handleSubmit('formInline')">添加</Button>
                <Button type="success" @click="close" style="margin-left: 50px;">取消</Button>
              </FormItem>
            </Form>
          </div>
        </div>
      </Modal>
      <br />
      <br />
    </template>
    <div style="clear: both;"></div>
    <Table border :columns="columns12" :data="data6">
      <template slot-scope="{ row }" slot="name">
        <strong>{{ row.name }}</strong>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Tooltip content="移除该服务" placement="top">
          <Button type="error" size="small" icon="md-close" @click="deleteS(index)"></Button>
        </Tooltip>
        <Tooltip content="查看服务器信息" placement="top">
          <Button type="success" icon="md-eye" size="small" @click="seeView(index)"></Button>
        </Tooltip>
        <Tooltip content="绑定新的服务器" placement="top">
          <Button type="success" icon="md-add" size="small" @click="bangding(index)"></Button>
        </Tooltip>
        <Tooltip content="服务器解绑" placement="top">
          <Button type="error" icon="ios-alert" size="small" @click="jiebangMethod(index)"></Button>
        </Tooltip>
      </template>
    </Table>
    <Page :total="total" :current.sync="current" :page-size="pageSize" show-elevator @on-change="changePage" />
    <Modal v-model="modal2" width="800" @on-ok="ok">
      <zhuce v-bind:data7="data7" v-on:changeChild="changeChild" ref="commonChild"></zhuce>
    </Modal>
    <Modal v-model="modal4"  width="800" @on-ok="jiebangOk">
      <Table border :columns="columns13" :data="jiebang" @on-selection-change="handleSelectRow()" ref="selection">
        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
        </template>
      </Table>
    </Modal>
    <Modal v-model="modal3" :footer-hide='true'   width="1400" >
      <div slot="close"><Button @click='closeM' style='border: 0;'>X</Button></div>
     <views ref="views1" >
       </views>
    </Modal>
  </div>
  </div>
</template>

<script>
import zhuce from './zhuce.vue'
import views from './views.vue'
const math = require('mathjs')
export default {
  components: {
    zhuce,
    views
  },
  mounted: function () {
    this.init()
  },
  data () {
    return {
      selectData: [],
      modal4: false,
      intdex: 0,
      jiebang: [],
      ip: '',
      port: '',
      sername: '',
      items: [],
      modal2: false,
      modal3: false,
      pageSize: 10,
      total: 0,
      current: 1,
      formInline: {
        beizhu: '',
        name: '',
        type0: '',
        type: [{
          value: 'run',
          label: 'run'
        },
        {
          value: 'update',
          label: 'update'
        },
        {
          value: 'delet',
          label: 'delet'
        }
        ]
      },
      ruleInline: {
        name: [{
          required: true,
          message: '请输入服务名称',
          trigger: 'blur'
        },
        {
          validator (rule, value, callback, source, options) {
            const errors = []
            let rules = /^[a-zA-Z0-9\u4E00-\u9FA5]{2,6}$/
            if (!rules.test(value)) {
              errors.push('请输入2-10位英文+数字名称')
            }
            callback(errors)
          }
        }
        ]
      },
      modal1: false,
      columns13: [
        {
          title: '序号',
          type: 'index'
        },
        {
          title: 'IP',
          key: 's_ip'
        },
        {
          title: 'Port',
          key: 's_port'
        },
        {
          title: 'User',
          key: 's_user'
        },
        {
          title: 'Password',
          key: 's_psw'
        },
        {
          title: 'Dir',
          key: 's_dir'
        },
        {
          title: '选择',
          type: 'selection'
        }
      ],
      columns12: [{
        title: '服务名',
        key: 'sName'
      },
      {
        title: '服务器个数',
        key: 'sNum'
      },
      {
        title: '说明',
        key: 'msg'
      },
      {
        title: '服务类型',
        key: 'sType'
      },
      {
        title: '操作',
        slot: 'action',
        width: 150,
        align: 'center'
      }
      ],
      data6: [],
      data7: [],
      sname: '',
      data7temp: [],
      data6temp: [],
      imodel: ''
    }
  },
  methods: {
    jiebangOk () {
      let index = this.intdex
      this.$axios({
        method: 'post',
        url: '/jiebang',
        data: {
          'select': this.selectData,
          's_name': this.data6temp[index].s_name
        }
      }).then(resp => {
        if (resp.data) {
          this.$Notice.success({
            title: '服务器解绑成功',
            desc: false ? '' : '服务器:' + this.selectData.length + '   个'
          })
          this.init()
        } else {
          this.$Message.error('解绑失败')
        }
      }).catch(resp => {

      })
    },
    // 选中更改数据
    handleSelectRow () {
      this.selectData = this.$refs.selection.getSelection()
    },

    jiebangMethod (index) {
      this.intdex = index
      this.$axios({
        method: 'post',
        url: '/seebangding',
        data: {
          'sname': this.data6temp[index].s_name
        }
      }).then(resp => {
        this.jiebang = resp.data.list
      }).catch(resp => {

      })
      this.modal4 = true
    },
    // 关闭窗口
    closeM () {
      this.$refs.views1.ws.close()
    },
    registerComponent (port, ip, sname) {
      console.log(ip)
      let url1 = 'http://' + ip + ':' + 8085 + '/showHistrory'
      this.$axios({
        method: 'post',
        url: url1,
        data: {
          'ip': ip
        }
      }).then(resp => {
        // console.log(resp.data.hours)
        this.$refs.views1.dataHours = resp.data.hours
        this.$refs.views1.dataDay = resp.data.day

        this.$refs.views1.cpuHoursdata = []
        this.$refs.views1.neicunHoursdata = []
        this.$refs.views1.yingpanHoursdata = []

        for (var i in resp.data.hours) {
          /* Number(math.format(this.dataHours[i] * 100, 2) */
          this.$refs.views1.cpuHoursdata.push(Number(math.format(this.$refs.views1.dataHours[i].cupUse * 100, 2)))
          // this.cpuHoursdata.push(this.dataHours[i].cupUse)
          this.$refs.views1.neicunHoursdata.push(Number(math.format(this.$refs.views1.dataHours[i].memUse / this.$refs.views1.dataHours[i].memTotal * 100, 2)))
          this.$refs.views1.yingpanHoursdata.push(Number(math.format(this.$refs.views1.dataHours[i].ygUse / this.$refs.views1.dataHours[i].ygTotal * 100, 2)))
        }
        this.$refs.views1.cpudaydata = []
        this.$refs.views1.neicundaydata = []
        this.$refs.views1.yingpandaydata = []

        for (var j in resp.data.day) {
          console.log('here')
          /* Number(math.format(this.dataHours[i] * 100, 2) */
          this.$refs.views1.cpudaydata.push(Number(math.format(this.$refs.views1.dataDay[j].cupUse * 100, 2)))
          this.$refs.views1.neicundaydata.push(Number(math.format(this.$refs.views1.dataDay[j].memUse / this.$refs.views1.dataDay[j].memTotal * 100, 2)))
          this.$refs.views1.yingpandaydata.push(Number(math.format(this.$refs.views1.dataDay[j].ygUse / this.$refs.views1.dataDay[j].ygTotal * 100, 2)))
        }
        this.$refs.views1.init()
        // console.log(this.$refs.views1.dataDay)
      }).catch(resp => {

      })
      this.$refs.views1.ip = ip
      this.$refs.views1.port = port
      this.$refs.views1.init()
    },
    seeView (index) {
      
      this.$axios({
        method: 'post',
        url: '/seebangding',
        data: {
          'sname': this.data6temp[index].s_name
        }
      }).then(resp => {
        const list = resp.data.list
        this.$refs.views1.list = resp.data.list
        this.$refs.views1.s_name = this.data6temp[index].s_name
        console.log()
        this.registerComponent(list[0].s_port, resp.data.list[0].s_ip, this.data6temp[index].s_name)

        this.modal3 = true
      }).catch(resp => {
        console.log('--------------')
      })
    },
    ok () {
      const selectData = this.$refs.commonChild.selectData
      // console.log(selectData)
      this.$axios({
        method: 'post',
        url: 'bangding',
        data: {
          'list': selectData,
          'name': this.sname
        }
      }).then(resp => {
        if (resp.data) {
          this.$Notice.success({
            title: '服务器绑定成功',
            desc: false ? '' : '服务器:' + selectData.length + '   个'
          })
          this.init()
        }
      }).catch(resp => {

      })
    },
    changeChild (msg) {
      // console.log(msg[0])
      this.$axios({
        method: 'post',
        url: '/bdServer',
        data: {
          'name': this.sname,
          'current': msg[0],
          'pageSize': msg[1]
        }
      }).then(resp => {
        this.$refs.commonChild.total = resp.data.count
        this.data7temp = []
        this.data7 = []
        this.data7temp = resp.data.list
        for (var i in this.data7temp) {
          this.data7.push({
            's_ip': this.data7temp[i].s_ip,
            's_port': this.data7temp[i].s_port,
            's_user': this.data7temp[i].s_user,
            's_psw': this.data7temp[i].s_psw,
            's_dir': this.data7temp[i].s_dir
          })
        }
      }).catch(resp => {

      })
    },

    bangding (index) {
      this.modal2 = true
      this.sname = this.data6temp[index].s_name
      this.$axios({
        method: 'post',
        url: '/bdServer',

        data: {
          'name': this.sname,
          'current': this.$refs.commonChild.current,
          'pageSize': this.$refs.commonChild.pageSize
        }
      }).then(resp => {
        this.$refs.commonChild.total = resp.data.count
        this.data7temp = []
        this.data7 = []
        this.data7temp = resp.data.list

        for (var i in this.data7temp) {
          this.data7.push({
            's_ip': this.data7temp[i].s_ip,
            's_port': this.data7temp[i].s_port,
            's_user': this.data7temp[i].s_user,
            's_psw': this.data7temp[i].s_psw,
            's_dir': this.data7temp[i].s_dir
          })
        }
      }).catch(resp => {

      })
    },
    changePage (index) {
      this.$axios({
        method: 'post',
        url: '/showMsg',
        data: {
          'currPage': index,
          'pageSize': this.pageSize
        }
      }).then(resp => {
        this.data6 = []
        this.data6temp = []
        this.data6temp = resp.data.list
        this.total = resp.data.count
        for (var i in this.data6temp) {
          this.data6.push({
            'sName': this.data6temp[i].s_name,
            'sNum': this.data6temp[i].s_num,
            'msg': this.data6temp[i].s_shuoming,
            'sType': this.data6temp[i].s_type
          })
        }
      }).catch(er => {

      })
    },
    deleteS (index) {
      this.$Modal.confirm({
        title: '是否删除',
        content: '<p>删除后不可恢复</p>',
        onOk: () => {
          this.$axios({
            method: 'post',
            url: '/deleteService',
            data: {
              's_name': this.data6[index].sName,
              's_num': this.data6[index].sNum,
              's_type': this.data6[index].sType,
              's_shuoming': this.data6[index].msg
            }
          }).then(resp => {
            if (resp.data) {
              this.$Notice.success({
                title: '删除成功',
                desc: false ? '' : '服务名:' + this.data6[index].sName
              })
              this.init()
            } else {
              this.$Message.info('删除失败，请检查网络')
            }
          }).catch(er => {
            alert(er)
          })
        },
        onCancel: () => {

        }
      })
    },
    init () {
      let currPage = 1
      this.current = 1
      this.data6 = []
      this.data6temp = []
      let that = this
      that.$axios({
        method: 'post',
        url: '/showMsg',
        data: {
          'currPage': currPage,
          'pageSize': this.pageSize
        }
      }).then(resp => {
        that.data6temp = resp.data.list
        that.total = resp.data.count
        for (var i in this.data6temp) {
          this.data6.push({
            'sName': this.data6temp[i].s_name,
            'sNum': this.data6temp[i].s_num,
            'msg': this.data6temp[i].s_shuoming,
            'sType': this.data6temp[i].s_type
          })
        }
      }).catch(er => {
        alert(er)
      })
    },
    find () {
      this.$axios({
        method: 'post',
        url: '/findService',
        data: {
          's_name': this.imodel
        }
      }).then(resp => {
        this.data6 = []
        this.data6temp = []
        this.total = 0
        this.data6temp = resp.data
        this.imodel = ''
        console.log(resp.data)
        if (!this.data6temp.length == 0) {
          this.total = 1
          this.data6.push({
            'sName': this.data6temp[0].s_name,
            'sNum': this.data6temp[0].s_num,
            'msg': this.data6temp[0].s_shuoming,
            'sType': this.data6temp[0].s_type
          })
        }
      }).catch(er => {
        alert(er)
      })
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'post',
            url: '/insertService',
            data: {
              's_name': this.formInline.name,
              's_type': this.formInline.type0,
              's_shuoming': this.formInline.beizhu
            }
          }).then(resp => {
            if (resp.data) {
              this.$Notice.success({
                title: '添加成功',
                desc: false ? '' : '服务名：' + this.formInline.name
              })

              this.init()
              this.modal1 = false
            } else {
              this.$Message.info('添加失败，该服务已存在，或网络故障')
            }
          }).catch(er => {
            alert(er)
          })
        } else {
          // 验证失败
          this.$Message.error('失败!')
        }
      })
    },
    close () {
      this.modal1 = false
    },
    show (index) {
      this.$Modal.info({
        title: 'User Info',
        content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
      })
    },
    remove (index) {
      this.data6.splice(index, 1)
    }

  }

}
</script>
<style>
  .add {
    padding: 50px;
  }
</style>
