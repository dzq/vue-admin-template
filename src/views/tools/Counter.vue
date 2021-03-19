<template>
  <div  class="app-container">
    <avue-crud ref="crud" :data="items" v-model="item" :option="option"
               :permission="permission" :table-loading="loading"
               :page.sync="page" :search.sync="conditions"   @on-load="onLoad" :before-open="beforeOpen"
               @row-save="rowSave" @row-update="rowUpdate" @row-del="rowDel"
               @refresh-change="refresh" @error="error" @selection-change="selectionChange"
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
  import { counter } from '../../api/apis'
  import data from '../../mixins/data'
  import screen from '../../mixins/screen'
  import MonacoEditor from 'vue-monaco'
  export default {
    name: 'ModelList',
    mixins:[screen,data],
    components: { MonacoEditor },
    data() {

      return {
        drawer: false,
        direction: 'rtl',
        models: [{
          value: 'crud',
          label: 'crud'
        }],
        api:counter,
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
            { label:"编号", prop:"id"},
            { label:"模块", prop:"model"},
            { label:"计数", prop:"count"},
          ]
        }
      }
    },
    mounted() {
      this.refresh()
    },
    methods:{


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
