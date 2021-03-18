<template>
  <div  class="app-container">
    <avue-crud ref="crud" :data="items" v-model="item" :option="option" v-if="visible"
               :permission="permission"  :table-loading="loading" :height="200"
               :page.sync="page" :search.sync="conditions"   @on-load="onLoad" :before-open="beforeOpen"
               @row-save="rowSave" @row-update="rowUpdate" @row-del="rowDel" @search-change="refresh"
               @refresh-change="refresh" @error="error" @selection-change="selectionChange">
      <!-- 自定义列处理     -->
      <!--      <template slot="status" slot-scope="scope">-->
      <!--        <el-tag>{{scope.row.status}}</el-tag>-->
      <!--      </template>-->
      <!--  左侧菜单    -->
      <template slot="menuLeft">
        <el-button icon="el-icon-delete"  type="danger" size="small"  @click="tryDeleteItems" >批量删除</el-button>
        <!--        <el-button  @click="tryItemsStatus(1)" type="success" size="small" icon="el-icon-check">启用</el-button>-->
        <!--        <el-button  @click="tryItemsStatus(0)" type="warning" size="small" icon="el-icon-close">禁用</el-button>-->
        <el-button @click="drawer = true">导出代码</el-button>
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
        <el-switch :disabled="type=='view'" v-model="scope.row.searchEnabled"  ></el-switch>
      </template>
      <template slot-scope="scope" slot="showColumnForm">
        <el-switch :disabled="type=='view'" v-model="scope.row.showColumn"  ></el-switch>
      </template>
      <template slot-scope="scope" slot="addDisplayForm">
        <el-switch :disabled="type=='view'" v-model="scope.row.addDisplay" ></el-switch>
      </template>
      <template slot-scope="scope" slot="addDisabledForm">
        <el-switch :disabled="type=='view'" v-model="scope.row.addDisabled" ></el-switch>
      </template>
      <template slot-scope="scope" slot="editDisplayForm">
        <el-switch :disabled="type=='view'" v-model="scope.row.editDisplay" ></el-switch>
      </template>
      <template slot-scope="scope" slot="editDisabledForm">
        <el-switch :disabled="type=='view'" v-model="scope.row.editDisabled" ></el-switch>
      </template>

    </avue-crud>
    <el-drawer
      title="导出代码"
      :visible.sync="drawer"
      :direction="direction"
      size="50%">
      <template slot-scope="scope" slot="title">
        <div  >
          <el-button  type="primary" @click="">提交</el-button>
          <el-button  type="primary" @click="">提交</el-button>
          <el-button  type="primary" @click="">提交</el-button>
          <el-button  type="primary" @click="">提交</el-button>
        </div>

      </template>
      <MonacoEditor class="editor"   v-model="code" language="javascript" />
<!--      <el-form style="width: 100%;height: 100%;padding: 10px;">-->
<!--        <el-form-item size="large" :style="{height: (screenHeight-200)+ 'px'}">-->
<!--          <MonacoEditor class="editor"  style="height: 600px" v-model="code" language="javascript" />-->
<!--        </el-form-item>-->
<!--        <el-form-item size="large">-->
<!--          <el-button type="primary" @click="">提交</el-button>-->
<!--          <el-button @click="">重置</el-button>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
    </el-drawer>

  </div>
</template>

<script>
  import { model } from '../../api/apis'
  import data from '../../mixins/data'
  import screen from '../../mixins/screen'
  import MonacoEditor from 'vue-monaco'
  export default {
    name: 'ModelList',
    mixins:[data,screen],
    components: { MonacoEditor },
    watch: {
      screenHeight(val) {
        // this.visible = false;
        // this.option.height = val - 200
        // this.$nextTick(() => {
        //   this.visible = true;
        // });
      },
      option:{
        handler:function(val,oldval){
          console.log(val.searchShow)
        },
        deep:true//对象内部的属性监听，也叫深度监听
      },
      "option.searchShow":function(val) {
        console.log(val)
      }
    },
    data() {
      return {
        drawer: false,
        direction: 'rtl',
        models: [{
          value: 'crud',
          label: 'crud'
        }],
        api:model,
        permission: {
          addBtn: true,
          delBtn: true, // 删除按钮
          editBtn:true, // 编辑按钮

          menu:true, // 编辑操作

        },
        code:"",
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
            { label:"id", prop:"id",addDisplay:false,editDisabled:true},
            { label:"模块", prop:"model",
              type:'select',
              dicData:[
                {
                  label:'crud',
                  value:'crud'
                }]
            },
            { label:"标签", prop:"label",search:true},
            { label:"属性", prop:"prop",search:true},
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
            { label:"默认值", prop:"default"},
            { label:"允许搜索", prop:"searchEnabled",type: 'boolean',formslot:true,},
            { label:"表格显示", prop:"showColumn",type: 'boolean',formslot:true,},
            { label:"添加显示", prop:"addDisplay",type: 'boolean',formslot:true,},
            { label:"添加禁用", prop:"addDisabled",type: 'boolean',formslot:true,},
            { label:"编辑显示", prop:"editDisplay",type: 'boolean',formslot:true,},
            { label:"编辑禁用", prop:"editDisabled",type: 'boolean',formslot:true,},
            { label:"创建时间", prop:"createTime",addDisplay:false,editDisplay:false},
          ]
        }
      }
    },
    mounted() {
      // this.api = user
    },
    methods:{
      parseItem(item){
        return item.label
      },
      updateScreenHeight(h){

        this.option.height = h - 320 - (this.option.card ? 10 : 0)
      },
    },
  }
</script>

<style scoped>
  .editor {
    width: 100%;
    height: 100%;
  }
</style>
