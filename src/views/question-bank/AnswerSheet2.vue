<template>
    <div class="parse-box text-left">
        <global-title title="答题卡" :leftEvent="false" @left="onLeft"></global-title>
        <div class="state flex ai-center jc-between">
            <div class="flex">
                <p><span class="cycle"></span>未做 : {{listsAll.length - doed}}</p>
                <p><span class="cycle right"></span>已做 : {{doed}}</p>
            </div>
        </div>
        <div class="list" v-if="list1.length">
            <h5>单项选择题（{{list1.length}}题）</h5>
            <ul class="flex flex-wrap text-center">
                <li :class="{right: item.select.length}" v-for="(item,index) in list1" :key="item.id">
                    <span @click="onSelect(item,index)">{{index+1}}</span>
                </li>
            </ul>
        </div>
        <div class="list" v-if="list2.length">
            <h5>多项选择题（{{list2.length}}题）</h5>
            <ul class="flex flex-wrap text-center">
                <li :class="{right: item.select.length}" v-for="(item,index) in list2" :key="item.id">
                    <span @click="onSelect(item,index)">{{list1.length + index+1}}</span>
                </li>
            </ul>
        </div>
        <div class="list" v-if="list3.length">
            <h5>判断题（{{list3.length}}题）</h5>
            <ul class="flex flex-wrap text-center">
                <li :class="{right: item.select.length}" v-for="(item,index) in list3" :key="item.id">
                    <span @click="onSelect(item,index)">{{list1.length + list2.length + index+1}}</span>
                </li>
            </ul>
        </div>
        <div class="list" v-if="list4.length">
            <h5>不定项选择题（{{list4.length}}题）</h5>
            <ul class="flex flex-wrap text-center">
                <li :class="{right: isUndef(item.child)}" v-for="(item,index) in list4" :key="item.id">
                    <span @click="onSelect(item,index)">{{list1.length + list2.length + list3.length + index+1}}</span>
                </li>
            </ul>
        </div>
        <div class="list" v-if="list5.length">
            <h5>综合题（{{list5.length}}题）</h5>
            <ul class="flex flex-wrap text-center">
                <li :class="{right: isFill(item.child)}" v-for="(item,index) in list5" :key="item.id">
                    <span @click="onSelect(item,index)">{{list1.length + list2.length + list3.length + list4.length + index+1}}</span>
                </li>
            </ul>
        </div>
        <div class="footer-height"></div>
        <div class="footer flex text-center">
            <button type="button" @click="onSubmit" class="submit">交卷并查看结果</button>
        </div>
    </div>
</template>

<script>
    import GlobalTitle from '@/components/title.vue'
    export default {
        name: "AnswerSheet2",
        props: {
            lists: {
                type: Array,
                default: () => []
            },
        },
        data() {
            return {
                listsAll: [],
                list1: [],
                list2: [],
                list3: [],
                list4: [],
                list5: [],
                doed: 0
            }
        },
        watch:{
          lists: {
              handler(){
                  this.changeList()
              },
              deep: true
          }  
        },
        created() {
            this.listsAll = this.lists
            this.changeList()
        },
       
        methods: {
            isFill(arr){
                const result = arr.every((item,index,arr)=>{
                    return !!item.do_score == true
                })
                return result;
            },
            isUndef(arr) {
                const result = arr.every((item,index,arr)=>{
                    return !!item.select && item.select.length > 0
                })
                return result;
            },
            onSubmit() {
                this.$emit('submit')
            },
            onLeft() {
                this.$emit('left')
            },
            onSelect(item, index) {
                this.$emit('select', {
                    item: item,
                    index: index
                })
            },
            changeList() {
                this.doed = 0
                this.list1 = []
                this.list2 = []
                this.list3 = []
                this.list4 = []
                this.list5 = []
                for (let item of this.listsAll) {
                    if (item.post_type == 1) {
                        this.list1.push(item)
                    }
                    if (item.post_type == 2) {
                        this.list2.push(item)
                    }
                    if (item.post_type == 3) {
                        this.list3.push(item)
                    }
                    if (item.post_type == 4) {
                        this.list4.push(item)
                    }
                    if (item.post_type == 5) {
                        this.list5.push(item)
                    }
                }
                if (this.list1) {
                    this.onChange('list1', this.list1)
                }
                if (this.list2) {
                    this.onChange('list2', this.list2)
                }
                if (this.list3) {
                    this.onChange('list3', this.list3)
                }
                if (this.list4) {
                    this.onChange('list4', this.list4)
                }
                if (this.list5) {
                    this.onChange('list5', this.list5)
                }
            },
            onChange(obj, list) {
                for (let item of list) {
                    if (item.select.length) {
                        this.doed = this.doed + 1
                    }
                }
                this.$emit('do', this.doed)
            },
        },
        
        components: {
            GlobalTitle,
        },
    }
</script>
<style scoped>
    .state {
        height: 1.12rem;
        padding: 0 0.4rem;
        background-color: #f8f8f8;
    }

    .state p {
        margin: 0 .48rem 0 0;
        font-size: 0.4rem;
        color: #666;
        line-height: 1;
    }

    .state .cycle {
        display: inline-block;
        width: 0.453333rem;
        height: 0.453333rem;
        margin-right: 0.133333rem;
        border-radius: 0.226666rem;
        border: 0.026666rem solid #e7e7e7;
        vertical-align: top;
        box-sizing: border-box;
    }

    .state .right {
        border-color: #5B8DFE;
        background-color: #5B8DFE;
    }

    .state .error {
        border-color: #F5444C;
        background-color: #F5444C;
    }

    .list {
        padding: 0 0.4rem;
        margin-bottom: 0.213333rem;
        overflow: hidden;
    }

    .list h5 {
        margin: 0.56rem 0 0.24rem;
        font-size: 0.4rem;
        color: #333;
        font-weight: normal;
    }

    .list ul {
        margin: 0 -0.333333rem;
    }

    .list span {
        display: inline-block;
        width: 0.973333rem;
        height: 0.973333rem;
        margin: 0.28rem 0.333333rem;
        border: 0.013333rem solid #e7e7e7;
        line-height: 0.973333rem;
        color: #666;
        font-size: 0.4rem;
        border-radius: 0.493333rem;
        box-sizing: border-box;
    }

    .list .right span {
        background-color: #5B8DFE;
        border-color: #5B8DFE;
        color: #fff;
    }

    .list .error span {
        background-color: #F5444C;
        border-color: #F5444C;
        color: #fff;
    }

    .footer-height {
        height: 1.4rem;
    }

    .footer {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
    }

    .footer .btn {
        display: inline-block;
        width: 50%;
        height: 1.226666rem;
        font-size: 0.426666rem;
        line-height: 1.226666rem;
    }

    .btn-red {
        background-color: #F5444C;
        color: #fff;
    }

    .btn-blue {
        background-color: #5B8DFE;
        color: #fff;
    }

    .submit {
        width: 100%;
        height: 1.36rem;
        border: none;
        background-color: #ff6801;
        font-size: 0.4rem;
        color: #fff;
    }
</style>
