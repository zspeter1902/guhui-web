<template>
    <div class="content text-center">
        <img src="@/views/image/tip.png" alt="">
        <p v-if="total - doed > 0">共{{total}}道题，还有{{total - doed}}道题未作答</p>
        <p v-else>共{{total}}道题，已全部作答完毕</p>
        <div class="flex ai-center jc-between">
            <a href="javascript:;" class="btn" @click="viewSheet">查看答题卡</a>
            <a href="javascript:;" class="btn btn-red" @click="onSubmit()">交卷</a>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ChapterExerciseDetail",
        props:['total','doed'],
        data() {
            return {
            }
        },
        created() {
        },
        computed: {
        },
        methods: {
            viewSheet(){
                this.$emit('view')
            },
            onSubmit(){
                this.$emit('submit')
            }
        },
        components: {
        },
    }
</script>
<style scoped>
    .content {
        padding: 0 1rem;
        margin-bottom: 0.266666rem;
    }
    .content img{
        width: 3.946666rem;
        margin-top: 2.466666rem;
    }
    .content p{
        margin: 0.213333rem 0 1.28rem;
        font-size: 0.346666rem;
        color: #333;
    }
    .btn{
        width: 3.466666rem;
        display: inline-block;
        border: 0.013333rem solid #FF6801;
        border-radius: 0.133333rem;
        text-align: center;
        line-height: 1.066666rem;
        color: #ff6801;
        font-size: 0.4rem;
    }
    .btn-red{
        background-color: #FF6801;
        color: #fff;
    }
    .submit{
        width: 1.56rem;
        height: 0.72rem;
        font-size: 0.346666rem;
        color: #fff;
        background-color: #5B8DFE;
        border: none;
        outline: none;
        border-radius: 0.36rem;
    }
    .submit:hover{opacity: 0.8;}
</style>
