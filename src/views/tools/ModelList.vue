<template>
  <div  class="app-container">
    <avue-crud ref="crud" :data="items" v-model="item" :option="option" v-if="visible"
               :permission="permission"  :table-loading="loading"
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
        <el-button @click="exportCode">导出代码</el-button>
        <el-checkbox v-model="searchEnabled">允许搜索</el-checkbox>
        <el-checkbox v-model="showColumn">表格显示</el-checkbox>
        <el-checkbox v-model="addDisplay">添加显示</el-checkbox>
        <el-checkbox v-model="addDisabled">添加禁用</el-checkbox>
        <el-checkbox v-model="editDisplay">编辑显示</el-checkbox>
        <el-checkbox v-model="editDisabled">编辑禁用</el-checkbox>
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
      <template slot-scope="scope" slot="showColumnForm">
        <el-checkbox :disabled="type=='view'" v-model="scope.row.showColumn"  ></el-checkbox>
      </template>
      <template slot-scope="scope" slot="addDisplayForm">
        <el-checkbox :disabled="type=='view'" v-model="scope.row.addDisplay" ></el-checkbox>
      </template>
      <template slot-scope="scope" slot="addDisabledForm">
        <el-checkbox :disabled="type=='view'" v-model="scope.row.addDisabled" ></el-checkbox>
      </template>
      <template slot-scope="scope" slot="editDisplayForm">
        <el-checkbox :disabled="type=='view'" v-model="scope.row.editDisplay" ></el-checkbox>
      </template>
      <template slot-scope="scope" slot="editDisabledForm">
        <el-checkbox :disabled="type=='view'" v-model="scope.row.editDisabled" ></el-checkbox>
      </template>

    </avue-crud>

    <el-drawer
      title="导出代码"
      :visible.sync="drawer"
      :direction="direction"
      size="50%" style="padding-left: 10px;">
      <span>我来啦!</span>
      <template slot-scope="scope" slot="title">
        <div  >
          <el-button  type="primary" @click="">提交</el-button>
          <el-button  type="primary" @click="">提交</el-button>
          <el-button  type="primary" @click="">提交</el-button>
          <el-button  type="primary" @click="">提交</el-button>
        </div>

      </template>
      <avue-crud ref="crud" :data="items2" v-model="item2" :option="option2"
       class="w-full"/>
      <el-collapse v-model="activeNames">
        <el-collapse-item title="表格配置" name="1">
        </el-collapse-item>
        <el-collapse-item title="操作配置" name="2">
        </el-collapse-item>
        <el-collapse-item title="弹窗配置" name="3">
        </el-collapse-item>
        <el-collapse-item title="按钮配置" name="4">
        </el-collapse-item>
      </el-collapse>
      <MonacoEditor class="editor"   v-model="code" language="javascript" />

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

    },
    data() {
      return {
        activeNames: ['1'],
        searchEnabled:true,showColumn:true,addDisplay:true,addDisabled:true,editDisplay:true,editDisabled:true,
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
            { label:"允许搜索", prop:"searchEnabled",type: 'boolean',formslot:true,span:3},
            { label:"表格显示", prop:"showColumn",type: 'boolean',formslot:true,span:3},
            { label:"添加显示", prop:"addDisplay",type: 'boolean',formslot:true,span:3},
            { label:"添加禁用", prop:"addDisabled",type: 'boolean',formslot:true,span:3},
            { label:"编辑显示", prop:"editDisplay",type: 'boolean',formslot:true,span:3},
            { label:"编辑禁用", prop:"editDisabled",type: 'boolean',formslot:true,span:3},
            { label:"创建时间", prop:"createTime",addDisplay:false,editDisplay:false,span:3},
          ]
        }
      }
    },
    mounted() {
      // this.api = user

  let t =""

    this.option.column.forEach(item=>{
      let {label,prop} = item
      // t += `<el-switch v-model="${prop}"  @change="toggle('${prop}')" active-text="${label}"/>\n`
      t +=  `<el-checkbox v-model="${prop}">${label}</el-checkbox>\n`

    })
      console.log(t)
    },
    methods:{
      parseItem(item){
        return item.label
      },
      updateScreenHeight(h){
        this.option.height = h - 355
      },
      exportCode(){
        let column = this.items.map(item=>{
          console.log(item)
          const {label,prop,searchEnabled,showColumn,addDisplay,addDisabled,editDisplay,editDisabled} = item
          return {label,prop,searchEnabled,showColumn,addDisplay,addDisabled,editDisplay,editDisabled}
        })
        let items2 = [{label:"asdsad",prop:"122233233"}]
        this.items2 = items2
        this.option2 = {column}
        this.code = JSON.stringify(this.option2 ,null,"\t");
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
