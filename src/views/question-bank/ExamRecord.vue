<template>
    <div class="mainbox">
        <global-title title="做题记录" :left="false"></global-title>
        <div class="lists" v-if="topicRecordList.length > 0">
            <ul>
                <li v-for="(list,index) in topicRecordList" class="flex ai-center">
                    <div class="title">
                        <router-link :to="'/now-the-exam-record/' + category_id + '/' + list.out_order">{{list.zhen_name}}</router-link>
                        <p>{{list.last_date}} {{list.timing}}</p>
                    </div>
                    <p class="result"><span>{{list.score}}</span>分</p>
<!--                    <p v-else class="process">完成<span>{{list.examnum}}/{{list.total}}</span></p>-->
                </li>
            </ul>
        </div>
        <no-data v-else></no-data>
        <!-- <div class="fiexdheight"></div> -->
<!--        <footertab></footertab>-->
    </div>
</template>

<script>
    import GlobalTitle from '@/components/title.vue'
    import noData from '@/components/noData'
    // import footertab from '../../public/Footertab'
    export default {
        name: "ExamRecord",
        data() {
            return {
                category_id:'',
                topicRecordList:[]
            }
        },

        created() {
            //分类id
            var category_id = this.$route.params.category_id;
            console.log("category_id====",category_id);
            this.category_id = category_id;
            this.getList();
        },
        computed: {
        },
        methods: {
            getList() {
                var data = {};
                data.category_id = this.category_id;
                data.type = 2;
                this.$api('topicRecord',data).then(res=>{
                    console.log("topicRecord===========",res);
                    if(res.code == 1){
                        this.topicRecordList = res.data;
                    }else{
                        this.topicRecordList = [];
                    }
                })
            }
        },
        components: {
            GlobalTitle,
            noData
            // footertab
        },
    }
</script>
<style scoped>
    .mainbox{min-height: 100vh;background-color: #fff;}
    
    .lists{
        padding: 0 0.4rem;
        text-align: left;
    }
    .lists li{position: relative;margin: 0;}
    .lists li::after{
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        height: 1px;
        width: 100%;
        background-color: #e7e7e7;
        transform: scale(1, 0.5);
        transform-origin: center bottom;
    }
    .lists .title{
        position: relative;
        padding: 0.373333rem 0 .44rem;
        flex: 1;
    }
    .lists .title a{
        font-size: 0.4rem;
        color: #333;
        line-height: 0.533333rem;
    }
    .lists .title p{
        margin: 0.16rem 0 0;
        color: #999;
        font-size: 0.32rem;
    }
    .result{
        margin: 0 0 0 0.266666rem;
        font-size: 0.373333rem;
        color: #FF6801;
        letter-spacing: 0.013333rem;
    }
    .result span{font-size: 0.666666rem;font-weight: bold;}
    .process{
         margin: 0 0 0 0.266666rem;
        font-size: 0.373333rem;
        color: #333;
        letter-spacing: 0.013333rem;
    }
    .process span{color: #FF6801;}
</style>
