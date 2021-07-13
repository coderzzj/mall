<template>
    <div id="detail">
        <detailnavbar class="detail-nav" ref="detailnavbar" @clickSelcetNavBar="clickSelcetNavBarHandle"></detailnavbar>
        <scroll class="detail-scroll" 
        ref="scroll"
        @scrollPosition="scrollPositionHandle"
        :style="wrapperStyle" 
        :propsIsShow="false" 
        :listenScroll="true"
        :probeType="3">
            <detailSwiper ref="detailSwiper" :topImages="topImages" @swiperImgFullLoad="swiperImgFullLoadHandle"></detailSwiper>
            <detailGoodsInfo :detailResult="result"></detailGoodsInfo>
            <detailShopInfo :shopInfo="shopInfo"></detailShopInfo>
            <detailgoodslist :goodslist="goodslist" ref="goodslist" @imgFullLoad="imgFullLoadHandle"></detailgoodslist>
            <detailparam :goodsparam="goodsparam"></detailparam>
            <detailcomment :rate="rate" ref="comment"></detailcomment>
            <detailrecommend :recommendlist="recommendlist" ref="recommend"></detailrecommend>
        </scroll>
        <backup @click.native="backupClick" v-show="isshow"></backup>
        <detailaddshopcar v-show="isAddShopCar" :addShopCarInfo="addShopCarInfo" :iid="iid"></detailaddshopcar>
        <detailtabbar :shopUrl="shopUrl"></detailtabbar>
    </div>
</template>

<script>
import detailnavbar from "./detailnavbar"
import detailSwiper from "./detailSwiper"
import detailGoodsInfo from "./detailGoodsInfo"
import detailShopInfo from "./detailShopInfo"
import scroll from "../../components/common/scroll/scroll"
import detailgoodslist from "./detailGoodsList"
import detailparam from "./detailparam"
import detailcomment from "./detailcomment"
import detailrecommend from "./detailrecommend"
import detailtabbar from "./detailTabbar"
import detailaddshopcar from "./detailaddshopcar"


import { getDetailData, recommendData } from "../../network/detail"
import {DetailGoodsInfo, ShopInfo, GoodsList, itemParams, comment, recommendlist, addShopCar} from './detail'
// 导入混入文件，提高组件，方法，数据等等复用率
import {backupMixin} from "../../common/mixin"

export default {
    name: "detail",
    data() {
        return {
            iid: null,
            topImages: [],
            result:{},
            shopInfo: {},
            goodslist: {},
            goodsparam: {},
            rate: {},
            recommendlist:{},
            shopOffSetTop: null,
            detailOffSetTop: null,
            paramOffSetTop: null,
            recommendOffSetTop: null,
            shopUrl: null,
            // 购物车商品样式颜色选择界面
            isAddShopCar: false,
            // 购物车数据 来自网络请求
            addShopCarInfo: {},
        }
    },
    components: {
        detailnavbar,
        detailSwiper,
        detailGoodsInfo,
        detailShopInfo,
        detailgoodslist,
        detailparam,
        detailcomment,
        detailrecommend,
        detailtabbar,
        detailaddshopcar,
        scroll
    },
    computed: {
        wrapperStyle(){
            const lengthBody = document.getElementsByTagName("body")[0].offsetHeight;
            return {height: (lengthBody-44-53)+"px"};
        }
    },
    methods: {
        /*
        * 网络请求函数封装
        */
        //  详情页网络请求函数  
        methods_getDetailData(iid){
            getDetailData(iid).then((res)=>{
                // console.log(res);
                console.log(res.data);
                const data = res.data.result;
                this.topImages = data.itemInfo.topImages;
                this.result = new DetailGoodsInfo(data.itemInfo, data.columns, data.shopInfo.services);
                this.shopInfo = new ShopInfo(data.shopInfo);
                this.goodslist = new GoodsList(data.detailInfo);
                this.goodsparam = new itemParams(data.itemParams);
                this.rate = new comment(data.rate);
                this.shopUrl = data.shopInfo.shopUrl;
                this.addShopCarInfo = new addShopCar(data.skuInfo, data.shopInfo.name, data.shopInfo.userId);
            })
        },
        //  推荐数据网络请求函数  
        methods_getRecommendData(){
            recommendData().then((res)=>{
                console.log(res.data.data);
                this.recommendlist = new recommendlist(res.data.data);
            })
        },
        /*
        * 事件处理函数
        */
        imgFullLoadHandle(){
            this.$refs.scroll.refresh();
            this.paramOffSetTop = this.$refs.comment.$el.offsetTop;
            this.recommendOffSetTop = this.$refs.recommend.$el.offsetTop;
            // console.log(this.paramOffSetTop);
            // console.log(this.recommendOffSetTop);
        },
        swiperImgFullLoadHandle(){
            this.detailOffSetTop = this.$refs.goodslist.$el.offsetTop;
            this.shopOffSetTop = this.$refs.detailSwiper.$el.offsetTop;
            // console.log(this.detailOffSetTop);
        },
        /*
         * 根据点击导航栏的选项滚动到对应位置
         */
        clickSelcetNavBarHandle(index){
            switch(index){
                case 0:
                    this.$refs.scroll.scrollTo(0, -this.shopOffSetTop, 0);
                    break;
                case 1:
                    this.$refs.scroll.scrollTo(0, -this.detailOffSetTop, 0);
                    break;
                case 2:
                    this.$refs.scroll.scrollTo(0, -this.paramOffSetTop, 0);
                    break;
                case 3:
                    this.$refs.scroll.scrollTo(0, -this.recommendOffSetTop, 0);
                    break;
            }
        },

        /*
         * 滚动事件处理函数
         */

        /*
         * 1.将滚动位置和导航栏每个选项位置比较
         * 2.大于 选中位置则改变 导航栏选项颜色和加下划线
         */
        scrollPositionHandle(position){
            // console.log(position.y);
            if(-position.y >= this.shopOffSetTop){
                this.$refs.detailnavbar.currindex = 0
            }
            if(-position.y >= this.detailOffSetTop){
                this.$refs.detailnavbar.currindex = 1
            }
            if(-position.y >= this.paramOffSetTop){
                this.$refs.detailnavbar.currindex = 2;
            }
            if(-position.y >= this.recommendOffSetTop){
                this.$refs.detailnavbar.currindex = 3;
            }
            this.methods_isshow(position);
        }
    },
    /*
     * 生命周期函数
     */
    // created 期间发送网络请求 获取数据
    created(){
        this.iid = this.$route.params.iid;
        this.methods_getDetailData(this.iid);
        this.methods_getRecommendData();
    },
    mixins: [backupMixin]
}
</script>

<style scoped>
    /* 一定要将滚动区域设置为overflow：hidden，这样才可以去除原生滚动，因为这样内容超过视口的内容被隐藏了 */
    #detail {
        position: relative;
        z-index: 9;
        background-color: #fff;
        height: 100%;
        width: 100%;
    }
    /* 下面样式可以不写 有时可能需要 */
    /* .detail-scroll {
        position: absolute;
        top: 44px;
    }
    .detail-nav {
        position: fixed;
        top: 0px;
    } */
</style>