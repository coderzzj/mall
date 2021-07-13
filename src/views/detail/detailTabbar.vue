<template>
    <div class="detail-tabbar">
        <detailtabbaritem class="item">
            <div slot="img"><a :href="shopUrl"><img src="../../assets/image/detailimg/shop.svg" alt="" srcset=""></a></div>
            <div slot="text">{{title[0]}}</div>
        </detailtabbaritem>
        <detailtabbaritem class="item">
            <div slot="img"><img src="../../assets/image/detailimg/CustomerService1.svg" alt="" srcset=""></div>
            <div slot="text">{{title[1]}}</div>
        </detailtabbaritem>
        <detailtabbaritem class="item">
            <div slot="img"><img src="../../assets/image/detailimg/collect.svg" alt="" srcset=""></div>
            <div slot="text">{{title[2]}}</div>
        </detailtabbaritem>
        <detailtabbaritem class="item-text">
            <div slot="text" class="text addshopcar" @click="addshopCarHandle">{{title[3]}}</div>
        </detailtabbaritem>
        <detailtabbaritem class="item-text">
            <div slot="text" class="text buy" @click="SettlementHandle">{{title[4]}}</div>
        </detailtabbaritem>
    </div>
</template>

<script>
import detailtabbaritem from "./detailtabbaritem"

export default {
    name: "detailTabbar",
    data() {
        return {
            title: ['店铺','客服','收藏','加入购物车','立即购买']
        }
    },
    props: {
        shopUrl: {
            type: String,
            default: ''
        }
    },
    components: {
        detailtabbaritem
    },
    methods: {
        addshopCarHandle(){
            // 获取到 父组件 detailHome 的 isAddShopCar并改变其值，使商品颜色尺寸信息显示出来
            this.$parent.isAddShopCar = true;
        },
        SettlementHandle(){
            // 进行结算前先选中商品信息
            // 获取到 父组件 detailHome 的 isAddShopCar并改变其值，使商品颜色尺寸信息显示出来
            this.$parent.isAddShopCar = true;
            this.$eventBus.$emit("settlementEvent", true);
        }
    }
}
</script>

<style scoped>
    .detail-tabbar {
        position: fixed;
        left: 0px;
        right: 0px;
        bottom: 0px;
        display: flex;
        background-color: rgb(231, 224, 224);
        height: 49px;
        text-align: center;
        padding-top: 5px;
        box-shadow: 0px -3px 3px rgb(179, 173, 173);
    }
    .item {
        width: 16%;
    }
    .item-text {
        width: 25%;
    }
    img {
        height: 20px;
        width: 20px;
    }
    .text {
        height: 45px;
        line-height: 45px;
        color: aliceblue;
    }
    .addshopcar {
        background-color: rgb(206, 134, 53);
        border-radius: 25px 0px 0px 25px;
    }
    .buy {
        background-color: rgb(223, 41, 56);
        border-radius: 0px 25px 25px 0px;
    }
</style>