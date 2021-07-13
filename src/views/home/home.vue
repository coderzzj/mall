<template>
    <div id="home">
        <navbar class="home-nav"><div slot="middle">购物街</div></navbar>
        <tabcontrol :title="['流行','新款','精选']"
        @selectItem="selectItem_home" 
        class="tab-control"
        v-show="isFixed"
        ref="tabcontrol1">
        </tabcontrol>
        <scroll :style="wrapperStyle" 
        class="home-scroll"
        @scrollDownEvent="scrollEventHandle" 
        @scrollPosition="scrollPositionHandle"
        @pulldown="pulldownHandle"
        :probeType="3"
        :pullUpLoad="true"
        :pullup="true"
        :listenScroll="true"
        :pulldown="true"
        ref="scroll">
            <banner :bannerlist="bannerlist" @bannerFullImgLoad="bannerImgLoadHandle"></banner>
            <recommend :recommends="recommends"></recommend>
            <featureview></featureview>
            <tabcontrol :title="['流行','新款','精选']" 
            @selectItem="selectItem_home" 
            ref="tabcontrol2">
            </tabcontrol>
            <goods-list :goodslist="goodslist[type].list"></goods-list>
        </scroll>
        <!-- 直接监听组件事件  @click.native -->
        <backup @click.native="backupClick" v-show="isshow"></backup>
    </div>
</template>

<script>
import navbar from "../../components/common/navbar/navbar"
import banner from "../../components/common/banner/banner"
import recommend from "../../components/content/recommend"
import featureview from "../../components/content/FeatureView"
import tabcontrol from "../../components/common/controlbar/controlbar"
import goodsList from "../../components/content/goodslist/goodslist"
import scroll from "../../components/common/scroll/scroll"
// import backup from "../../components/common/scroll/backUp"

import {getHomeData, getGoodsList} from "../../network/home"
// 导入混入文件
import {backupMixin} from "../../common/mixin"

export default {
    name: "home",
    data() {
        return {
            bannerlist: [],
            recommends:[],
            goodslist:{
                "pop": {page: 1, list:[]},
                "new": {page: 1, list:[]},
                "sell": {page: 1, list:[]},
            },
            type: "pop",
            // isshow: false,
            isFixed: false,
            taboffsetTop: 0,
            isScrollTo: false,
            savePositionY: 0
        }
    },
    // 判断一个组件是不是它的子组件可以看components是否注册
    // 从这里可以判断是否有父子组件关系
    components: {
        navbar,
        banner,
        recommend,
        featureview,
        tabcontrol,
        goodsList,
        scroll,
        // backup
    },
    computed: {
        wrapperStyle(){
            const lengthBody = document.getElementsByTagName("body")[0].offsetHeight;
            // console.log(lengthBody);
            return {height: (lengthBody-44-49)+"px"};
        }
    },
    methods: {
        /*
         * 防抖函数
         */
        debounce(func, delay=500){
            let timer = null;
            return function(...args){
                if(timer){
                    clearTimeout(timer);
                }
                timer = setTimeout(()=>{
                    func.apply(this, args);
                },delay)
            }
        },
        /*
         *  事件监听相关方法
         */
        pulldownHandle(){
            console.log("下拉刷新");
        },
        // backUp组件的显示和隐藏
        scrollPositionHandle(position){
            // console.log(position.y)
            // 根据滚动位置确定是否 吸顶 和 在点击控制栏选项时是否调用 scrollTo函数
            (-position.y) > this.taboffsetTop ? this.isFixed = true : this.isFixed = false;
            (-position.y) > this.taboffsetTop ? this.isScrollTo = true : this.isScrollTo = false;
            // console.log(this.isFixed);
            // return (-position.y) > 1000 ? this.isshow=true: this.isshow = false;
            // 这个函数定义在 mixin.js 中，从混入导入
            this.methods_isshow(position);
        },
        // 当点击backUp组件时回到顶部
        // backupClick(){
        //     // console.log(this.$refs.scroll.scroll) 
        //     // 调用scroll里的方法
        //     this.$refs.scroll.scrollTo(0,0);
        // },
        selectItem_home(index){
            console.log(index);
            switch(index){
                case 0:
                    this.type = "pop";
                    break;
                case 1:
                    this.type = "new";
                    break;
                case 2:
                    this.type = "sell";
                    break;
            }
            // 同步两个 tabcontrol 组件的 currIndex值，使点击 tabcontrol 后两个tabcontrol选中选项一致
            this.$refs.tabcontrol1.currIndex = index;
            this.$refs.tabcontrol2.currIndex = index;
            // 当控制栏吸顶后点击其他选项时使页面回到商品栏最上方
            if(this.isScrollTo){
                this.$refs.scroll.scrollTo(0,-this.taboffsetTop);
            }
        },
        // 滚动事件处理函数
        scrollEventHandle(){
            // if(isScrollDownEvent){
                this.goodslist[this.type].page++;
                this.methods_getGoodsList(this.type);
            // }
        },
        // 计算 控制栏 offsetTop ，实现吸顶效果
        bannerImgLoadHandle(){
            console.log(this.$refs.tabcontrol2.$el.offsetTop);
            this.taboffsetTop = this.$refs.tabcontrol2.$el.offsetTop;
        },
        /*
         *  网络请求相关方法
         */
        methods_getHomeData(){
            getHomeData().then((res)=>{
                this.bannerlist = res.data.data.banner.list;
                this.recommends = res.data.data.recommend.list
                // console.log(res.data.data);
            }).catch((err)=>{
                console.log(err);
            })
        },
        methods_getGoodsList(type){
            // console.log(type);
            let page = this.goodslist[type].page;
            getGoodsList(type, page).then((res)=>{
                console.log(res.data.data);
                this.goodslist[type].list.push(...res.data.data.list);
                // this.goods[type].page += 1;
                // 在这里写和在scroll.vue 里写是一样的
                // this.$refs.scroll.scroll.finishPullUp();
            }).catch((err)=>{
                console.log(err);
            })
        }
    },
    created(){
        this.methods_getHomeData();
        this.methods_getGoodsList("pop");
        this.methods_getGoodsList("new");       
        this.methods_getGoodsList("sell"); 
        // console.log("我创建了...");
    },
    mounted(){
        const refresh = this.debounce(this.$refs.scroll.refresh, 100);
        // 收到 goodslistitem 组件 imgFullLoad事件，调用一次 scroll组件的refresh()函数
        // 刷新 scrollHeight 属性
        this.$eventBus.$on("imgFullLoad",()=>{
            refresh();
        })
    },
    // 将混入导入到实例中
    mixins: [backupMixin],
    activated(){
        // console.log(this.savePositionY);
        // scrollTo 这里面第三个参数设置为 0 时无效，但是在detailHome中有效，很玄学...
        this.$refs.scroll.scrollTo(0, this.savePositionY);
        this.$refs.scroll.refresh();
        // console.log("activated");
    },
    deactivated(){
        this.savePositionY = this.$refs.scroll.getScrollY();
        // console.log(this.savePositionY);
        // console.log("deactivated");
    }
}
</script>

<style scoped>
#home {
    height: 100vh;
    position: relative;
}
.home-scroll {
    position: absolute;
    top: 44px;
    /* 两个定位这种方法也可以实现 滚动位置在导航栏与底部栏之间 */
    /* bottom: 49px; */
}
.home-nav {
    background-color: rgb(236, 41, 41);
    /* 在使用浏览器原生滚动时，css实现 fixed */
    /* position: fixed;
    top: 0px;
    left: 0px;
    right: 0px; */
}
.tab-control{
    position: relative;
    z-index: 3;
}
</style>