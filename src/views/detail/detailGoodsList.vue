<template>
    <div class="goods-list">
        <!-- <p>{{goodslist.desc}}</p> -->
        <p>{{goodslist.key}}</p>
        <div v-for="(item, index) in goodslist.list" :key="index" class="goods-list-item"> 
            <img :src="item" alt="" srcset="" @load="imgLoadHandle">
        </div>
    </div>
</template>

<script>
export default {
    name: "detailGoodsList",
    data() {
        return {
            imgCount: 0,
            imgLength: 0
        }
    },
    props: {
        goodslist: {
            type: Object,
            default(){
                return {}
            }
        }
    },
    methods: {
        imgLoadHandle(){
            if(++this.imgCount == this.goodslist.list.length){
                this.$emit("imgFullLoad");
            }
        }
    }
}
</script>

<style scoped>
    .goods-list-item img{
        height: 30%;
        width: 100%;
    }
    .goods-list p {
        font-size: 16px;
        text-align: center;
        line-height: 50px;
        height: 50px;
        border-bottom: 1px solid black;
        background-color: rgba(226, 220, 220, 0.603);
    }
</style>