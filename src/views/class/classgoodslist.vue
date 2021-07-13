<template>
    <div class="goods-list">
        <goods-list-item v-for="(item, index) in goodslist" 
        :key="index"
        :goodslistitem="item">    
        </goods-list-item>
    </div>
</template>

<script>
import goodsListItem from "./classgoodslistitem"

export default {
    name: "goodslist",
    data() {
        return {
         
        }
    },
    props: {
        goodslist: {
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
    }
</style>