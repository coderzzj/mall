<template>
    <navbar class="detail-navbar">
        <div slot="middle" class="detail-middle">
            <div v-for="(item, index) in title" :key="index" class="item-div" 
            @click="clickHandle(index)"
            :class="{active: index ==currindex}"><span>{{item}}</span></div>
        </div>
        <div slot="left" class="detail-left" @click="handleClick"> 
            <img src="../../assets/image/nav/left.svg" alt="" srcset="">
        </div>
    </navbar>

</template>

<script>
import navbar from "../../components/common/navbar/navbar"

export default {
    name: "detailnavbar",
    data() {
        return {
            title: ['商品','详情','评价','推荐'],
            currindex: 0
        }
    },
    components: {
        navbar
    },
    methods: {
        handleClick(){
            this.$router.go(-1);
        },
        clickHandle(index){
            this.currindex = index;
            this.$emit("clickSelcetNavBar", index);
        }
    }
}
</script>

<style scoped>
    .detail-navbar{
       background-color: rgb(224, 214, 214);
    }
    .detail-middle {
        display: flex;
    }
    .item-div {
        flex: 1;
        font-size: 14px;
        color: black;
    }
    .item-div span {
        display: inline-block;
        height: 36px;
        width: 36px;
    }
    .detail-left {
        height: 44px;
        width: 60px;
        /* background-color: #fff; */
    }
    .detail-left img {
        height: 35px;
        width: 35px;
        margin-top: 6px;
    }
    .active {
        color: rgb(224, 20, 20);   
    }
    .active span {
        border-bottom: 2px solid red;
    }
</style>