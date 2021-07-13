<template>
    <Swiper :slideCountProps="bannerlist.length">
        <SwiperItem v-for="(item, index) in bannerlist" :key="index" class="swiper-item">
            <a :href="item.link">
                <img :src="item.image" @load="bannerImgLoad">
            </a>
        </SwiperItem>
    </Swiper>
</template>

<script>
import {Swiper, SwiperItem} from "../swiper"

export default {
    name: "banner",
    props: {
        bannerlist: {
            type: Array,
            default(){
                return []
            }
        }
    },
    data() {
        return {
            isLoad: true
        }
    },
    components:{
        Swiper,
        SwiperItem
    },
    methods: {
        // 当轮播图加载完成后发射一个 bannerFullImgLoad 事件到home.vue去计算控制栏的offsetTop
        bannerImgLoad(){
            if(this.isLoad){
                this.$emit("bannerFullImgLoad");
                this.isLoad = false;
            }
        }
    }
}
</script>

<style scoped>
    .swiper-item img {
        width: 100%;
        height: 200px;
    }
</style>