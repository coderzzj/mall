<template>
<!-- vue 实现上拉加载下拉刷新 -->
<!-- https://blog.csdn.net/qq_28027903/article/details/80242714 -->
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
            <!-- 添加加载更多信息 当滚动到底部时提示信息同时加载新数据 
            新数据加载到后执行refresh函数将该图片重新放到底部隐藏 -->
            <div class="pullup" v-show="propsIsShow">
                <img src="../../../assets/image/pull/loadmore3.svg" alt="" srcset="">
            </div>
        </div>
    </div>
</template>

<script>
import BScroll from "better-scroll"

export default {
    name: "scroll",
    data() {
        return {
            scroll: null,
            isshow: false
        }
    },
    props: {
      /**
       * 1 滚动的时候会派发scroll事件，会截流。
       * 2 滚动的时候实时派发scroll事件，不会截流。
       * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
       */
      probeType: {
        type: Number,
        default: 1
      },
      /**
       * 是否显示上拉加载更多的箭头
       */
      propsIsShow: {
          type: Boolean,
          default: true
      },
      /**
       * 点击列表是否派发click事件
       */
      click: {
        type: Boolean,
        default: true
      },
      /**
       * 是否开启上拉加载
       */
      pullUpLoad: {
          type: Boolean,
          default: false,
      },
      /**
       * 是否开启横向滚动
       */
      scrollX: {
        type: Boolean,
        default: false
      },
      /**
       * 是否派发滚动事件
       */
      listenScroll: {
        type: Boolean,
        default: false
      },
      /**
       * 列表的数据
       */
      data: {
        type: Array,
        default: null
      },
      /**
       * 是否派发滚动到底部的事件，用于上拉加载
       */
      pullup: {
        type: Boolean,
        default: false
      },
      /**
       * 是否派发顶部下拉的事件，用于下拉刷新
       */
      pulldown: {
        type: Boolean,
        default: false
      },
      /**
       * 是否派发列表滚动开始的事件
       */
      beforeScroll: {
        type: Boolean,
        default: false
      },
      /**
       * 当数据更新后，刷新scroll的延时。
       */
      refreshDelay: {
        type: Number,
        default: 20
      }
    },
    methods: {
        scrollTo(x,y,time=500){
            this.scroll && this.scroll.scrollTo(x,y,time);
        },
        refresh(){
            console.log("执行refresh函数");
            this.scroll && this.scroll.refresh();
        },
        getScrollY(){
            return this.scroll.y ? this.scroll.y : 0;
        },
        _initScroll(){
            this.scroll = new BScroll(this.$refs.wrapper,{
                probeType: this.probeType,
                pullUpLoad: this.pullUpLoad,
                pulldown: this.pulldown,
                click: this.click, 
                // pullDownRefresh: {
                //     threshold: 0,
                //     stop: 0
                // },
                // pullUpLoad: {
                //     threshold: 0
                // }
                // pullDownRefresh作用：这个配置用于做下拉刷新功能，默认为 false。
                // 当设置为 true 或者是一个 Object 的时候，可以开启下拉刷新
            })
            // 是否派发顶部下拉事件，用于下拉刷新
            if (this.pulldown) {
                this.scroll.on('pullingDown', () => {
                    // 下拉动作
                    this.$emit('pullingdown');
                    this.scroll.finishPullUp();
                })
            }
            // 是否派发滚动事件
            if (this.listenScroll) {
            this.scroll.on('scroll', (position) => {
                this.$emit('scrollPosition', position)
            })
            }
            // 是否派发滚动到底部事件，用于上拉加载
            if (this.pullup) {
                this.scroll.on('pullingUp', () => {
                    // 滚动到底部
                    if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
                    // this.$emit('scrollToEnd')
                    this.$emit("scrollDownEvent");
                    // this.isScrollDownEvent = true;
                    this.scroll.finishPullUp();
                    }
                })
            }
        }
    },
    mounted(){
        // 实例化 better-scroll 对象
        setTimeout(()=>{
            this._initScroll();
        },20)
    }
}
</script>

<style scoped>
    .pullup {
        display: flex;
    }
    .pullup img{
        flex: 1;
        height: 50px;
        width: 20px;
    }
    .wrapper {
        overflow: hidden;
    }
</style>