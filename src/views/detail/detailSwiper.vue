<template>
    <Swiper :slideCountProps="topImages.length">
        <SwiperItem v-for="(item, index) in topImages" :key="index" class="swiper-item">
            <img :src="item" alt="" srcset="" @load="swiperImgFullLoad">
        </SwiperItem>
    </Swiper>
</template>

<script>
import {Swiper, SwiperItem} from "../../components/common/swiper"

export default {
    name: "detailSwiper",
    data() {
        return {
            isload: true
        }
    },
    props: {
        topImages: {
            type: Array,
            default(){
                return [];
            }
        }
    },
    components: {
        Swiper,
        SwiperItem
    },
    methods: {
        swiperImgFullLoad(){
            if(this.isload){
                this.isload = false;
                this.$emit("swiperImgFullLoad");
            }
        }
    }
}
</script>

<style scoped>
.swiper-item {
    height: 380px;
    width: 100%;
}

img {
    height: 380px;
    width: 100%;
} 
</style>