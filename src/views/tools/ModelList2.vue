<template>
  <div  class="app-container">
    <avue-crud ref="crud" :data="items" v-model="item" :option="option"
               :permission="permission"
               @row-save="rowSave"
               >
      <!-- 自定义列处理     -->
      <!--      <template slot="status" slot-scope="scope">-->
      <!--        <el-tag>{{scope.row.status}}</el-tag>-->
      <!--      </template>-->
      <!--  左侧菜单    -->
      <template slot="menuLeft">
        <el-button icon="el-icon-delete"  type="danger" size="small"  @click="tryDeleteItems" >批量删除</el-button>
        <!--        <el-button  @click="tryItemsStatus(1)" type="success" size="small" icon="el-icon-check">启用</el-button>-->
        <!--        <el-button  @click="tryItemsStatus(0)" type="warning" size="small" icon="el-icon-close">禁用</el-button>-->
        <el-button @click="exportCode">导出代码</el-button>

      </template>
      <!-- 右侧菜单     -->
      <!--      <template slot="menuRight">-->
      <!--        <el-button type="primary" icon="el-icon-edit" circle size="small"></el-button>-->
      <!--      </template>-->
      <!-- 操作     -->
      <!--      <template slot-scope="{row,type,size}" slot="menu">-->
      <!--        <el-button v-if="row.status == 0" icon="el-icon-video-play" :size="size"  :type="type" @click="changeStatus(row,1)">启用</el-button>-->
      <!--        <el-button v-if="row.status == 1" icon="el-icon-video-pause" :size="size"  :type="type" @click="changeStatus(row,0)">禁用</el-button>&nbsp;&nbsp;&nbsp;-->
      <!--      </template>-->
      <!-- 新建/编辑 Form-->
      <!--      <template slot-scope="scope" slot="menuForm">-->
      <!--        <el-button type="primary" icon="el-icon-check" size="small" plain v-if="type=='add'" @click="$refs.crud.rowSave()">新增</el-button>-->
      <!--        <el-button type="primary" icon="el-icon-check" size="small" plain v-if="type=='add'" @click="rowSave2()">新增并继续</el-button>-->
      <!--        <el-button type="primary" icon="el-icon-check" size="small" plain v-if="type=='edit'" @click="$refs.crud.rowUpdate()">修改</el-button>-->
      <!--        <el-button type="primary" icon="el-icon-check" size="small" plain @click="$refs.crud.closeDialog()">取消</el-button>-->
      <!--      </template>-->
      <!--  状态 编辑    -->
      <template slot-scope="scope" slot="searchEnabledForm">
        <el-checkbox :disabled="type=='view'" v-model="scope.row.searchEnabled"  ></el-checkbox>
      </template>


    </avue-crud>

    <el-drawer
      title="导出代码"
      :visible.sync="drawer"
      :direction="direction"
      size="50%" style="padding-left: 10px;">
      <span>我来啦!</span>
      <MonacoEditor class="editor"   v-model="code" language="javascript" />

    </el-drawer>

  </div>
</template>

<script>
  import { menu } from '../../api/apis'
  import data from '../../mixins/data'
  import screen from '../../mixins/screen'
  import MonacoEditor from 'vue-monaco'
  export default {
    name: 'ModelList',
    mixins:[screen],
    components: { MonacoEditor },
    data() {
      const list = [
        {
          id: 1,
          sort: 1,
          status: 1,
          path: '/ads',
          name: 'Ads',
          title: '广告管理',
          icon: 'el-icon-help',
          children: [{
            id: 2,
            sort: 1,
            status: 1,
            path: '/ads/banner',
            name: 'Banner',
            title: '广告管理'
          }, {
            id: 3,
            sort: 1,
            status: 1,
            path: '/ads/link',
            name: 'Link',
            title: '友情链接'
          }]
        },
        {
          id: 4,
          sort: 1,
          status: 1,
          path: '/article',
          name: 'Article',
          title: '文章管理',
          icon: 'el-icon-document',
          children: [
            {
              id: 5,
              sort: 1,
              status: 1,
              path: '/articlelist',
              name: 'ArticleList',
              title: '文章管理'
            },
            {
              id: 6,
              sort: 1,
              status: 1,
              path: '/articlecategory',
              name: 'ArticleCategory',
              title: '文章分类'
            }
          ]
        },
        {
          id: 7,
          sort: 1,
          status: 1,
          path: '/data',
          name: 'Data',
          title: '数据统计',
          icon: 'el-icon-s-data',
          children: [
            {
              id: 8,
              sort: 1,
              status: 1,
              path: '/data/article',
              name: 'Article',
              title: '文章统计'
            }
          ]
        },
        {
          id: 9,
          sort: 1,
          status: 1,
          path: '/nested',
          name: 'Nested',
          title: '多级菜单',
          icon: 'el-icon-s-operation',
          children: [
            {
              id: 10,
              sort: 1,
              status: 1,
              path: '/nested/menu1',
              name: 'Menu1',
              title: '二级菜单',
              children: [
                {
                  id: 11,
                  sort: 1,
                  status: 1,
                  path: '/nested/menu1/menu1-1',
                  name: 'Menu1-1',
                  title: '三级菜单'
                },
                {
                  id: 12,
                  sort: 1,
                  status: 1,
                  path: '/nested/menu1/menu1-2',
                  name: 'Menu1-2',
                  title: '三级菜单',
                  children: [
                    {
                      id: 13,
                      sort: 1,
                      status: 1,
                      path: '/nested/menu1/menu1-2/menu1-2-1',
                      name: 'Menu1-2-1',
                      title: '四级菜单'
                    },
                    {
                      id: 14,
                      sort: 1,
                      status: 1,
                      path: '/nested/menu1/menu1-2/menu1-2-2',
                      name: 'Menu1-2-2',
                      title: '四级菜单'
                    }
                  ]
                },
                {
                  id: 15,
                  sort: 1,
                  status: 1,
                  path: '/nested/menu1/menu1-3',
                  name: 'Menu1-3',
                  title: '三级菜单'
                }
              ]
            },
            {
              id: 16,
              sort: 1,
              status: 1,
              path: '/nested/menu2',
              name: 'Menu2',
              title: '二级菜单'
            }
          ]
        },
        {
          id: 17,
          sort: 1,
          status: 1,
          path: '/site',
          name: 'Site',
          title: '基础设置',
          children: [
            {
              id: 18,
              sort: 1,
              status: 1,
              path: '/site/index',
              name: 'SiteSet',
              title: '站点设置',
              icon: 'el-icon-setting'
            }
          ]
        },
        {
          id: 19,
          sort: 1,
          status: 1,
          path: '/setting',
          name: 'Setting',
          title: '系统管理',
          icon: 'el-icon-s-tools',
          children: [
            {
              id: 20,
              sort: 1,
              status: 1,
              path: '/setting/user',
              name: 'User',
              title: '用户管理'
            },
            {
              id: 21,
              sort: 1,
              status: 1,
              path: '/setting/role',
              name: 'Role',
              title: '角色管理'
            },
            {
              id: 22,
              sort: 1,
              status: 1,
              path: '/setting/menu',
              name: 'Menu',
              title: '菜单管理'
            },
            {
              id: 23,
              sort: 1,
              status: 1,
              path: '/setting/log',
              name: 'Log',
              title: '日志管理'
            }
          ]
        },
        {
          id: 24,
          sort: 1,
          status: 1,
          path: 'external-link',
          title: '外链',
          children: [
            {
              id: 25,
              sort: 1,
              status: 1,
              path: 'https://panjiachen.gitee.io/vue-element-admin-site/zh/',
              title: '文档',
              icon: 'el-icon-link'
            }
          ]
        }
      ]

      return {
        list:list,
        drawer: false,
        direction: 'rtl',
        models: [{
          value: 'crud',
          label: 'crud'
        }],
        api:menu,
        permission: {
          addBtn: true,
          delBtn: true, // 删除按钮
          editBtn:true, // 编辑按钮
          menu:true, // 编辑操作
        },
        code:"",
        items:[],item:null,
        menus:[],
        option: {
          title:"模块列表",
          // dialogDirection:'ttb', // 抽屉方向
          // dialogType:'drawer', // 抽屉
          dialogMenuPosition:'center', // 面板确定按钮位置
          border: true, // 边框
          stripe:true, // 条纹
          // height:screenHeight-360,
          align: 'center',
          menuAlign: 'center',
          selection: true, // 显示选择
          selectable:(row,index)=>{
            return true;
          },
          reserveSelection:true,
          card: false,
          searchMenuSpan: 6,//搜索按钮的长度
          searchShow:false, // 是否显示搜索
          copyBtn:true, // 复制按钮
          viewBtn:true, // 查看按钮
          printBtn:true, // 打印
          excelBtn:true, // 导出
          // saveBtn:false, // form按钮显示
          // updateBtn:false,
          // cancelBtn:false,
          column: [
            { label:"prop", prop:"prop"},
            { label:"名称", prop:"name"},
            { label:"数据类型", prop:"type",search:false,
              type:'select',
              dicData:[
                {
                  label:'String',
                  value:'String'
                },{
                  label:'Boolean',
                  value:'Boolean'
                },{
                  label:'Array',
                  value:'Array'
                },{
                  label:'Object',
                  value:'Object'
                },{
                  label:'Number',
                  value:'Number'
                },
              ]},

          ]
        }
      }
    },
    mounted() {
      let that = this
      this.list.forEach(item=>{
        // console.log(item)
        that.parseItem(item)
      })
      // console.log( this.menus)
      this.menus.forEach(async item=>{
        // console.log(item)
        // await menu.add(item)
      })
      this.code = JSON.stringify(this.menus ,null,"\t");
    },
    methods:{
      parseItem(item,parent=0,fullPath){

        const {id,path,name,title} = item
        fullPath = parent==0?[0]:[...fullPath]
        fullPath.push(id)
        let menu = {id,parent,path,name,title,fullPath}
        // console.log(menu)
        this.menus.push(menu)
        parent =  item.id
        let that = this
        if(item.children )
          item.children.forEach(item2=>{
            that.parseItem(item2,parent,fullPath)
          })
      },
      rowSave(form,done){
        this.items.push(form)
        done()
      },
      updateScreenHeight(h){

        this.option.height = h - 320 - (this.option.card ? 10 : 0)
      },
      exportCode(){
        // let o = {}
        // let column = this.items.forEach(item=>{
        //   console.log(item)
        //   const {name,prop,type} = item
        //    // `${prop}:{type:${type}, name:"${name}"},\n`
        //   o[prop] = {name,type}
        // })
        // let items2 = [{label:"asdsad",prop:"122233233"}]
        // this.items2 = items2
        // this.option2 = {column}
        // this.code = JSON.stringify(o ,null,"\t");
        this.drawer = true
      },
      toggle(key){
        console.log(this[key] + " " + key)
        this.selectedItems.forEach(async item=>{
          item[key] = this[key]
          let o = {}
          o[key] = this[key]
          await this.updateItem(item.id,o)
        })
      }
    },
  }
</script>

<style lang="scss" scoped>
  .editor {
    width: 100%;
    height: 100%;
  }

  ::v-deep.el-drawer__body{
    padding-left: 10px;
  }
</style>
