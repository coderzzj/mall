<template>
    <div class="tabbaritem" @click="tabbaritem_click" @mouseleave="tabbaritem_mouseleave">
        <slot name="tab-img" v-if="!isflag"></slot>
        <slot name="tab-img-active" v-else></slot>
        <div :style="isactiveColor">
            <slot name="tab-text"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "tabbaritem",
    data(){
        return {
            // flag: true,
            // isactiveclass: {
            //     active: false
            // },
            clickCount: 1
        }
    },
    props: {
        path: {
            type: String,
            default: ""
        },
        activeColor: {
            type: String,
            default: "red"
        }
    },
    computed: {
        isflag(){
            return this.$route.path.indexOf(this.path) !== -1;
        },
        isactiveColor(){
            // 方法一：
            // if(this.isflag){
            //     return "color:" + this.activeColor;
            // }  
            // 方法二：
            return this.isflag ? {color: this.activeColor} : {};
        }
    },
    methods: {
        tabbaritem_click(){
            if(this.clickCount == 1){
                this.$router.push(this.path);
                // this.flag = false;
                // this.isactiveclass.active = true;
                this.clickCount++;
            }
        },
        tabbaritem_mouseleave(){
            // this.flag = true;
            // this.isactiveclass.active = false;
            this.clickCount = 1;
        }
    }
}
</script>

<style scoped>
.tabbaritem {
    flex: 1;
    text-align: center;
    height: 49px;
    cursor: pointer;
}
/* vertical-align: middle这个css可以去除图片下方自带的3px距离 */
 .tabbaritem img {
        width: 22px;
        height: 22px;
        margin-top: 4px;
        padding: 0px;
        vertical-align: middle;
}  
.tabbaritem div {
    font-size: 12px;
    padding: 0px;
    margin-top: 2px;
}

/* .active {
    color: rgba(207, 15, 15, 0.925);
} */
</style>