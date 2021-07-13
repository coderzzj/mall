<template>
    <div id="class">
        <navbar class="class-nav">
            <div slot="middle">商品分类</div>
        </navbar>
        <div class="category">
            <div class="left">
                <scroll ref="scroll" :propsIsShow="false" class="scroll">
                    <div class="category-list-item" v-for="(item, index) in categoryList" :key="index"
                    @click="listClickHandle(index)" 
                    :class="{active: currindex == index}">
                        {{item.title}}</div>
                </scroll>
            </div>
            <div class="right">
                <tabcontrol :title="['综合','新品','销量']" 
                    @selectItem="selectItem_class" 
                    v-show="isshow"
                    class="activetab"
                    ref="tabcontrol1">
                </tabcontrol>
                <scroll ref="scroll" :propsIsShow="false"
                :listenScroll="true" 
                :probeType="3"
                @scrollPosition="scrollPositionHandle"
                class="scroll scroll-right">
                    <classnavbargoodslist :navGoodsList="categoryListDetailInfo"></classnavbargoodslist>
                    <tabcontrol :title="['综合','新品','销量']" 
                        @selectItem="selectItem_class" 
                        ref="tabcontrol2">
                    </tabcontrol>
                    <classgoodslist :goodslist="categoryListTypeInfo[this.type]"></classgoodslist>
                </scroll>
            </div>
        </div>
    </div>
</template>

<script>
import scroll from "../../components/common/scroll/scroll"
import navbar from "../../components/common/navbar/navbar"
import classgoodslist from "./classgoodslist"
import classgoodslistitem from "./classgoodslistitem"
import classnavbargoodslist from "./classnavbargoodslist"
import tabcontrol from "../../components/common/controlbar/controlbar"


import {getCategoryData, getSubCategoryData, getCategoryDataDetail} from "../../network/category"
// import {CategoryClass} from "./class"

export default {
    name: "class",
    data() {
        return {
            isshow: false,
            currindex: 0,
            categoryList: [],
            categoryListDetailInfo: [],
            categoryListTypeInfo: {
                pop: [],
                new: [],
                sell: []
            },
            type: "pop",
            currType: "",
            currminiWallkey: null,
            tabControlOffSetTop: null,
            isScrollTo: false
        }
    },
    components: {
        navbar,
        classgoodslist,
        classgoodslistitem,
        tabcontrol,
        classnavbargoodslist,
        scroll
    },
    methods: {
        scrollPositionHandle(position){
            (-position.y > this.tabControlOffSetTop) ? this.isshow = true : this.isshow =false;
            (-position.y) > this.tabControlOffSetTop ? this.isScrollTo = true : this.isScrollTo = false;
        },
        listClickHandle(index){
            this.currindex = index;
            this.methods_getSubCategoryData(this.categoryList[index].maitKey);
            this.methods_getCategoryDataDetail(this.type);
        },
        selectItem_class(index){
            switch(index){
                case 0:
                    this.type = "pop";
                    this.methods_getCategoryDataDetail(this.type);
                    break;
                case 1:
                    this.type = "new";
                    this.methods_getCategoryDataDetail(this.type);
                    break;
                case 2:
                    this.type = "sell";
                    this.methods_getCategoryDataDetail(this.type);
                    break;
            }
            // 同步两个 tabcontrol 组件的 currIndex值，使点击 tabcontrol 后两个tabcontrol选中选项一致
            this.$refs.tabcontrol1.currIndex = index;
            this.$refs.tabcontrol2.currIndex = index;
            // 当控制栏吸顶后点击其他选项时使页面回到商品栏最上方
            if(this.isScrollTo){
                this.$refs.scroll.scrollTo(0,-this.tabControlOffSetTop);
            }
        },
        getTabControlOffSetTop(){
            this.tabControlOffSetTop = this.$refs.tabcontrol2.$el.offsetTop;
            console.log(this.tabControlOffSetTop);
        },
        /**
         * 网络请求函数封装
         */
        methods_getCategoryData(){
            getCategoryData().then((res)=>{
                console.log(res);
                console.log(res.data.data.category.list);
                this.categoryList = res.data.data.category.list;
            })
        },
        methods_getSubCategoryData(maitKey){
            getSubCategoryData(maitKey).then((res)=>{
                console.log(res);
                // console.log(res.data.data.list);
                this.categoryListDetailInfo = res.data.data.list;
            })
        },
        methods_getCategoryDataDetail(type){
            let miniWallkey = this.categoryList[this.currindex].miniWallkey;
            getCategoryDataDetail(miniWallkey, type).then((res)=>{
                console.log(res);
                if(this.currminiWallkey !== miniWallkey){
                    this.currminiWallkey = miniWallkey;
                    this.categoryListTypeInfo[type] = res.data;
                }else{
                    if(this.currType !== type){
                        this.currType = type;
                        this.categoryListTypeInfo[type] = res.data;
                    }
                    else{
                        this.categoryListTypeInfo[type].push(...res.data);
                    }
                }
            })
        },
        debounce(func, delay=500){
            let timer = null;
            return function(...args){
                if(timer){
                    clearTimeout(timer);
                }
                timer = setTimeout(()=>{
                    func.apply(this, args);
                }, delay)
            }
        } 
    },
    created(){
        this.methods_getCategoryData();
    },
    mounted(){
        const refresh = this.debounce(this.$refs.scroll.refresh, 100);
        let debouncefunc = this.debounce(this.getTabControlOffSetTop, 100);
        this.$eventBus.$on("allNavImghandleLoad", ()=>{
            debouncefunc();
            refresh();
        })
        this.$eventBus.$on("allImghandleLoad", ()=>{
            refresh();
        })
    },
    watch: {
        // 在收到categoryList数据后请求 正在流行 的商品详细数据
        categoryList(){
            this.methods_getSubCategoryData(this.categoryList[0].maitKey);
            this.methods_getCategoryDataDetail("pop");
            this.methods_getCategoryDataDetail("new");
            this.methods_getCategoryDataDetail("sell");
        }
    }
}
</script>

<style scoped>
    .class-nav {
        background-color: rgb(233, 23, 41);
    }
    .scroll {
        height: 100%;
        width: 100%;
    }
    .scroll-right {
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
    }
    .category {
        display: flex;
        position: absolute;
        top: 44px;
        bottom: 49px;
        width: 100%;
    }
    .left {
        width: 25%;
        height: 100%;
        background-color: #f6f6f6;
    }
    .category-list-item {
        font-size: 16px;
        text-align: center;
        height: 30px;
        width: 100%;
        line-height: 40px;
        border-left: 2px solid #f6f6f6;
        padding: 10px 0px;
    }
    .right {
        width: 75%;
        position: relative;
        /* background-color: rgba(223, 209, 209, 0.986); */
    }
    .active {
        color: rgb(233, 23, 41);
        border-left: 2px solid red;
        font-size: 17px;
        background-color: #fff;
        /* font-weight: 600; */
    }
    .activetab {
        position: relative;
        z-index: 3;
    }
</style>