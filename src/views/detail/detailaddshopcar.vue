<template>
    <div class="select-info">
        <div class="select-info-img">
            <div class="left">
                <img v-for="(item, index) in addShopCarInfo.skus" :key="index" :src="item.img" v-show="selectIndex==index">
            </div>
            <div class="select-info-stock">
                <div>{{addShopCarInfo.defaultPrice}}</div>
                <div>总库存{{addShopCarInfo.totalStock}}件</div>

                <div v-if="isselect">请选择 <span v-show="issize">尺码</span> <span v-show="iscolor">颜色分类</span></div>
                <div v-else>已选: {{selectSize}}  {{selectColor}}</div>
            </div>
            <div class="right">
                <img src="../../assets/image/detailaddshopcar/cross.svg" class="first-img" @click="imgclickHandle">
            </div>
        </div>
        <scroll class="scroll" :propsIsShow="false">
        <div class="size">
            <p>{{addShopCarInfo.size}}</p>
            <span v-for="(item, index) in addShopCarInfo.sizeList" :key="index" :class="{active: currindex1 == index}"
            @click="clickSpanHandle1(index)">
                {{item.name}}
            </span>
        </div>
        <div class="size">
            <p>{{addShopCarInfo.colorName}}</p>
            <span class="span" v-for="(item, index) in addShopCarInfo.colorList" 
            :key="index" @click="clickSpanHandle2(index)" :class="{active: currindex2 == index}">
                {{item.name}}
            </span>
        </div>
        <div class="buy-count">
            <div class="buy-count-left">购买数量</div>
            <div class="buy-count-right">
                <button @click="clickBtnHandle1">-</button>
                <span>{{num}}</span>
                <button @click="clickBtnHandle2">+</button>
            </div>
        </div>
        </scroll>
        <div class="determine" @click="determineshop">确定</div>
        <div class="Tip" v-show="isTip">请先选择尺码 颜色分类</div>
    </div>
</template>

<script>
import scroll from "../../components/common/scroll/scroll"

export default {
    name: "detailaddshopcar",
    data() {
        return {
            /*
             * currindex: 当前选中颜色衣服图片索引
             */
            currindex: 0,
            /*
             * currindex1: 上一次选中尺寸的索引
             */
            currindex1: null,
            /*
             * currindex2: 上一次选中颜色的索引
             */
            currindex2: null,
            /*
             * num: 购买数量
             */
            num: 1,
            /*
             * iscolor: 显示是否选中颜色
             */
            iscolor: true,
            /*
             * issize: 显示是否选中尺寸
             */
            issize: true,
            /*
             * selectSize: 选中的尺寸
             */
            selectSize: null,
            /*
             * selectColor: 选中的颜色
             */
            selectColor: null,
            /*
             * iscolor: 没有选中尺寸或颜色时提示信息
             */
            isTip: false,
            isFlag: null
        }
    },
    props: {
        addShopCarInfo: {
            type: Object,
            default(){
                return {}
            }
        },
        iid: {
            type: String,
            default: ''
        }
    },
    components: {
        scroll
    },
    methods: {
        imgclickHandle(){
            // 获取到 父组件 detailHome 的 isAddShopCar并改变其值，使商品颜色尺寸信息隐藏
            this.$parent.isAddShopCar = false;   
            
            // 点击叉退出添加购物车同时清除所有选择
            this.clearSelect();            
        },
        clickBtnHandle1(){
            if(this.num !== 1){
                this.num--
            }
        },
        clickBtnHandle2(){
            this.num++
        },
        /**
         *  1.尺寸选择函数
         *  2.若当前点击选中尺寸索引值与上一次选中索引值相等，则取消该选中
         *  3.若当前点击选中尺寸索引值与上一次选中索引值不相等，则选中该尺寸，同时记录该索引值在 
         *   currindex1中保存，在下次点击时与当前值比较
         *  4.在不相等改变选中的尺寸的边框颜色和字体颜色
         */
        clickSpanHandle1(index){
            if(this.currindex1 !== index){
                this.currindex1 = index;
                this.issize = false;
            }else{
                this.currindex1 = null;
                this.issize = !this.issize;

            }
            this.selectSize = this.addShopCarInfo.sizeList[index].name;
        },
        clickSpanHandle2(index){
            if(this.currindex2 !== index){
                this.currindex2 = index;
                this.iscolor = false;     
            }else{
                this.currindex2 = null;
                this.iscolor = !this.iscolor;     
            }    
            this.selectColor = this.addShopCarInfo.colorList[index].name;
        },
        clearSelect(){
            // 清除所有选择
            this.currindex =  0;
            this.currindex1= null;
            this.currindex2=null;
            this.num = 1;
            this.iscolor = true;
            this.issize = true;
            this.selectSize = null;
            this.selectColor = null
            console.log('清除成功...');
        },
        determineshop(){
            // 必须选择尺码和颜色才能点击确定
            if((this.currindex1 !== null)&&(this.currindex2 !== null)){     
                // console.log(this.addShopCarInfo);     
                this.$parent.isAddShopCar = false;
                if(this.isFlag == true){
                    this.$router.push({
                        name: "settlement",
                        params: {
                            iid: this.iid,
                            title: this.addShopCarInfo.title, 
                            num: this.num,
                            size: this.selectSize,
                            color: this.selectColor,
                            img: this.addShopCarInfo.skus[this.currindex].img,
                            nowprice: this.addShopCarInfo.skus[this.currindex].nowprice,
                            shopname: this.addShopCarInfo.shopName,
                            isshopcarsettlement: true
                        }
                    });
                }
                else{
                    // 添加购物车信息提示一秒然后消失
                    this.$toast.show("添加成功！已在购物车等亲~", 1000);
                    
                    this.$store.commit("vuex_mutations_addGoods", {
                        goods: {
                            iid: this.iid,
                            title: this.addShopCarInfo.title, 
                            num: this.num,
                            size: this.selectSize,
                            color: this.selectColor,
                            img: this.addShopCarInfo.skus[this.currindex].img,
                            nowprice: this.addShopCarInfo.skus[this.currindex].nowprice,
                            shopname: this.addShopCarInfo.shopName,
                            // 商品唯一标识符
                            randomNum: Math.random().toFixed(10),
                            // 当前商品是否选中状态，默认为 false
                            checked: false
                        },
                        userId: this.addShopCarInfo.uesrId
                    });
                }
                // 点击确定添加购物车后同时清除所有选择
                this.clearSelect();
            }
            // 用户没有选中商品尺寸和颜色时显示该提示信息
            else{
                this.isTip = true;
                setTimeout(()=>{
                this.isTip = false;
                }, 1000)
            }
        }
    },
    computed: {
        // 根据当前点击颜色确定显示的图片
        selectIndex(){
            return this.currindex = (this.addShopCarInfo.sizeList.length)*this.currindex2;
        },
        // 根据当前点击颜色和尺码显示的 已经选择的型号
        isselect(){
            return (this.currindex1 !== null)&&(this.currindex2 !== null) ? false : true;
        }
    },
    mounted(){
        this.$eventBus.$on("settlementEvent", (flag)=>{
            this.isFlag = flag;
        })
    }
}
</script>

<style scoped>
    .scroll {
        height: 72%;
        width: 100%;
    }
    .select-info {
        position: fixed;
        bottom: 0px;
        height: 80%;
        width: 100%;
        background-color: #fff;
        z-index: 10;
        border-radius: 15px 15px 0px 0px;
        font-size: 16px;
    }
    .select-info-img {
        display: flex;
        height: 20%;
    }
    .select-info-img img {
        
        height: 100px;
        width: 100px;
        margin: 10px;
    }
    .select-info-stock {
        height: 100px;
        width: 55%;
        margin: 10px;
    }
    .select-info-stock div {
        position: relative;
        top: 20px;
    }
    .left {
        width: 35%;
    }
    .right {
        width: 10%;
    }
    .select-info-img .first-img {
        float: right;
        height: 30px;
        width: 30px;
        margin: 5px 5px;
    }
    .size span {
        display: inline-block;
        /* width: 40px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: pre-wrap; */
        height: 30px;
        background-color:rgb(241, 238, 238);
        border: 1px solid;
        margin: 10px;
        padding: 5px 10px;
        text-align: center;
        line-height: 30px;
    }
    .size .span {
        width: 38%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;    
    }
    .size p{
        margin-left: 10px;
    }
    .buy-count {
        width: 100%;
        height: 50px;
        margin: 10px 0px;
    }
    .buy-count-right {
        float: right;
        font-size: 18px;
        margin-right: 10px;
    }
    .buy-count-left {
        float: left;
        margin-left: 10px;
    }
    button {
        height: 30px;
        width: 50px;
        margin: 0px 5px;
    }
    .determine {
        position: absolute;
        bottom: 0px;
        left: 0px;
        right: 0px;
        width: 100%;
        height: 50px;
        background-color: rgb(238, 65, 13);
        border-radius: 15px;
        text-align: center;
        line-height: 50px;
        color: #fff;
        font-size: 20px;
    }
    .Tip {
        position: absolute;
        bottom: 50%;
        left: 25%;
        height: 60px;
        width: 50%;
        color: #fff;
        background-color: rgb(192, 181, 181);
        border-radius: 10px;
        text-align: center;
        line-height: 60px;
    }
    .active {
        color: rgb(241, 28, 13);
        border: 1px solid rgb(231, 24, 9);
    }
</style>