<template>
    <div class="control-tab">
        <div v-for="(item, index) in title" :key="index" @click="itemClick(index)">
            <span :class="{active: index == currIndex}">{{item}}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "controlbar",
    props: {
        title: {
            type: Array,
            default(){
                return [];
            }
        }
    },
    data() {
        return {
            currIndex: 0
        }
    },
    methods: {
        itemClick(index){
            this.currIndex = index;
            this.$emit("selectItem",index);
        }
    }
}
</script>

<style scoped>
    .control-tab {
        display: flex;
        /* 不能设置透明度，否则盖不住下面的元素 */
        background-color: rgb(236, 233, 233);
        height: 44px;
        line-height: 44px;
        /* z-index: 3; */
    }
    .control-tab div {
        flex: 1;
        text-align: center;
        font-size: 15px;
    }
    span {
        padding: 5px 10px;
    }
    .active {
        border-bottom: 2px solid red;
        color: rgba(167, 42, 42, 0.74);
    }
</style>