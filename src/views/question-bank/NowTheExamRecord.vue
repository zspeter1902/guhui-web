<template>
    <div class="parse-box text-left" :class="fontClass[font]" v-loading="isLoading" element-loading-text="正在提交考试,请等待...">
        <div v-show="!isSheet">
            <global-title :title="countdown"></global-title>
            <div class="parse-stamp flex jc-between ai-center">
                <h5>{{examname}}</h5>
                <p><span>{{currentNum}}</span>/{{this.lists.length}}</p>
            </div>
            
            <div v-if="!isEnd">
                <!-- 题内容 -->
                <div :is="topicTypeTemplate" :topic="article" @change="onNext" :key="'do'+article.id" keep-alive></div>
            </div>
            <end v-else :total="this.lists.length" :doed="doed" @view="openSheet" @submit="onSubmit"></end>
            
            <topic-footer @collection="onCollection" :favorite="!!article.is_favorite" @font="changeFont">
                <li slot="first">
                    <a href="javascript:;" @click="openSheet">
                        <img src="../../views/image/icon_11.png" alt="答题卡">
                    </a>
                </li>
                <li slot="second">
                    <button type="button" class="submit" @click="onSubmit()">交卷</button>
                </li>
            </topic-footer>
        </div>
        <answer-sheet v-if="lists.length" v-show="isSheet" @left="onCloseSheet" @select="onSelect" :lists="lists"
            @do="getDoed" @submit="onSubmit"></answer-sheet>
        <!-- 提交弹窗 -->
        <transition name="fade">
            <layer :content="layer[layerIndex].content" @close="closeLayer()" v-show="isLayer" :btn="btn[0]" :btn2="btn[1]" @btn="onSure()" @btn2="closeLayer"> 
                <h3 class="countdown" slot='title' v-if="layer[layerIndex].title">{{layer[layerIndex].title}}</h3>
            </layer>
        </transition>
    </div>
</template>

<script>
    import TopicFooter from './components/footer'
    import Layer from './components/layer'
    import End from './ExamEnd.vue'
    import GlobalTitle from '@/components/title.vue'
    import AnswerSheet from './AnswerSheet2'
    // 单选
    import SingleChoice from './components/SingleChoice2'
    // 多选
    import MultipleChoice from './components/MultipleChoice2'
    import Judge from './components/Judge2'
    import Analysis from './components/Analysis'
    import UndefinedChoice from './components/UndefinedChoice'
    export default {
        name: "NowTheExamRecord",
        data() {
            return {
                no: null,
                id: null,
                typdid:null,
                examname: '开始考试',
                countdown: '',
                btn: ['确定提交','继续作答'],
                btn2: ['确定提交','保存进度'],
                btn3: ['提交答案','保存进度'],
                layer: [{title: '还剩104分钟',content:'确定结束作答并生成成绩报告吗？'},{title: '',content:'还有15道题未作答，确认交卷？'},{title: '',content:'确定结束作答并生成成绩报告吗？'}],
                layerIndex: 1,
                lists: [],
                article: {},//当前试题
                optionName: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
                currentNum: 0, //当前第几题
                timering: null,
                timer: null,
                timing: 1000, //点击几秒后跳转到下一题
                time: [], //记录每一题所用的时间
                fontClass: ['font-small', 'font-normal', 'font-big'],
                font: 1,
                isLoading: false,
                isSheet: false,
                isEnd: false,
                isLayer: false,
                hours: 0,
                minutes:0,
                seconds:0,
                doed: null,
            }
        },
        created() {
            this.no = this.$route.params.no
            this.typdid = this.$route.params.typeid
            this.init()
        },
        computed: {
            remainingTime () {
                return this.hours * 60 + this.minutes
            },
            topicTypeTemplate() {
                const type = {
                    '1': 'SingleChoice',
                    '2': 'MultipleChoice',
                    '3': 'Judge',
                    '4': 'UndefinedChoice',
                    '5': 'Analysis',
                }
                return type[this.article.post_type]
            },
        },
        methods: {
            init() {
                this.getDetail()
                this.getTime(new Date())
            },
            // 计算已做题数量
            getDoed(data) {
                this.doed = data
            },
            // 改变字体大小
            changeFont(val) {
                this.clearTime()
                this.font = val
            },
            // 打开答题卡
            openSheet() {
                this.clearTime()
                // this.isEnd = false
                this.isSheet = true
            },
            // 关闭答题卡
            onCloseSheet() {
                this.isSheet = false
            },
            closeLayer() {
                this.isLayer = false
            },
            openLayer() {
                this.isLayer = true
            },
            clearTime() {
                if (this.timer) {
                    clearTimeout(this.timer)
                }
            },
            // 切换下一题
            onNext(data) {
                this.clearTime()
                // 根据题型记录答案
                this.$nextTick(() => {
                    this.onChangeTopicType(data)
                })
                // 跳转下一题
                this.timer = setTimeout(() => {
                    if (this.currentNum + 1 > this.lists.length) {
                        this.timer = null
                        this.isEnd = true
                        return;
                    }
                    this.currentNum = this.currentNum + 1
                    this.article = this.lists[this.currentNum - 1]
                    // 清除
                    this.timer = null
                }, this.timing )
            },
            // 做题记录
            onChangeTopicType(data) {
                // 更改题信息
                this.lists[this.currentNum - 1].select = data.answer
                // this.$set(this.lists, this.currentNum - 1, this.lists[this.currentNum - 1])
            },
            // 答题卡选择切换题
            onSelect(data) {
                this.isEnd = false;
                const arr = this.lists
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].id == data.item.id) {
                        this.currentNum = i + 1
                        this.article = arr[i]
                        this.onCloseSheet()
                        return;
                    }
                }
            },
            // 弹出提交提醒
            onSubmit() {
                this.openLayer()
                // layer: [{title: '还剩104分钟',content:'确定结束作答并生成成绩报告吗？'},{title: '',content:'还有15道题未作答，确认交卷？'},{title: '',content:'确定结束作答并生成成绩报告吗？'}]
                this.$nextTick(() => {
                    if (this.lists.length - this.doed > 0) {
                        this.layerIndex = 1
                        this.layer[1].title = ''
                        this.layer[1].content = `还有${this.lists.length - this.doed}道题未作答，确认交卷？`
                        return;
                    } 
                    if (this.hours != 0 || this.minutes != 0) {
                        this.layerIndex = 0
                        this.layer[0].title = `还剩${this.remainingTime}分钟`
                        this.layer[0].content = '确定结束作答并生成成绩报告吗？'
                    } else {
                        this.layerIndex = 2
                        this.layer[2].title =''
                        this.layer[2].content = '确定结束作答并生成成绩报告吗？'
                    }
                })
            },
            // 提交考试
            onSure(i) {
                this.isLoading = true
                this.closeLayer()
                // 记录当前提交时间
                this.getTime(new Date())
                const timeing = this.difference()
                let single = []
                let much = []
                let ifs = []
                let fill = []
                for (let item of this.lists) {
                    if (item.post_type == 1 && item.select.length) {
                        single.push({id: item.id,value: item.select})
                    }
                    if (item.post_type == 2 && item.select.length) {
                        much.push({id: item.id,value: item.select})
                    }
                    if (item.post_type == 3 && item.select.length) {
                        ifs.push({id: item.id,value: item.select})
                    }
                    if (item.post_type == 4) {
                        for (let child of item.child) {
                            if (child.select && child.select.length > 0) {
                                if (child.post_type == 1 && child.select.length) {
                                    single.push({id: child.id,value: child.select})
                                }
                                if (child.post_type == 2 && child.select.length) {
                                    much.push({id: child.id,value: child.select})
                                }
                                if (child.post_type == 3 && child.select.length) {
                                    ifs.push({id: child.id,value: child.select})
                                }
                            }
                        }
                    }
                    if (item.post_type == 5) {
                        for (let child of item.child) {
                            if (!!child.do_score) {
                                fill.push({id: child.id,value: [child.select], score: item.do_score})
                            }
                        }
                    }
                }
                this.$api('topicExaminationSubmit', {
                    id: this.id,
                    timing: timeing,
                    single: single,
                    much: much,
                    if: ifs,
                    fill: fill,
                }).then(res => {
                    if (res.code != 1) {
                        this.$message({
                            message: res.message,
                            type: 'error',
                            duration: 2 * 1000
                        })
                        this.isLoading = false;
                        return;
                    }
                    // 跳转到练习报告
                    this.isLoading = false;
                    const out_order = res.data.out_order
                    setTimeout(()=>{
                        this.$router.push('/answer-report-two/' + this.typdid + '/' + this.id + '/' + out_order)
                    },1000)
                })
            },
            // 获取考试全部记录信息
            getDetail() {
                if (!this.no) {
                    this.$message({
                        message: '请重新进入页面',
                        type: 'warning',
                        duration: 2 * 1000,
                        onClose: () => {
                            this.$router.go(-1)
                        }
                    })
                    return;
                }
                this.$api('topicExaminationSelfRatingReport', {
                    out_order: this.no,
                }).then(res => {
                    if (res.code == 1) {
                        this.$nextTick(()=>{
                            for (let item in res.data.question) {
                                // if (item.post_type != 5) {
                                    for (let o of res.data.question[item].posts) {
                                        if (o.is_right) {
                                            o.select = o.u_answer
                                        } else {
                                            o.select = []
                                        }
                                        this.lists.push(o)
                                    }
                                    
                                // }
                            }
                            this.$set(this, 'examname', res.data.exam.name)
                            this.$set(this, 'id', res.data.exam.id)
                            this.article = this.lists[0]
                            this.currentNum = 1
                            this.timeParse(res.data.exam.duration)
                        })
                        return;
                    }
                    this.$message({
                        message: res.message,
                        type: 'error',
                        duration: 2 * 1000
                    })
                    this.$router.go(-1)
                })
            },
            timeParse(time){
                const timelist = time.split(':');
                this.hours = Number(timelist[0])
                this.minutes = Number(timelist[1])
                this.seconds = Number(timelist[2])
                this.countDownOne()
            },
            //收藏功能
            onCollection() {
                this.clearTime()
                this.$api('topicCollectionSave', {
                    post_id: this.article.id
                }).then(res => {
                    if (res.code == 1) {
                        this.$message({
                            message: res.message,
                            type: 'success',
                            duration: 2 * 1000
                        })
                        // this.article.is_favorite = 1
                        this.$set(this.article, 'is_favorite', !this.article.is_favorite)
                        return;
                    }
                    this.$message({
                        message: res.message,
                        type: 'success',
                        duration: 2 * 1000
                    })
                });
            },
            // 记录时间
            getTime(date) {
                Date.prototype.Format = function(fmt) {
                    var o = {
                        "M+": this.getMonth() + 1, //月份
                        "d+": this.getDate(), //日
                        "h+": this.getHours(), //小时
                        "m+": this.getMinutes(), //分
                        "s+": this.getSeconds(), //秒
                        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                        "S": this.getMilliseconds() //毫秒
                    };
                    if (/(y+)/.test(fmt))
                        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                    for (var k in o)
                        if (new RegExp("(" + k + ")").test(fmt))
                            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr((
                                "" + o[k]).length)));
                    return fmt;
                };
                this.time.push(date.Format("yyyy/MM/dd hh:mm:ss"))
            },
            difference() {
                var dateBegin = new Date(this.time[0]);
                var dateEnd = new Date(this.time[this.time.length - 1]);
                var dateDiff = dateEnd.getTime() - dateBegin.getTime(); //时间差的毫秒数
                var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)); //计算出相差天数
                var leave1 = dateDiff % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
                var hours = Math.floor(leave1 / (3600 * 1000)); //计算出小时数
                //计算相差分钟数
                var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
                var minutes = Math.floor(leave2 / (60 * 1000)); //计算相差分钟数
                //计算相差秒数
                var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
                var seconds = Math.round(leave3 / 1000);
                return this.Zerofilling(((dayDiff * 24) + hours)) + "-" + this.Zerofilling(minutes) + "-" + this.Zerofilling(
                    seconds);
            },
            //补零
            Zerofilling(time) {
                if (time < 10) {
                    return '0' + time;
                }
                return time;
            },
            // 获取倒计时
            countDownOne() {
                this.timering = window.setInterval(() => {
                    if (this.hours !== 0) {
                        if (this.minutes === 0 && this.seconds === 0) {
                            this.minutes = 59
                            this.seconds = 59
                            this.hours -= 1
                        } else if (this.seconds !== 0) {
                            this.seconds -= 1
                        } else if (this.minutes !== 0 && this.seconds === 0) {
                            this.minutes -= 1
                            this.seconds = 59
                        }
                    } else {
                        if (this.minutes === 0 && this.seconds === 0) {
                          this.seconds = 0
                          window.clearInterval(this.timering)
                        } else if (this.seconds !== 0) {
                          this.seconds -= 1
                        } else if (this.minutes !== 0 && this.seconds === 0) {
                          this.minutes -= 1
                          this.seconds = 59
                        }
                    }
                    this.countdown = this.Zerofilling(this.hours) + ':' + this.Zerofilling(this.minutes) + ':' + this.Zerofilling(this.seconds)
                }, 1000)
            }
        },
        destroyed() {
            // 退出后清除计时器
            clearTimeout(this.timer)
            clearTimeout(this.timering)
        },
        components: {
            TopicFooter,
            Layer,
            End,
            AnswerSheet,
            GlobalTitle,
            SingleChoice,
            MultipleChoice,
            Judge,
            Analysis,
            UndefinedChoice
        },
    }
</script>
<style scoped>
    .parse-box{
        min-height: 100vh;
        background-color: #fff;
    }
    /* 定义进入和离开时候的过渡状态 */
    .fade-enter-active,
    .fade-leave-active {
      transition: all 0.3s ease-out;
    }
    /* 定义进入过渡的开始状态 和 离开过渡的结束状态 */
    .fade-enter,
    .fade-leave-to {
      opacity: 0;
    }
    .parse-stamp{
        margin-top: 0.133333rem;
        padding: 0.373333rem 0.44rem 0.373333rem 0.586666rem;
        border-bottom: 0.013333rem solid #e7e7e7;
    }
    .parse-stamp h5{
        margin: 0 0.533333rem 0 0;
        font-size: 0.346666rem;
        color: #999;
        font-weight: normal;
        line-height: 0.48rem;
    }
    .parse-stamp p{
        margin: 0;
        font-size: 0.346666rem;
        color: #333;
    }
    .parse-stamp p span{
        line-height: 0.2rem;
        font-size: 0.613333rem;
        color: #ff6801;
        font-weight: bold;
    }
    .title{
        position: relative;
        margin: 0.48rem 0;
        font-size: 0.426666rem;
        line-height: 0.56rem;
        font-weight: bold;
        color: #333;
    }
    .topic-info{
        margin-bottom: 0.266666rem;
        padding: 0 0.4rem;
    }
    .topic-info img {
        width: 0.373333rem;
    }
    .topic-title-info {
        margin-top: -0.32rem;
        margin-bottom: 0.8rem;
        line-height: 1.013333rem;
        color: #333;
        font-size: 0.493333rem;
    }
    .topic-info li {
        margin-top: 0.266666rem;
        padding: 0.426666rem;
        border-radius: 0.266666rem;
        font-size: 0.48rem;
        background-color: #FAFBFD;
        color: #666;
        line-height: 0.64rem;
    }
    .topic-info li .icon{
        display: inline-block;
        width: 0.56rem;
        height: 0.56rem;
        line-height: 0.506666rem;
        font-size: 0.466666rem;
        text-align: center;
        border-radius: 0.293333rem;
    }
    .topic-info .icon{margin-right: 0.266666rem;}
    .topic-info li.active { background-color: #F7F9FF; color: #5B8DFE;}
    .topic-info li.active .icon{background-color: #5B8DFE;color: #fff;}
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
    .countdown{
        margin: 0.2rem 0 0;
        font-size: 0.426666rem;
        color: #333;
    }
    /* 缩小字体 */
    .font-small>>>.global-title h2 button {
        font-size: 0.32rem;
    }
    
    .font-small .parse-stamp p {
        font-size: 0.32rem;
    }
    
    .font-small .parse-stamp p span {
        font-size: 0.533333rem;
    }
    
    .font-small .title,
    .font-small>>>.title {
        font-size: 0.373333rem;
        line-height: 0.48rem;
    }
    
    .font-small>>>.topic-title-info {
        line-height: 0.906666rem;
        font-size: 0.426666rem;
    }
    
    .font-small>>>.topic-info li {
        font-size: 0.426666rem;
        line-height: 0.586666rem;
    }
    
    .font-small>>>.topic-info li .icon {
        font-size: 0.4rem;
    }
    
    /* 放大字体 */
    .font-big>>>.global-title h2 button {
        font-size: 0.426666rem;
    }
    
    .font-big .parse-stamp h5 {
        font-size: 0.4rem;
    }
    
    .font-big .parse-stamp p {
        font-size: 0.4rem;
    }
    
    .font-big .parse-stamp p span {
        font-size: 0.666666rem;
    }
    
    .font-big .title,
    .font-big>>>.title {
        font-size: 0.48rem;
    }
    
    .font-big>>>.topic-title-info {
        font-size: 0.533333rem;
        line-height: 1.066666rem;
    }
    
    .font-big>>>.topic-info li {
        font-size: 0.533333rem;
        line-height: 0.72rem;
    }
    
    .font-big>>>.topic-info li .icon {
        font-size: 0.506666rem;
        margin-top: 0.08rem;
    }
    
    
</style>
