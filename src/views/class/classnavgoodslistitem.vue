<template>
    <div class="goods-list-item">
        <img :src="goodslistitem.image" @load="imghandleLoad">
        <div class="goods-info">
            <p>{{goodslistitem.title}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "goodslistitem",
    data() {
        return {
        
        }
    },
    props: {
        goodslistitem: {
            type: Object,
            default(){
                return {};
            }
        }
    },
    methods: {
        imghandleLoad(){
            this.$eventBus.$emit("allNavImghandleLoad");
        }
    }
}
</script>

<style scoped>
    .goods-list-item {
        width: 30%;
        padding: 0px 2px;
        position: relative;
        padding-bottom: 40px;
    }
    .goods-list-item img {
        width: 100%;
        /* 设置每个图片高度 */
        height: 98.5%;
        border-radius: 5px;
        margin-bottom: 4px;
    }
    .goods-info {
        position: absolute;
        bottom: 5px;
        left: 0px;
        right: 0px;
        font-size: 12px;
        overflow: hidden;
        text-align: center;
    }
    .goods-info p {
        overflow: hidden;
        /* 
           text-overflow 属性规定当文本溢出包含元素时发生的事情
           clip:修剪文本
           ellipsis:显示省略符号来代表被修剪的文本
           string:使用给定的字符串来代表被修剪的文本
         */
        text-overflow: ellipsis;
        /* 
           white-space 属性设置如何处理元素内的空白
           nowrap	文本不会换行，文本会在在同一行上继续，直到遇到 <br> 标签为止。
         */
        white-space: nowrap;
        margin-bottom: 3px;
        color: 14px;
    }
    /* .goods-info .price {
        color: rgb(223, 43, 43);
        margin-right: 20px;
    }
    .goods-info .collect {
        position: relative;
    }
    .goods-info .collect::before {
        content: "";
        position: absolute;
        left: -15px;
        top: 0px;
        height: 14px;
        width: 14px;
        background: url("../../assets/image/collect/collect.svg") 0 0/14px 14px no-repeat;
    } */
</style>