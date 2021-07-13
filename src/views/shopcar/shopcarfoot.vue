/*
* 1. 购物车底部栏
*/
<template>
    <div class="shopcar-foot">
        <div class="shopcar-foot-left">
            <span @click="selectAllHandle">
                <img src="../../assets/image/shopcar/selectall.svg" alt="" srcset="" v-if="allSelect">
                <img src="../../assets/image/shopcar/select.svg" alt="" srcset="" v-else>
            </span>
            <span>全选</span>
        </div>
        <div class="shopcar-foot-right">
            <span>合计:{{allShopPrice}}</span>
            <span class="calculate" @click="settlementHandle">结算({{selectGoodsNum}})</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "shopcarfoot",
    data() {
        return {
            isshow: false,
        }
    },
    props: {
        goodsNum: {
          type: Number,
          default: 0  
        }
    },
    computed:{
        // toFixed保证 都是保留小数点 2位
        // 先判断每个商品的checked是否为true，将为true商品的总价格迭代计算出来
        allShopPrice(){
            return "￥" + (this.$store.state.GoodsInfoList.filter((item)=>{
                return item.checked == true;
            }).reduce((pre, cur)=>{
                return pre + (cur.nowprice/100)*cur.num;
            },0)).toFixed(2);
        },
        // 先判断每个商品的checked是否为true，将为true商品的数量迭代计算出来  
        // filter方法返回一个数组   
        selectGoodsNum(){
            return this.$store.state.GoodsInfoList.filter((item)=>{
                return item.checked;
            }).length;
        },
        // 计算是否全选，当所有商品选中时才为 ture
        allSelect(){
            if(this.$store.state.GoodsInfoList.length == 0){
                return false;
            }else{
                return this.$store.state.GoodsInfoList.every((item)=>{
                    return item.checked;
                });
            }
        },
        selectGood(){
            return this.$store.state.GoodsInfoList.filter((item)=>{
                return item.checked;
            });
        }
    },
    methods: {
        // 将当前是否全选状态发送到vuex，同时在vuex中改变改变每一个商品选中状态
       selectAllHandle(){
           this.isshow = !this.allSelect;
           this.$store.commit("changeChecked", {
               allChecked: this.isshow
           });
       },
       settlementHandle(){
           console.log("1111111")
           this.$router.push({
               path: "/settlement",
               query: {
                   goods: this.selectGood
               }
           });
       }
    }
}
</script>

<style scoped>
    .other-shopcar-foot {
        background-color: rgb(247, 242, 242);
        position: fixed;
        bottom: 51px;
        height: 49px;
        width: 100%;
    }
    .shopcar-foot {
        font-size: 16px;
        position: fixed;
        bottom: 51px;
        height: 49px;
        width: 100%;
        background-color: rgb(240, 234, 234);
    }
    .shopcar-foot-left {
        float: left;
        height: 49px;
        /* width: 100px; */
        text-align: center;
        margin: 0px 10px;
    }
    .shopcar-foot-left span {
        display: inline-block;
        height: 49px;
        line-height: 49px;
        margin: 0px 5px;
    }
    .shopcar-foot-right {
        float: right;
        height: 49px;
        /* width: 150px; */
        text-align: center;
        line-height: 49px;
        margin: 0px 10px;
    }
    .shopcar-foot-right span {
        display: inline-block;
        height: 42px;
        line-height: 42px;
        margin: 0px 5px;
    }
    .calculate {
        width: 80px;
        background-color: rgb(216, 60, 13);
        padding: 0px 10px;
        border-radius: 25px;
        color: aliceblue;
    }
    img {
        height: 25px;
        width: 25px;
        position: relative;
        top: 5px;
    }
</style>