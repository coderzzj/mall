<template>
    <div class="backUp">
        <img src="..\..\..\assets\image\backUp\backup.svg" alt="" srcset="">
    </div>
</template>

<script>
export default {
    name: "backUp",
}
</script>

<style scoped>
    img {
        height: 25px;
        width: 30px;
        padding-top: 5px;
    }
    .backUp {
        height: 35px;
        width: 35px;
        position: fixed;
        right: 10px;
        bottom: 60px;
        border: 1px solid beige;
        border-radius: 100%;
        line-height: 35px;
        text-align: center;
        background-color: #fff;
        z-index: 9;
    }
</style>