<template>
    <div class="detail-tabbar-item">
        <div class="img"><slot name="img"></slot></div>
        <div class="text"><slot name="text"></slot></div>
    </div>
</template>

<script>
export default {
    name: "detailtabbaritem",
}
</script>

<style scoped>
    .detail-tabbar-item {
        /* flex: 1; */
        font-size: 14px;
        height: 49px;
    }
</style>