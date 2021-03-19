export default {
  data() {
    return {
      screenHeight: document.body.clientHeight,
      visible: true,
      isFirst: true
    };
  },
  mounted() {
    window.onresize = this.onResize
    this.onResize()
  },
  methods:{
    onResize(){
      const that = this;
      window.screenHeight = document.body.clientHeight;
      that.screenHeight = window.screenHeight;
      that.updateScreenHeight(that.screenHeight)
      // this.option.height = windowHeight - 310 - (this.option.card ? 10 : 0);
      // console.log(this.option.height)
      this.visible = false;
      this.$nextTick(() => {
        this.visible = true;
      });
    }
  },
  watch: {
    // screenHeight(val) {
    //   // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
    //   if (!this.timer) {
    //     // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
    //     this.screenHeight = val;
    //     this.timer = true;
    //     let that = this;
    //     setTimeout(function() {
    //       // 打印screenWidth变化的值
    //       console.log(that.screenHeight);
    //       that.timer = false;
    //     }, 400);
    //   }
    // }
  }
};
