<template>
    <div class="settlement">
        <div class="address">
            <div class="img"><img src="../../assets/image/settlement/address.svg" alt=""></div>
            <div class="user-info">
                <div>
                    <span>姓名:张三</span>
                    <span>12345667890</span>
                    <div>xx省xx市xxxxxxxxxxxxxxxxxx</div>
                </div>
            </div>
        </div>
        <div class="goods-info">
            <div v-if="isshopcarsettlement" class="detail-info">
                <div class="left"><img :src="info.img" alt="" srcset=""></div>
                <div class="right">
                    <div>{{info.title}}</div>
                    <div>{{info.size}} {{info.color}}</div>
                </div>
            </div>
            <div v-else>
                <div v-for="(item, index) in info1.goods" :key="index">
                    <div class="detail-info">
                        <div class="left"><img :src="item.img" alt="" srcset=""></div>
                        <div class="right">
                            <div>{{item.title}}</div>
                            <div>{{item.size}} {{item.color}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="tab-bar">
            <div>结算</div>
        </div>
    </div>
</template>

<script>

export default {
    name: "settlement",
    data() {
        return {
            isshopcarsettlement: false,
            info: {},
            info1: []
        }
    },
    components: {

    },
    created(){
        this.isshopcarsettlement = this.$route.params.isshopcarsettlement;
        this.info = this.$route.params;
        this.info1 = this.$route.query;
    }
}
</script>

<style scoped>
    .settlement {
        height: 94%;
        width: 100%;
        background-color: rgb(233, 224, 224);
    }
    .address {
        position: relative;
        top: 10px;
        height: 100px;
        /* width: 98%; */
        display: flex;
        border: 1px solid white;
        margin: 0px 10px;
        background-color: #fff;
        border-radius: 15px;
    }
    .address img {
        height: 30px;
        width: 30px;
        position: relative;
        top: 35px; 
    }
    .img {
        width: 20%;
        text-align: center;
    }
    .user-info {
        width: 80%;
        position: relative;
        top: 20px; 
    }
    .goods-info {
        position: relative;
        top: 30px;
        background-color: #fff;
        font-size: 16px;
        height: 550px;
        border: 1px solid white;
        margin: 0px 10px;
        border-radius: 15px;
    }
    .goods-info img{
        position: relative;
        top: 50px;
        height: 100px;
        width: 100px;
    }
    .detail-info {
        display: flex;
    }
    .right {
        position: relative;
        top: 45px;
        padding-left: 10px;
    }
    .tab-bar {
        position: absolute;
        bottom: 60px;
        right: 10px;
    }
    .tab-bar div {
        height: 40px;
        width: 100px;
        background-color: rgb(221, 10, 10);
        text-align: center;
        line-height: 40px;
        border-radius: 15px;
    }
</style>