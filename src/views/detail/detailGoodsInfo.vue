<template>
    <div class="detail-shop-info" v-if="Object.keys(detailResult).length !== 0">
        <div class="title">
            <div class="shoptitle">{{detailResult.title}}</div>
            <span class="title-span1">{{detailResult.newPrice}}</span>
            <span class="title-span2">{{detailResult.oldPrice}}</span>
            <span class="title-span3" 
            :style="{backgroundColor: detailResult.discountBgColor}"
            v-show="detailResult.discount !== ''">
                {{detailResult.discount}}
            </span>
        </div>
        <div class="salesInfo">
            <div v-for="(item, index) in detailResult.columns" :key="index">{{item}}</div>
            <div v-for="(item, index) in detailResult.services" :key="index+'a'" v-show="index==0">
                {{item.name}}
            </div>
        </div>
        <div class="info">
            <div v-for="(item, index) in detailResult.services" 
            :key="index" 
            v-show="index==2||index==3"
            :class="'div'+index">
                <img :src="item.icon" alt="" srcset="">
                <span>{{item.name}}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "detailGoodsInfo",
    data() {
        return {

        }
    },
    props: {
        detailResult: {
            type: Object,
            default(){
                return {};
            }
        }
    }
}
</script>

<style scoped>
    .detail-shop-info {
        background-color: rgb(233, 222, 222);
    }
    .shoptitle {
        font-size: 18px;
        color: rgba(24, 12, 12, 0.795);
        margin-bottom: 20px;
        padding-top: 10px;
    }
    .title span {
        margin: 0px 5px;
    }
    .title-span1 {
        font-size: 20px;
        color: rgb(240, 85, 85);
    }
    .title-span2 {
        display: inline-block;
        font-size: 12px;
        height: 15px;
        text-align: center;
        text-decoration: line-through;
        color: rgba(58, 52, 52, 0.514);
    }
    .title-span3 {
        display: inline-block;
        height: 30px;
        width: 70px;
        line-height: 30px;
        text-align: center;
        border-radius: 15px;
        font-size: 14px;
        position: relative;
        bottom: 14px;
        color: aliceblue;
    }
    .salesInfo {
        display: flex;
        padding: 5px 0px;
        margin: 5px 0px;
        border-bottom: 2px solid rgba(226, 220, 220, 0.603);
    }
    .salesInfo div{
        flex: 1;
        font-size: 14px;
        color: rgba(102, 95, 95, 0.685);
        text-align: center;
    }
    .info {
        position: relative;
        height: 50px;
        border-bottom: 3px solid rgba(226, 220, 220, 0.603);
    }
    .info .div2 {
        position: absolute;
        left: 8px;
        height: 50px;
    }
    .info .div3 {
        position: absolute;
        right: 8px;
        height: 50px;
    }
    .info div img {
        position: relative;
        top: 3px;
        height: 20px;
        width: 20px;
        line-height: 50px;
    }
    .info div span {
        font-size: 14px;
        color: black;
        line-height: 50px;
    }
</style>