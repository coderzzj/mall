/*
* 1. 购物车滚动栏 商品展示组件
*/
<template>
    <div class="item-info">
        <div class="left" @click="selectOne">
                <!-- 也可以直接使用 goodsitem.checked 状态决定 -->
                <img src="../../assets/image/shopcar/selectall.svg" alt="" srcset="" v-if="isChecked">
                <img src="../../assets/image/shopcar/select.svg" alt="" srcset="" v-else >     
        </div>
        <div class="middle"><img :src="goodsitem.img" alt="" srcset=""></div>
        <div class="right">
            <div class="title">{{goodsitem.title}}</div>
            <div class="select-info">选中型号: {{goodsitem.size}}{{goodsitem.color}}</div>
            <div class="price-info">
                <div class="price">￥{{getTotalPrice}}</div>
                <div class="selectnum">
                    <button @click="subGoods">-</button>
                    <span>{{num}}</span>
                    <button @click="addGoods">+</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "shopcargoodsitem",
    data() {
        return {
            isSelect: true,
            num: 0,
            nowprice: 0
        }
    },
    props: {
        goodsitem: {
            type: Object,
            default(){
                return {}
            }
        }
    },
    computed: {
        getTotalPrice(){
            // 将计算结果保留两位小数
            return (this.nowprice*this.num).toFixed(2);
        },
        // 实时检测当前组件checked的状态去决定是否选中，也可以直接使用 goodsitem.checked 状态决定
        isChecked(){
            // randomNum为当前商品的唯一标识符，在提交商品信息时生成的随机数（detailaddshopcar组件中）
            // 通过 randomNum 找到当前组件在vuex GoodsInfoList 中是哪一个数组，过滤出来取出它的checked值
            return this.$store.state.GoodsInfoList.filter((item)=>{
                return item.randomNum == this.goodsitem.randomNum;
            })[0].checked;
        }
    },
    methods: {
        selectOne(){
            this.isSelect = !this.goodsitem.checked;
            // 点击选中框选择是否购买，同时将当前是否选中状态通过mutations改变 vuex 中对应商品的 checked 值
            this.$store.commit("changeChecked", {
                // randomNum是对应商品的唯一标识符，通过 随机数函数 产生
                randomNum: this.goodsitem.randomNum,
                checked: this.isSelect
            });
       },
       subGoods(){
           if(this.num > 1){
               this.num--;
               this.$store.commit("changeChecked", {
                randomNum: this.goodsitem.randomNum,
                num: this.num
            });
           }
       },
       addGoods(){
           this.num++;
           this.$store.commit("changeChecked", {
                randomNum: this.goodsitem.randomNum,
                num: this.num
           }); 
       }
    },
    created(){
        this.num = this.goodsitem.num;
        this.nowprice = this.goodsitem.nowprice/100;
    }
}
</script>

<style scoped>
    .item-info {
        display: flex;
        height: 150px;
        width: 98%;
    }
     .left {
        width: 10%;
    }
     .middle {
        width: 30%;
    }
     .right {
        width: 60%;
        /* text-align: center; */
    }
    .right div {
        margin: 2px 5px;
    }
    .select-info {
        background-color: rgb(238, 232, 232);
        position: relative;
        top: 10px;
    }
    .price-info {
        display: flex;
        position: relative;
        top: 25px;
    }
    .price {
        width: 30%;
        color: rgb(226, 56, 26);
    }
    .selectnum {
        width: 70%;
        text-align: center;
    }
    .title {
        height: 40px;
        line-height: 40px;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .left img {
        height: 25px;
        width: 25px;
        position: relative;
        top: 50px;
        left: 5px;
    }
    .middle img {
        height: 80%;
        width: 90%;
        border-radius: 6px;
    }
    button {
        display: inline-block;
        height: 30px;
        width: 30px;
        margin: 0px 5px;
    }
</style>