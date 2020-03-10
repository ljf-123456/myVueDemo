<style scoped>
  .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);

    }
    .layout-logo{
      background-image:url(../assets/wshh.png);
    }
</style>
<template>
  <div class="layout">
    <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
      <Menu active-name="2" theme="dark" width="auto" :open-names="['1']">
        <Submenu name="1.1.1">
          <template slot="title">
            <Icon type="ios-navigate"></Icon>
            业务处理
          </template>
          <router-link to="/home/GoodsMsg">
            <MenuItem name="1">服务管理</MenuItem>
          </router-link>
          <router-link to="/home/ServerP">
            <MenuItem name="2">服务器配置</MenuItem>
          </router-link>
        </Submenu>
        <Submenu name="1.1.2">
          <template slot="title">
            <Icon type="ios-keypad"></Icon>
            Item 2
          </template>
          <MenuItem name="3">Option 1</MenuItem>
          <MenuItem name="4">Option 2</MenuItem>
        </Submenu>
        <Submenu name="1.1.3">
          <template slot="title">
            <Icon type="ios-analytics"></Icon>
            Item 3
          </template>
          <MenuItem name="3-1">Option 1</MenuItem>
          <MenuItem name="3-2">Option 2</MenuItem>
        </Submenu>
      </Menu>
    </Sider>
    <Layout :style="{marginLeft: '200px'}">
      <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">
        <img src="../assets/wshh.png" style="float: right;" />
      </Header>
      <Content :style="{padding: '0 16px 16px'}">
        <Breadcrumb :style="{margin: '16px 0'}">
          <BreadcrumbItem>{{home}}</BreadcrumbItem>
          <BreadcrumbItem>{{components}}</BreadcrumbItem>
          <BreadcrumbItem>{{layout}}</BreadcrumbItem>
        </Breadcrumb>
        <Card>
          <div style="height: 600px;text-align: center;">
            <router-view></router-view>
          </div>
        </Card>
      </Content>
    </Layout>
  </div>
</template>
<script>
export default {
  watch: {
    $route (to, from) {
      if (to.path == '/home/ServerP') {
        this.layout = '服务器配置'
      } else if (to.path == '/home/GoodsMsg') {
        this.layout = '服务管理'
      } else if (to.path == '/home') {
        this.layout = ''
      }
    }
  },
  data () {
    return {
      home: 'home',
      components: '业务处理',
      layout: '服务管理'
    }
  },
  methods: {

  }
}
</script>
