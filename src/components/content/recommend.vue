<template>
    <div id="recommend">
        <div v-for="(item, index) in recommends" :key="index" class="recommend">
            <a :href="item.lonk">
                <img :src="item.image" alt="" srcset="">
                <div>{{item.title}}</div>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: "recommend",
    props: {
        recommends: {
            type: Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style scoped>
    #recommend {
        display: flex;
        height: 170px;
        border-bottom: 10px solid rgba(212, 205, 205, 0.733);
    }
    .recommend {
        flex: 1;
        text-align: center;
        font-size: 15px;
        color: rgba(14, 5, 5, 0.5);
    }
    img {
        height: 45%;
        width: 80%;
        display: block;
        margin: 15px auto;
    }
</style>