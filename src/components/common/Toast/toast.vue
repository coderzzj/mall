<template>
    <div class="toast" v-show="isshow">
        <p>{{msg}}</p>
    </div>
</template>

<script>
export default {
    name: "toast",
    data(){
        return {
            msg: "",
            isshow: false
        }
    },
    methods: {
        show(msg, duration){
            this.isshow = true;
            this.msg = msg;
            setTimeout(()=>{
                this.isshow = false;
                this.msg = '';
            }, duration)
        }
    }
}
</script>

<style scoped>
    .toast {
        height: 100px;
        width: 80%;
        background-color: rgb(121, 113, 113);
        border-radius: 10px;
        color: aliceblue;
        position: absolute;
        left: 10%;
        right: 10%;
        bottom: 50%;
        text-align: center;
        line-height: 100px;
        z-index: 10;
    }
</style>