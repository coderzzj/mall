<template>
    <div class="detail-comment">
        <div class="comment-nav">
            <div class="comment-nav-left" v-if="rate.list||rate.cRate==0">用户评价</div>
            <div class="comment-nav-right" @click="moreClickHandle" v-if="rate.list||rate.cRate==0">更多</div>
        </div>
        <div v-if="rate.list">
            <div v-for="(item, index) in rate.list" :key="index" v-show="index==0||showFlag">
                <div class="user-info">
                    <img :src="item.user.avatar" alt="" srcset="">
                    <span>{{item.user.uname}}</span>
                </div>
                <p>{{item.content}}</p>
                <div class="time-style-info">
                    <!-- 用js将从后台得到的时间戳（秒数）转换为想要的日期格式 -->
                    <span>{{new Date(item.created*1000).toLocaleString()}}</span>
                    <span>{{item.style}}</span>
                </div>
            </div>
        </div>
        <div v-if="rate.cRate==0" class="no-comment" >
            <p>当前无任何评论<br>
                快来评价吧!
            </p>
        </div>
    </div>
</template>

<script>
// 重写Date对象原型
Date.prototype.toLocaleString = function() {
    return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate() + " "+ this.getHours() + "点" + this.getMinutes() + "分" + this.getSeconds() + "秒";
};
export default {
    name: "detailcomment",
    data() {
        return {
            // 是否加载更多
            showFlag: false
        }
    },
    props: {
        rate: {
            type: Object,
            default(){
                return {}
            }
        }
    },
    methods: {
        moreClickHandle(){
            console.log("加载更多评论...");
            this.showFlag = true;
        }
    }
}
</script>

<style scoped>
    .detail-comment {
        font-size: 16px;
        border-bottom: 10px solid rgba(221, 212, 212, 0.788);
        margin-bottom: 5px;
    }
    .comment-nav{
        height: 50px;
        line-height: 50px;
        border-bottom: 2px solid rgba(221, 212, 212, 0.788);
    }
    .comment-nav .comment-nav-left {
        padding-left: 10px;
        float: left;
        color: rgb(231, 27, 44);
    }
    .comment-nav .comment-nav-right {
        padding-right: 10px;
        float: right;
        color: rgb(231, 27, 44);
    }
    .user-info {
        padding: 10px 10px;
    }
    .user-info img {
        height: 35px;
        width: 35px;
        border-radius: 100%;
    }
    .user-info span {
        position: relative;
        top: -10px;
        padding-left: 10px;
    }
    p {
        padding: 10px 10px;
        color: rgb(48, 45, 45);
    }
    .time-style-info {
        padding: 10px 10px;
        color: rgba(170, 164, 164, 0.815);
    }
    .time-style-info span {
        padding: 0px 10px;
    }
    .no-comment {
        height: 150px;
        text-align: center;
    }
    .no-comment p {
        margin: 0 auto;
    }
</style>