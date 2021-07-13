/* date； "2020-2-23 13:47"
 * author: "goodtimecoder"
 *
 * 1. 购物车组件
 * 2. 包括 导航栏、购物车商品信息滚动栏、底部栏
 * 3. 数据从 vuex $store.state.goods 获取，通过 v-for 进行展示
 * 4. goods 是 一个类似这种数据结构 {
       'userId1': [[],[]...]，
       'userId2': [[],[]...]
       ...
   }
*/
<template>
    <div>
        <navbar class="shopcar-nav">
            <div slot="middle">购物车({{goodsLength}})</div>
        </navbar>
        <scroll class="scroll" :propsIsShow="false">
            <shopcaritem v-for="(item, index) in $store.state.goods" :key="index" :itemInfo="item">
            </shopcaritem>
        </scroll>
        <shopcarfoot></shopcarfoot>
    </div>
</template>

<script>
import navbar from "../../components/common/navbar/navbar"
import shopcaritem from "./shopcaritem"
import scroll from "../../components/common/scroll/scroll"
import shopcarfoot from "./shopcarfoot"

export default {
    name: "shopcar",
    components: {
        navbar,
        shopcaritem,
        scroll,
        shopcarfoot
    },
    computed: {
        goodsLength(){
            return this.$store.state.GoodsInfoList.length;
        }
    }
}
</script>

<style scoped>
    .shopcar-nav {
        background-color: rgb(231, 16, 16);
    }
    .scroll {
        width: 100%;
        position: absolute;
        top: 44px;
        bottom: 100px;
        background-color: rgb(247, 242, 242);
    }
    
</style>