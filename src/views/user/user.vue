<template>
    <div>
        <navbar class="user-nav">
            <div slot="middle">个人中心</div>
        </navbar>
        <div class="login">
            <div class="left">
                <img src="../../assets/image/user/user.svg" alt="">
            </div>
            <div class="middle">
                <div class="info">
                    <div>登录/注册</div>
                    <span>
                        <img src="../../assets/image/user/mobile.svg" alt="">
                        <span class="text">暂无绑定手机号</span>
                    </span>
                </div>
            </div>
            <div class="right">
                <img src="../../assets/image/user/right.svg" alt="">
            </div>
        </div>
        <div class="context">
            <div v-for="(item, index) in text" :key="index" class="div">
                <div class="text-color">{{item[0]}}</div>
                <div>{{item[1]}}</div>
            </div>
        </div>
        <div class="recommend">
            <listitem>
                <img src="../../assets/image/user/message.svg" slot="img">
                <div slot="text" class="recommend-text">{{info[0]}}</div>
            </listitem>
            <listitem>
                <img src="../../assets/image/user/core.svg" slot="img">
                <div slot="text" class="recommend-text">{{info[1]}}</div>
            </listitem>
            <listitem>
                <img src="../../assets/image/user/card.svg" slot="img">
                <div slot="text" class="recommend-text-two">{{info[2]}}</div>
            </listitem>
            <listitem>
                <img src="../../assets/image/user/shopcar.svg" slot="img">
                <div slot="text" class="recommend-text">{{info[3]}}</div>
            </listitem>
            <listitem>
                <img src="../../assets/image/user/APP.svg" slot="img">
                <div slot="text">{{info[4]}}</div>
            </listitem>
        </div>
    </div>
</template>

<script>
import navbar from "../../components/common/navbar/navbar"
import listitem from "./listitem"

export default {
    name: "user",
    data() {
        return {
            text: [["0.00元","我的余额"], ["0个","我的优惠"], ["0分","我的积分"]],
            info: ["我的消息", "积分商城", "会员卡", "我的购物车", "下载购物App"]
        }
    },
    components: {
        navbar,
        listitem
    }
}
</script>

<style scoped>
    .user-nav {
        /* background-color: #ff5777; */
        background-color: rgb(236, 41, 41);
    }
    img {
        height: 30px;
        width: 30px;
    }
    .login {
        display: flex;
        height: 120px;
        width: 100%;
        /* background-color: #ff5777; */
        background-color: rgb(236, 41, 41, 0.9);
        color: aliceblue;
    }
    .left {
        width: 20%;
        text-align: center;
        /* line-height: 120px; */
    }
    .left img {
        height: 60px;
        width: 60px;
        position: relative;
        top: 28px;
    }
    .middle {
        width: 60%;
        font-size: 12px;
    }
    .middle .info {
        position: relative;
        top: 35px;
        padding-left: 25px;
    }
    .middle .info .text{
        position: relative;
        top: -5px;
    }
    .middle img {
        height: 20px;
        width: 20px;
    }
    .info div {
        font-size: 20px;
    }
    .right {
        width: 20%;
        text-align: center;
        line-height: 120px;
    }
    .right img {
        position: relative;
        top: 5px;
    }
    .context {
        display: flex;
        height: 80px;
        width: 100%;
        font-size: 16px;
        border-bottom: 20px solid rgb(243, 239, 239);
    }
    .context .div {
        flex: 1;
        text-align: center;
        margin-top: 20px;
    }
    .text-color {
        color: #ff5777;
    }
    .recommend {
        font-size: 16px;
    }
    .recommend img{
        height: 20px;
        width: 20px;
        padding: 15px 10px;
        width: 10%;
    }
    .recommend-text {
        border-bottom: 2px solid rgb(243, 239, 239);
        padding-bottom: 10px;
        width: 90%;
    }
    .recommend-text-two {
        border-bottom: 10px solid rgb(243, 239, 239);
        padding-bottom: 10px;
        width: 90%;
    }
</style>