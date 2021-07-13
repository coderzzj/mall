<template>
    <div class="list-item">
        <slot name="img"></slot>
        <slot name="text"></slot>
    </div>
</template>

<script>
export default {
    name: "listutem",
}
</script>

<style scoped>
    .list-item {
        display: flex;
        height: 50px;
        width: 100%;
        line-height: 50px;
    }
</style>