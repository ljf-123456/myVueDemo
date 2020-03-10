<style>
  .newServ{
    text-align: center;
    line-height: 50px;
    border-bottom: 1px solid saddlebrown;
    margin-bottom:15px;
    font-size: 18px;
    color: #00A000;
      }
  .top1{
    height: 420px;
    border:1px solid saddlebrown ;

    background: #f5f7f9;
  }
</style>
<template>
  <div>
    <div style="float: left;">
      <Input v-model="model2" placeholder="输入服务器IP..." style="width: 300px" /><Button icon="ios-search" @click="seracho"></Button>
      <Button type="success" @click="init">刷新</Button>
    </div>

    <Button type="success" style="float: right;margin-right: 30px;" @click="modal1 = true"  >新增服务器</Button>
    <div style="clear: both;height: 10px;"></div>
    <Modal  v-model="modal1" :closable="false":footer-hide='true' width="700px">
      <div class="top1">
        <div class="newServ" >新增服务器</div>
        <div style="margin-left: 50px;">
        <Form ref="formInline" :model="formInline" :rules="ruleInline" label-position="left" :label-width="100" inline>
                <FormItem label="IP" prop="ip">
                    <Input v-model="formInline.ip" width="150px"></Input>
                </FormItem>
                <FormItem label="端口" prop="port">
                    <Input v-model="formInline.port"></Input>
                </FormItem>
                <FormItem label="用户名" prop="user">
                    <Input v-model="formInline.user"></Input>
                </FormItem>
                <FormItem label="密码" prop="psw">
                    <Input v-model="formInline.psw"></Input>
                </FormItem>
                <FormItem label="Dir" prop="dir">
                    <Input v-model="formInline.dir"></Input>
                </FormItem>
                <FormItem label="服务器说明" prop="beizhu">
                    <Input v-model="formInline.beizhu" type="textarea" :rows="4" style="width:400px"maxlength="100" show-word-limit></Input>
                </FormItem>
                <FormItem>
                  <Button type="primary" @click="handleSubmit('formInline')">添加</Button>
                  <Button type="success" @click="close" style="margin-left: 200px;">取消</Button>
                </FormItem>
         </Form>
         </div>
      </div>
    </Modal>
    <Table border :columns="columns12" :data="data6">
      <template slot-scope="{ row }" slot="name">
        <strong>{{ row.name }}</strong>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Tooltip content="删除该服务器" placement="top">
          <Button type="error" size="small" @click="confirm(index)"  >删除</Button>

        </Tooltip>
      </template>
    </Table>
    <Page :total="total" :current.sync="current" :page-size="pageSize" show-elevator @on-change="changePage"/>
  </div>
</template>

<script>
export default {

  mounted: function () {
    this.init()
  },
  methods: {
    changePage (index) {
      this.$axios({
        method: 'post',
        url: '/showServerMsg',
        data: {
          'currPage': index,
          'pageSize': this.pageSize
        }
      }).then(resp => {
        this.data6 = []
        this.data6temp = []
        this.data6temp = resp.data.list
        this.total = resp.data.count
        console.log(resp.data)
        for (var i in this.data6temp) {
          this.data6.push({
            'ip': this.data6temp[i].s_ip,
            'port': this.data6temp[i].s_port,
            'user': this.data6temp[i].s_user,
            'psw': this.data6temp[i].s_psw,
            'dir': this.data6temp[i].s_dir
          })
        }
      }).catch(er => {

      })
    },
    init () {
      let currPage = 1
      this.current = 1
      this.data6 = []
      this.data6temp = []
      let that = this
      console.log(this.$route.path)
      that.$axios({
        method: 'post',
        url: '/showServerMsg',
        data: {
          'currPage': currPage,
          'pageSize': this.pageSize
        }
      }).then(resp => {
        that.data6temp = resp.data.list
        that.total = resp.data.count

        for (var i in this.data6temp) {
          this.data6.push({
            'ip': this.data6temp[i].s_ip,
            'port': this.data6temp[i].s_port,
            'user': this.data6temp[i].s_user,
            'psw': this.data6temp[i].s_psw,
            'dir': this.data6temp[i].s_dir
          })
        }
      }).catch(er => {
        alert(er)
      })
    },
    seracho () {
      let that = this
      that.$axios({
        method: 'post',
        url: '/seracho',
        data: {
          's_ip': this.model2
        }
      }).then(resp => {
        this.data6 = []
        this.data6temp = []
        this.data6temp = resp.data
        this.total = 0

        if (!this.data6temp.length == 0) {
          this.total = 1
          this.data6.push({
            'ip': this.data6temp[0].s_ip,
            'port': this.data6temp[0].s_port,
            'user': this.data6temp[0].s_user,
            'psw': this.data6temp[0].s_psw,
            'dir': this.data6temp[0].s_dir
          })
          this.model2 = ''
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
            url: '/insert',
            data: {
              's_ip': this.formInline.ip,
              's_port': this.formInline.port,
              's_user': this.formInline.user,
              's_psw': this.formInline.psw,
              's_dir': this.formInline.dir,
              's_beizhu': this.formInline.beizhu
            }
          }).then(resp => {
            if (resp.data) {
              this.$Notice.success({
                title: '成功添加',
                desc: false ? '' : '服务器： ' + this.formInline.ip
              })
              this.init()
              this.modal1 = false
            } else {
              this.$Message.info('添加失败，该服务器已存在，或网络故障')
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
    confirm (index) {
      this.$Modal.confirm({
        title: '是否删除',
        content: '<p>删除后不可恢复</p>',
        onOk: () => {
          this.$axios({
            method: 'post',
            url: '/delete',
            data: {
              's_ip': this.data6[index].ip,
              's_port': this.data6[index].port,
              's_user': this.data6[index].user,
              's_psw': this.data6[index].psw,
              's_dir': this.data6[index].dir
            }
          }).then(resp => {
            console.log(resp.data)
            if (resp.data) {
              
              this.$Notice.success({
                title: '成功删除',
                desc: false ? '' : '服务器： ' + this.data6[index].ip
              })
              this.init()
            } else {
              this.$Message.error('无法删除：已绑定服务，请先解绑')
            }
          }).catch(er => {
            alert(er)
          })
        },
        onCancel: () => {

        }
      })
    }
  },

  data () {
    return {

      pageSize: 10,
      total: 0,
      current: 1,
      formInline: {
        ip: '',
        port: '',
        user: '',
        psw: '',
        dir: '',
        beizhu: ''
      },
      ruleInline: {
        ip: [{ required: true, message: '请输入ip地址', trigger: 'blur' },
          { validator (rule, value, callback, source, options) {
            const errors = []
            let rules = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
            if (!rules.test(value)) { errors.push('请输入正确的ip地址') }
            callback(errors)
          }
          }
        ],
        port: [{ required: true, message: '请输入端口号', trigger: 'blur' }
          /* { validator (rule, value, callback, source, options) {
            const errors = []
            let rules = /^(1(02[4-9]|0[3-9][0-9]|[1-9][0-9]{2})|[2-9][0-9]{3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/
            if (!rules.test(value)) { errors.push('请输入正确的端口号') }
            callback(errors)
          }
          } */
        ],
        user: [{ required: true, message: '请输入用户名', trigger: 'blur' },
          { validator (rule, value, callback, source, options) {
            const errors = []
            let rules = /([a-zA-Z]{4,12})/
            if (!rules.test(value)) { errors.push('请输入4-8位英文用户名') }
            callback(errors)
          }
          }
        ],
        psw: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        dir: [{ required: true, message: '请输入包路径', trigger: 'blur' }]

      },
      modal1: false,
      model2: '',
      columns12: [{
        title: 'IP',
        key: 'ip'
      },
      {
        title: 'Port',
        key: 'port'
      },
      {
        title: 'User',
        key: 'user'
      },
      {
        title: 'Password',
        key: 'psw'
      },
      {
        title: 'Dir',
        key: 'dir'
      },
      {
        title: '操作',
        slot: 'action',
        width: 150,
        align: 'center'
      }
      ],
      data6: [],
      data6temp: []
    }
  }
}
</script>
