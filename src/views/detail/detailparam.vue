<template>
    <div class="detail-param">
        <div v-for="(item, index) in goodsparam.tables" :key="index" class="param-item">
            <div class="item-key">{{item[0]}}</div>
            <div class="item-value">{{item[1]}}</div>
            <div class="item-value">{{item[2]}}</div>
            <div class="item-value">{{item[3]}}</div>
        </div>
        <div v-for="(item, index) in goodsparam.set" :key="index+'a'" class="param-item">
            <div class="set-item-key">{{item.key}}</div>
            <div class="set-item-value" :class="{active: item.key!=='颜色'&&item.key!=='厂址'}" >{{item.value}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "detailparam",
    data() {
        return {

        }
    },
    props: {
        goodsparam: {
            type: Object,
            default(){
                return {}
            }
        }
    }
}
</script>

<style scoped>
    .detail-param {
        border-bottom: 10px solid rgba(228, 222, 222, 0.76);
    }
    .param-item {
        display: flex;
        border-top: 1px solid rgba(228, 222, 222, 0.76);
    }
    .param-item div {
        /* flex: 1; */
        font-size: 16px;
        padding-left: 3%;
        border-bottom: 1px solid rgba(228, 222, 222, 0.76);
    }
    .item-key {
        width: 15%;
        height: 50px;
        line-height: 50px;
    }
    .item-value {
        width: 31%;
        text-align: center;
        height: 50px;
        line-height: 50px;
    }
    .set-item-key {
        width: 30%;
        line-height: 50px;
        line-height: 50px;
    }
    .set-item-value {
        width: 70%;
        color: rgba(206, 18, 18, 0.747);
    }
    .active {
        height: 50px;
        line-height: 50px;
    }
</style>