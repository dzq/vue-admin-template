/**
 * crud 数据处理
 */
export default {
  data() {
    return {
      page: {
        pageSize: 20,
        pagerCount:5,
        currentPage: 1,
        total:0,
        "pageSizes": [ 1,10, 20, 50, 100 ],
        scope: 'all'
      },
      loading: false,
      conditions:{},
      items: [],
      selectedItems: [],
      item:{},
      crud:null,
      visible: true,
      isFirst: true
    };
  },
  mounted() {

  },
  created(){
    this.$nextTick(()=>{
      this.crud = this.$refs["crud"]
    })
  },
  beforeDestroy(){
    // window.removeEventListener("resize",this.resetHeight)
  },
  methods:{
    beforeOpen(done,type){
      this.type=type;
      done()
    },
    onLoad(page){
      this.gotoPage(page.currentPage)
    },
    gotoPage(page){
      this.selectedItems = []
      // if(this.crud) this.crud.selectClear()
      this.page.currentPage = this.page.page = page || this.page.currentPage
      this.page.conditions = this.conditions
      this.api.search(this.page).then(r => {
        this.page.total = r.total
        this.items = r.data
      })
    },
    error(err){
      this.$message.success('请查看控制台');
      console.log(err)
    },
    rowSave(form,done){
      this.clean(form)
      this.api.add(form).then(r=>{
        done()
        this.refresh()
      }).catch(e=>{
        this.$message.error(e);
        // done()
      })
    },
    rowSave2(){
      this.clean(this.item)
      console.log(this.item)
      this.api.add(this.item).then(r=>{
        this.refresh()
      }).catch(e=>{
        this.$message.error(e);
        // done()
      })
    },
    rowUpdate(form,index,done){
      console.log(form)
      // console.log(this.getUpdateData())
      this.api.update(this.getUpdateData()).then( done )
      // done();
    },
    updateItem(id,updateData){
      this.api.update({id,updateData})
    },
    getUpdateData(){
      let id = this.item.id
      console.log(this.item)
      let oldData
      this.items.forEach(item=>{
        if( item.id == id ) oldData = item
      })
      console.log(oldData)
      let updateData = {}
      let changed = false
      // 查找变化的值
      for (let key in this.item) {
        let v = this.item[key]
        console.log(key + " " + typeof v   + " " + v + " " + oldData[key])
        if( (typeof v == "string" && oldData[key] != v)
          || (typeof v == "boolean" && oldData[key] != v)
        || typeof v == "object"){
          changed = true
          updateData[key] = v
        }
      }
      let data = {}
      data.id = id
      data.updateData = updateData
      console.log(data)
      return data
    },
    refresh(form,done){
      this.gotoPage()
      if(done) done()
    },
    rowDel(form,index){
      // 删除用户确认框
      this.$confirm("确定要删除 " + this.parseItem(form) + " 吗?", "提示")
        .then(() => {
          // 确定删除
          this.api.remove({id:form.id}).then(this.refresh);
        })
    },
    selectionChange(list){
      this.selectedItems = list
    },
    clean(obj) {
      let propNames = Object.getOwnPropertyNames(obj)
      for (let i = propNames.length - 1; i >=0; i--) {
        let propName = propNames[i]
        if (obj[propName] == null || obj[propName] == undefined || obj[propName] =="") {
          delete obj[propName];
        }
      }
    },
    changeStatus(row,status){
      console.log(row)
      let data = {id:row.id}
      if( status == 1 )
        this.api.enable(data)
      else
        this.api.disable(data)
      row.status = status
    },
    tryItemsStatus(status){
      if(0 == this.selectedItems.length){
        this.$message({
          type: 'info',
          message: '请选择要设置数据'
        });
        return;
      }
      let fname = this.selectedItems.map( this.parseItem )
      let that = this
      // 删除用户确认框
      this.$confirm("确定要" + (status==1?'启用 ':'禁用 ') + fname.join(',') + " 吗?", "提示")
        .then(async () => {
          for (let i = 0; i < this.selectedItems.length; i++) {
            that.changeStatus(this.selectedItems[i],status);
          }
        })
    },
    tryDeleteItems(row){
      if( 0 === this.selectedItems.length ){
        this.$message({
          type: 'info',
          message: '请选择要删除数据'
        });
        return;
      }
      let fname = this.selectedItems.map( this.parseItem )
      // 删除用户确认框
      this.$confirm("确定要删除 " + fname.join(',') + " 吗?此操作不可撤销", "提示")
        .then(async () => {
          for (const item of this.selectedItems) {
            await this.api.remove({ id: item.id })
          }
          this.refresh()
        })
    },
    parseItem(item){
      return item.id
    }
  }
};
