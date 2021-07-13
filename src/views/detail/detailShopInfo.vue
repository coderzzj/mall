<template>
    <div class="shopInfo">
        <div class="title">
            <img :src="shopInfo.logo" alt="" srcset="">
            <span>{{shopInfo.name}}</span>
        </div>
        <div class="detail-info">
            <div class="info left">
                <div>{{shopInfo.sells}}</div>
                <div v-if="shopInfo.score">总销量</div>
            </div>
            <div class="info middle">
                <div>{{shopInfo.fans}}</div>
                <div v-if="shopInfo.score">全部宝贝</div>
            </div>
            <div class="right">
                <div v-for="(item, index) in shopInfo.score" :key="index">
                    <div class="right-item">
                        <span>{{item.name}}</span>
                        <span :class="{isColor: item.isBetter}" class="fontColor">{{item.score}}</span>
                        <span :class="{isBetter: item.isBetter}" class="bgc">{{item.isBetter ? '高':'底'}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="foot" v-if="shopInfo.score">
            <div></div>
            <div class="foot-item-middle">进店逛逛</div>
            <div></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "detailShopInfo",
    data() {
        return {
            
        }
    },
    props: {
        shopInfo: {
            type: Object,
            default(){
                return {}
            }
        }
    }
}
</script>

<style scoped>
    .shopInfo {
        background-color: rgb(233, 222, 222);
        border-top: 2px solid rgb(202, 199, 199);
        padding-top: 5px;
    }
    .title img {
        height: 80px;
        /* height: 30%; */
        width: 80px;
        /* width: 30%; */
    }
    .title span {
        position: relative;
        top: -30px;
        display: inline-block;
        height: 50px;
        line-height: 50px;
        /* width: 50px; */
        font-size: 20px;
        color: rgba(26, 21, 21, 0.719);
        margin-left: 15px;
    }
    .detail-info {
        display: flex;
    }
    .info{
        width: 25%;
        font-size: 14px;
        text-align: center;
    }
    .info div {
        margin-bottom: 10px;
    }
    .middle {
        border-right: 1px solid rgba(226, 220, 220, 0.603);
    }
    .right {
        width: 50%;
        font-size: 14px;
        /* text-align: center; */
    }
    .right-item {
        padding-left: 11%;
        margin-bottom: 10px;
    }
    .right-item span {
        margin: 0px 8px;
        padding: 0px 1px;
    }
    .bgc {
        background-color: rgb(19, 192, 105);
        display: inline-block;
        width: 10%;
        text-align: center;  
        color: aliceblue;      
    }
    .fontColor {
        color: rgb(19, 192, 105);
        display: inline-block; 
        width: 10%;
        text-align: center;
    }
    .isBetter {
        background-color: red;
    }
    .isColor {
        color: red;
    }

    .foot {
        height: 35px;
        width: 100%;
        display: flex;
        /* border-top: 1px solid rgba(226, 220, 220, 0.603); */
        border-bottom: 6px solid rgba(226, 220, 220, 0.603);
        padding: 10px 0px 15px 0px;
    }
    .foot div {
        flex: 1;
        text-align: center;
        line-height: 35px;
    }
    .foot-item-middle {
        border-radius: 15px;
        border: 1px solid rgba(226, 220, 220, 0.603);
        background-color: rgba(209, 204, 204, 0.658);
        font-size: 15px;
    }
</style>