<template>
    <div id="app">
        <!-- exclude 设置排除 保持路由状态的路由 exclude后面的值是组件的name属性值，切记！！ -->
        <keep-alive exclude="detail,shopcar,settlement"><router-view></router-view></keep-alive>
        <apptabbar></apptabbar>
    </div>
</template>

<script>
import apptabbar from "./components/content/Apptabbar"

export default {
    name: "App",
    components: {
        apptabbar,
    }
}
</script>

<style>
    #app {
        height: 100%;
        width: 100%;
    }
</style>