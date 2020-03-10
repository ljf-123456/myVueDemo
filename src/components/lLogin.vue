<template>
  <div id="login">
    <h1> 登录</h1>
    <div id="inpu">
    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
        <FormItem prop="user">
            <Input type="text" v-model="formInline.user" placeholder="Username">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem prop="password">
            <Input type="password" v-model="formInline.password" placeholder="Password">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
        </FormItem><br />
        <FormItem>
            <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>
            <Button type="primary" @click="testGet()">testGET</Button>
        </FormItem>
    </Form>
    </div>
    </div>
</template>
<script>
export default {
  name: 'Login',
  data () {
    return {
      formInline: {
        user: '',
        password: ''
      },
      ruleInline: {
        user: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { validator (rule, value, callback, source, options) {
            const errors = []
            let rules = /(P[0-9]{7})/
            if (!rules.test(value)) { errors.push('用户名即员工编号') }
            callback(errors)
          }
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12个字符'},
          { validator (rule, value, callback, source, options) {
            const errors = []
            let rules = /([a-zA-Z0-9]{6,12})/
            if (!rules.test(value)) { errors.push('密码由6到12位字母和数字组合') }
            callback(errors)
          }
          }
        ]

      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'post',
            url: '/login',
            data: {
              'name': this.formInline.user,
              'psw': this.formInline.password
            }
          }).then(resp => {
            if (resp.data) {
             /* this.$Message.info('登录成功') */
             this.$Notice.success({
               title: '登录成功',
               desc: false ? '' : '欢迎:' + this.formInline.user
             })
             this.$router.push('/home/ServerP')
            } else {
              this.$Message.error('登录失败')
            }
          }).catch(resp => {

          })
        } else {
          // 验证失败
          this.$Message.error('请正确输入信息!')
        }
      })
    },
    testGet () {
       let that = this
       that.myaxios({
         url: 'http://localhost:8080/home',
         method: 'get'
       }).then(
         response =>{

         },
         error =>{
           alert(error.message)
         }
       )
     },
     /* 手动封装axios
          返回值为promise,成功结果为response,失败为Error
          处理不同请求类型的请求：get/post/put/delete
          参数为配置对象{
            Method:
              Url:
              Params:{}   get/delete的query参数
              Data:{}    post/delete的请求体参数
            }
           响应json数据解析为js数据
    */
     myaxios ({
       url,
       method = 'GET',
       params = {},
       data = {}
     }) {
       // 返回promise对象
       return new Promise((resolve, reject) => {
         // 执行异步ajax请求
         const xhr = new XMLHttpRequest()

         // 遍历params，拼接url后的请求数据,针对GET请求
         let querydata = ''
         Object.keys(params).forEach(function (key) {
           querydata += key + '=' + params[key] + '&'
         })
         if (querydata) {
           querydata = '?' + querydata.substring(0, querydata.length - 1)
         }
         url = url + querydata
         console.log(url)

         // 打开异步请求
         xhr.open(method, url, true)
         // 请求方式转化成大写
         method = method.toLocaleUpperCase()
         if (method === 'POST') {
           xhr.send(data)// 发送请求
         } else if (method === 'GET') {
           xhr.send()// 发送请求
         }
         // 监听请求状态
         xhr.onreadystatechange = function () {
           // 请求未完成，退出
           if (xhr.readyState !== 4) {
             return
           }
           const status = xhr.status// 响应状态码
           const statusText = xhr.statusText// 响应状态文本
           console.log(status)
           // 请求成功
           if (status >= 200 && status <= 299) {
             const response = {
               data: xhr.response,
               status: status,
               statusText: statusText
             }
             // 请求成功，调用resolve
             resolve(response)
           } else {
             // 请求失败 ,调用rejact
             reject(new Error('request error status is:' + status))
           }
         }
       })
     }
  }
}
</script>

<style scoped>
  body{
background: burlywood;
  }
  #login{
   text-align: center;
   background-color: cadetblue;
   color: #ffffff;
   width: 400px;
   height: 400px;
   margin: auto;
   position: absolute;
   left: 50%;
   top: 50%;
   transform: translate(-50%,-50%);
   border-radius: 15px;

  }
  #inpu{
 margin-top: 20%;
  }
</style>
