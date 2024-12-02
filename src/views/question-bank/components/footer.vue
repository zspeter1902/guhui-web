<template>
    <div>
        <div class="footerheight"></div>
        <div class="topic-footer">
            <ul class="flex ai-center jc-around">
                <li @click="toggleCollection()">
                    <img :src="favorite ? footerList[0].selectedIcon : footerList[0].icon" />
                </li>
                <slot name="first"></slot>
                <slot name="second"></slot>
                <li @click="openCalculator()">
                    <img :src="footerList[1].icon" />
                </li>
                <li @click="alertFont()">
                    <img :src="footerList[2].icon" />
                </li>
            </ul>
            <transition name="fade">
                <div v-show="isShow" class="font-list">
                    <div class="flex ai-center jc-around">
                        <span v-for="(item,index) in fontList" :class="{'active':active==index}" @click="changeFont(index)">{{item}}</span>
                    </div>
                </div>
            </transition>
            
        </div>
        <transition name="fade">
            <calc v-show="isCalc" @close="onClose"></calc>
        </transition>
    </div>
</template>

<script>
    import Calc from '@/components/calc/index'
    export default {
        name: 'TopicFooter',
        props: {
            favorite: {
                type: Boolean,
                default: false,
            }
        },
        components: {
          Calc  
        },
        data() {
            return {
                isShow: false,
                isCalc: false,
                active: 1,
                fontList: ['Aa','Aa','Aa'],
                footerList: [{
                        name: "收藏",
                        icon: require('../../../views/image/icon_10.png'),
                        selectedIcon: require('../../../views/image/icon_10_red.png'),
                    },
                    {
                        name: "计算器",
                        icon: require('../../../views/image/icon_12.png'),
                    },
                    {
                        name: "设置",
                        icon: require('../../../views/image/icon_13.png'),
                    }
                ]
            }
        },
        methods: {
            onClose() {
                this.isCalc = false
            },
            // 收藏与取消收藏
            toggleCollection() {
                this.$emit('collection')
            },
            switchTo(path) {
                // console.log(this.$router)
                this.$router.replace(path);
            },
            // 弹出字体大小选择
            alertFont() {
                this.isShow = !this.isShow
            },
            // 传递更改字体大小参数
            changeFont(index) {
                this.active = index
                this.alertFont()
                this.$emit('font',index)
            },
            // 计算器
            openCalculator() {
                this.isCalc = true
            }
        },
    }
</script>

<style scoped>
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
    .footerheight {
        height: 1.24rem
    }

    .topic-footer {
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 1.226666rem;
        background: #fff;
    }
    .topic-footer::before{
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 1px;
        transform: scale(1,0.5);
        transform-origin: center bottom;
        background-color: #e7e7e7;
    }
    .topic-footer ul {
        position: relative;
        height: 100%;
    }
    .topic-footer >>> img,
    .topic-footer img {
        width: auto;
        height: 0.466666rem;
    }
    .topic-footer li >>> span,
    .topic-footer li span{
        display: inline-block;
        padding: 0 0.186666rem;
        border: 0.013333rem solid #bbb;
        line-height: 0.72rem;
        color: #333;
        font-size: 0.346666rem;
        border-radius: 0.36rem;
        transition: all .2s;
    }
  /*  .topic-footer li a:hover{
        background-color: #FF6801;
        color: #fff;
        border-color: #ff6801;
    } */
    .font-list{
        position: absolute;
        bottom: 1.48rem;
        right: 0.24rem;
        width: 3.893333rem;
        height: 1.413333rem;
        background-color: #fff;
        border-radius: 0.186666rem;
        /* box-shadow: 0 0.053333rem 0.386666rem 0 rgba(0, 0, 0, 0.07); */
        filter: drop-shadow(0 0.053333rem 0.386666rem rgba(0,0,0,0.07));
    }
    .font-list::before{
        content: '';
        position: absolute;
        top: 100%;
        right: 0.666666rem;
        width: 0;
        height: 0;
        border: 7px solid transparent;
        border-top-color: #fff;
    }
    .font-list div{height: 100%;padding: 0 0.133333rem;}
    .font-list span{
        display: inline-block;
        padding: 0.266666rem 0.133333rem;
        color: #999;
     }
    .font-list span:nth-of-type(1){
        font-size: 0.373333rem;
    }
    .font-list span:nth-of-type(2){
        font-size: 0.453333rem;
    }
    .font-list span:nth-of-type(3){
        font-size: 0.506666rem;
    }
    .font-list span.active{color: #333;}
</style>
