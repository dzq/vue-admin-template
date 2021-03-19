<template>
  <div class="app-container">
    <avue-crud ref="crud" :data="items" v-model="item" :option="option"  v-if="visible"
               :permission="permission"  :table-loading="loading"
               :page.sync="page" :search.sync="conditions"   @on-load="onLoad" :before-open="beforeOpen"
               @row-save="rowSave" @row-update="rowUpdate" @row-del="rowDel"
               @refresh-change="refresh" @error="error" @selection-change="selectionChange">
      <!-- 自定义列处理     -->
      <template slot="status" slot-scope="scope">
        <el-tag>{{scope.row.status}}</el-tag>
      </template>
      <template slot="photo" slot-scope="scope">
        <el-image v-if="scope.row.photo" :src="scope.row.photo"/>
      </template>
      <!--  左侧菜单    -->
      <template slot="menuLeft">
        <el-button icon="el-icon-delete"  type="danger" size="small"  @click="tryDeleteItems" >批量删除</el-button>
        <el-button  @click="tryItemsStatus(1)" type="success" size="small" icon="el-icon-check">启用</el-button>
        <el-button  @click="tryItemsStatus(0)" type="warning" size="small" icon="el-icon-close">禁用</el-button>
      </template>
      <!-- 右侧菜单     -->
      <template slot="menuRight">
<!--        <el-button type="primary" icon="el-icon-edit" circle size="small"></el-button>-->
      </template>
      <!-- 操作     -->
      <template slot-scope="{row,type,size}" slot="menu">
        <el-button v-if="row.status == 0" icon="el-icon-video-play" :size="size"  :type="type" @click="changeStatus(row,1)">启用</el-button>
        <el-button v-if="row.status == 1" icon="el-icon-video-pause" :size="size"  :type="type" @click="changeStatus(row,0)">禁用</el-button>&nbsp;&nbsp;&nbsp;
      </template>
      <!-- 新建/编辑 Form-->
<!--      <template slot-scope="scope" slot="menuForm">-->
<!--        <el-button type="primary" icon="el-icon-check" size="small" plain v-if="type=='add'" @click="$refs.crud.rowSave()">新增</el-button>-->
<!--        <el-button type="primary" icon="el-icon-check" size="small" plain v-if="type=='add'" @click="rowSave2()">新增并继续</el-button>-->
<!--        <el-button type="primary" icon="el-icon-check" size="small" plain v-if="type=='edit'" @click="$refs.crud.rowUpdate()">修改</el-button>-->
<!--        <el-button type="primary" icon="el-icon-check" size="small" plain @click="$refs.crud.closeDialog()">取消</el-button>-->
<!--      </template>-->
    <!--  状态 编辑    -->
      <template slot-scope="scope" slot="statusForm">
        <el-switch v-model="scope.row.status" active-color="#13ce66" inactive-color="#ff4949" active-value="1" inactive-value="0"></el-switch>
      </template>
    </avue-crud>
  </div>
</template>

<script>
import { user } from '../../api/apis'
import data from '../../mixins/data'
import screen from '../../mixins/screen'
export default {
  name: 'UserList',
  mixins:[data,screen],
  data() {
    return {
      api:user,
      permission: {
        addBtn: false,
        delBtn: false, // 删除按钮
        editBtn:true, // 编辑按钮
        copyBtn:true, // 复制按钮
        viewBtn:true, // 查看按钮
        menu:true, // 编辑操作

      },

      option: {
        title:"用户列表",
        // dialogDirection:'ttb', // 抽屉方向
        // dialogType:'drawer', // 抽屉
        dialogMenuPosition:'center', // 面板确定按钮位置
        border: true, // 边框
        stripe:true, // 条纹

        align: 'center',
        menuAlign: 'center',
        selection: true, // 显示选择
        selectable:(row,index)=>{
          return true;
        },
        reserveSelection:true,
        card: true,
        searchMenuSpan: 6,//搜索按钮的长度
        searchShow:false, // 是否显示搜索
        printBtn:true, // 打印
        excelBtn:true, // 导出
        // saveBtn:false, // form按钮显示
        // updateBtn:false,
        // cancelBtn:false,
        column: [
          { label: 'id', prop: 'id',addDisplay:false ,editDisabled:true},
          { label: '用户名', prop: 'username', search: true,editDisabled:true,
            rules: [{
              required: true,
              message: "请输入姓名",
              trigger: "blur"
            }]},
          { label: '昵称', prop: 'displayName', search: true },
          { label: 'openId', prop: 'openId',addDisplay:false },
          { label: '密码', prop: 'pwd',showColumn:false,editDisplay:false,
            rules: [{
              required: true,
              message: "请输入密码",
              trigger: "blur"
            }] },
          { label: '用户角色', prop: 'roles',type: 'array' ,
            rules: [{
              required: true,
              message: "请输入姓名",
              trigger: "blur"
            }]},
          { label: '手机号', prop: 'phone', search: true,
            rules: [{
              required: true,
              message: "请输入手机号",
              trigger: "blur"
            },{
              pattern: /^1[3-9]\d{9}$/,
              message: '手机号格式错误'
            }]},
          { label: '手机验证', prop: 'phoneVerified',type: 'boolean',
            showColumn:false,addDisplay:false,editDisabled:true,editDisplay:false },
          { label: '人脸图片', prop: 'photo' ,showColumn:true,addDisplay:true,
            // type: 'upload',
            // listType: 'picture-img',
            // span: 24,
            // propsHttp: {
            //   home:'https://avuejs.com',
            // },
            // tip: '只能上传jpg/png用户头像，且不超过500kb',
            // action: '/imgupload'
          },
          { label: '登录次数', prop: 'loginCount',showColumn:false,addDisplay:false ,editDisplay:false,editDisabled:true},
          { label: '最后登录时间', prop: 'lastLogin',addDisplay:false ,editDisplay:false,editDisabled:true},
          { label: '状态', prop: 'status',addDisplay:false,editDisplay:false,
            formslot:true,
            formatter:function(row, value , label, column){
              return row.status == 1 ?"启用":"禁用"
            }},
          { label: '创建时间', prop: 'createTime',addDisplay:false,editDisplay:false,editDisabled:true }
        ]
      }
    }
  },
  mounted() {
    // this.api = user
  },
  methods:{
    parseItem(item){
      return item.username
    },
    updateScreenHeight(h){
      // console.log(this.option.card)
      this.option.height = h - 380
      // console.log(this.option.height)
    },
  },
}
</script>

<style scoped>

</style>
