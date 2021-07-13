import backup from "../components/common/scroll/backUp"

export const backupMixin = {
    data() {
        return {
            isshow: false
        }
    },
    components: {
        backup
    },
    methods: {
        backupClick(){
            this.$refs.scroll.scrollTo(0,0);
        },
        methods_isshow(position){
            return (-position.y) > 1000 ? this.isshow=true: this.isshow = false;
        }
    },
}