<template>
    <div>
        <div id="tabbar">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "tabbar",
    data(){
        return {

        }
    },
    components: {
       
    }
}
</script>

<style scoped>
#tabbar {
    display: flex;
    background-color: #f6f6f6;
    
    position: fixed;
    left: 0px;
    right: 0px;
    bottom: 0px;
    
    height: 49px;
    box-shadow: 0px -2px 2px rgba(120, 120, 120, 0.2);
}
</style>