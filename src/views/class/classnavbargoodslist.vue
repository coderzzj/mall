<template>
    <div class="goods-list">
        <goods-list-item v-for="(item, index) in navGoodsList" 
        :key="index"
        :goodslistitem="item">    
        </goods-list-item>
    </div>
</template>

<script>
import goodsListItem from "./classnavgoodslistitem"

export default {
    name: "goodslist",
    data() {
        return {
         
        }
    },
    props: {
        navGoodsList: {
            type: Array,
            default(){
                return [];
            }
        }
    },
    components: {
        goodsListItem
    }
}
</script>

<style scoped>
    .goods-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        padding: 25px 5px;
    }
</style>