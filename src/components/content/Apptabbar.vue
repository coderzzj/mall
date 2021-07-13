<template>
    <tabbar>
        <tabbaritem :path="path[0]" activeColor="rgba(207, 15, 15, 0.925)">
                <img src="../../assets/image/tabbar/home.png" alt="" srcset="" slot="tab-img">
                <img src="../../assets/image/tabbar/activehome_red.png" alt="" slot="tab-img-active">
                <div slot="tab-text">首页</div>
        </tabbaritem>
        <tabbaritem :path="path[1]" activeColor="rgba(207, 15, 15, 0.925)">
                <img src="../../assets/image/tabbar/classification.png" alt="" srcset="" slot="tab-img">
                <img src="../../assets/image/tabbar/activeclassification_red.png" alt="" slot="tab-img-active">
                <div slot="tab-text">分类</div>
        </tabbaritem>
        <tabbaritem :path="path[2]" activeColor="rgba(207, 15, 15, 0.925)">
                <img src="../../assets/image/tabbar/shopcar.png" alt="" srcset="" slot="tab-img">
                <img src="../../assets/image/tabbar/activeshopcar_red.png" alt="" slot="tab-img-active">
                <div slot="tab-text">购物车</div>
        </tabbaritem>
        <tabbaritem :path="path[3]" activeColor="rgba(207, 15, 15, 0.925)">
                <img src="../../assets/image/tabbar/user.png" alt="" srcset="" slot="tab-img">
                <img src="../../assets/image/tabbar/activeuser_red.png" alt="" slot="tab-img-active">
                <div slot="tab-text">我的</div>
        </tabbaritem>
    </tabbar>
</template>

<script>
import tabbar from "../common/tabbar/tabbar"
import tabbaritem from "../common/tabbar/tabbaritem"

export default {
    name: "Apptabbar",
    data(){
        return {
            path: ["/home", "/class", "/shopcar", "/user"]
        }
    },
    components:{
        tabbar,
        tabbaritem
    }
}
</script>

<style>
    @import "../../assets/css/base.css";
</style>