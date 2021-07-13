<template>
    <div class="recommend-list">
        <detailrecommendlist v-for="(item, index) in recommendlist.list" :key="index" 
        :recommendlistitem="item">   
        </detailrecommendlist>
    </div>
</template>

<script>
import detailrecommendlist from "./detailrecommendlist"

export default {
    name: "detailrecommend",
    data() {
        return {
         
        }
    },
    props: {
        recommendlist: {
            type: Object,
            default(){
                return {};
            }
        }
    },
    components: {
        detailrecommendlist
    }
}
</script>

<style scoped>
    .recommend-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
</style>