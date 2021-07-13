<template>
    <div class="nav-bar">
        <div class="left"><slot name="left"></slot></div>
        <div class="middle"><slot name="middle"></slot></div>
        <div class="right"><slot name="right"></slot></div> 
    </div>
</template>

<script>
export default {
    name: "navbar"
}
</script>

<style scoped>
    .nav-bar {
        display: flex;
        text-align: center;
        height: 44px;
        width: 100%;
        line-height: 44px;
        color: aliceblue;
        box-shadow: 0px 2px 2px rgba(120, 120, 120, 0.2);
        z-index: 3;
    }
    .left, .right {
        width: 60px;
    }

    .middle {
        flex: 1;
    }
</style>