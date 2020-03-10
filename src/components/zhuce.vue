<template>
  <div>
    <!-- <div style="float: left;">
      <Input v-model="model3" placeholder="输入服务器IP..." style="width: 300px" /><Button icon="ios-search" ></Button>
      <Button type="success">刷新</Button>
    </div><br><br><br> -->
    <div>
    <Table border :columns="columns12" :data="data7" @on-selection-change="handleSelectRow()" ref="selection">
      <template slot-scope="{ row }" slot="name">
        <strong>{{ row.name }}</strong>
      </template>
      <template slot-scope="{ row, index }" slot="action">

      </template>
    </Table>
    <Page :total="total" :current.sync="current" :page-size="pageSize" show-elevator @on-change="changeChild" />
    </div>
  </div>
</template>
<script>
export default {
  mounted: function () {

  },
  
  props: [ 'data7' ],
  data () {
    return {
      model3: '',
      single: false,
      pageSize: 10,
      total: 0,
      current: 1,
      selectData: [],
      columns12: [
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
      ]
    }
  },
  methods: {
    changeChild () {
      this.single = false
      this.$emit('changeChild', [this.current, this.pageSize])
    },
    handleSelectRow () {
      this.selectData = this.$refs.selection.getSelection()
    }
  }
}
</script>
