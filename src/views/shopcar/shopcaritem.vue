/*
* 1. 购物车滚动栏 店铺展示组件
*/
<template>
    <div class="shop-item">
        <div class="shopname">{{itemInfo[0].shopname}}</div>
        <div v-for="(item, index) in itemInfo" :key="index" class="goods-info">
            <shopcargoodsitem :goodsitem="item"></shopcargoodsitem>
        </div>
    </div>
</template>

<script>
import shopcargoodsitem from "./shopcarigoodsitem"

export default {
    name: "shopcaritem",
    data() {
        return {
            
        }
    },
    props: {
        itemInfo: {
            type: Array,
            default(){
                return []
            }
        }
    },
    components: {
        shopcargoodsitem
    },
    methods: {
        
    }
}
</script>

<style scoped>
    .shop-item{
        font-size: 16px;
        border: 1px solid #fff;
        margin: 10px 10px;
        background-color: #fff;
        border-radius: 10px;
    }
    .shopname {
        width: 100%;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 20px;
        font-weight: 10px;
        margin: 5px 0px;
    }

    .goods-info {
        display: flex;
        height: 150px;
    }
    
</style>