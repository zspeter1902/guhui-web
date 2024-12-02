<template>
  <div class="tab-content">
    <div class="custom-tabs">
      <el-link :underline="false" :class="{active: active == 0}" @click="active = 0">专利</el-link>
      <el-link :underline="false" :class="{active: active == 1}" @click="active = 1">商标</el-link>
      <el-link :underline="false" :class="{active: active == 2}" @click="active = 2">版权</el-link>
      <el-link :underline="false" :class="{active: active == 3}" @click="active = 3">商业秘密</el-link>
    </div>
    <!-- <el-card class="introduce">
      <h2>什么是知识产权</h2>
      <el-divider content-position="left">知识产权概述</el-divider>
      <div class="text item">
        公民或法人等主体依据法律的规定，对其从事智力创作或创新活动所产生的知识产品所享有的专有权利，又称为“智力成果权”、“无形财产权”。主要包括发明专利、商标以及工业品外观设计等方面组成的工业产权和自然科学、社会科学以及文学、音乐、戏剧、绘画、雕塑、摄影和电影摄影等方面的作品组成的版权（著作权）两部分。
      </div>
    </el-card> -->
    <transition name="fade">
      <!-- 专利 -->
      <div v-if="active == 0" class="custom-tab-content">
        <ul class="list">
          <li class="red">什么是专利?</li>
          <li>专利一般是由政府机关或者代表若干国家的区域性组织根据申请而颁发的一种文件，这种文件记载了发明创造的内容，并且在一定时期内产生这样一种法律状态，即获得专利的发明创造在一般情况下他人只有经专利权人许可才能予以实施。</li>
          <li class="red">专利的类型?</li>
          <li>专利法规定∶专利分为发明、实用新型、外观设计三种类型。</li>
          <li>"发明"是指对产品、方法或者其改进所提出的新的技术方案。</li>
          <li>"实用新型"是指对产品的形状、构造或者他们的结合所提出的适用于实用的技术方案。</li>
          <li>"外观设计"是指对产品的形状、图案、色彩或者结合所做出的富有美感并适用于工业上应用的新设计。有些国家，例如美国，只有发明和外观专利。</li>
        </ul>
        <el-row type="flex" justify="space-between" class="base-service">
          <h2>基础服务</h2>
          <el-link class="related" :underline="false" type="warning" target="_blank" href="/#/service/intellectual?q=专利">点击获取相关产品<i class="el-icon-s-promotion" /></el-link>
        </el-row>
        <ol class="service-list">
          <li>1.专利检索排查，并可以提出一些产品开发及专利规避及申请的建议</li>
          <li>2.专利申请及布局建议，成本优建议</li>
          <li>3.专利维权、申诉、和解及无效竞争对手等服务</li>
        </ol>
      </div>
      <!-- 商标 -->
      <div v-if="active == 1" class="custom-tab-content">
        <ul class="list">
          <li class="red">商标注册对于企业的价值</li>
          <li>促进企业技术创新，打破知识产品壁垒</li>
          <li>有效监控知识产权侵权与被侵权风险，程序化处理知识产权维权事务</li>
          <li>提升企业的知识产权创造、运用、管理和保护能力</li>
          <li>提升企业核心竞争力，降低企业经营风险，支撑企业持续发展</li>
          <li>对知识产权进行有效管理，最大化实现知识产权的价值</li>
        </ul>
        <el-image :src="registerImg" fit="cover" />
        <el-row type="flex" justify="space-between" class="base-service">
          <h2>基础服务</h2>
          <el-link class="related" :underline="false" type="primary" target="_blank" href="/#/service/intellectual?q=商标">点击获取相关产品</el-link>
        </el-row>
        <ol class="service-list">
          <li class="red">1.商标注册、续展、异议、出售、注销</li>
          <li class="red">2.商标备案</li>
          <li class="red">3.商标侵权</li>
        </ol>
      </div>
      <!-- 版权 -->
      <div v-if="active == 2" class="custom-tab-content">
        <ul class="list">
          <li class="red">版权的概念</li>
          <li>版权和著作权是同一个概念，是作者对自己的著作享有的法定权利。著作权是公民、法人依法享有的一种民事权利，属于无形财产权。享有著作权的作者可以决定是否对他的作品进行著作权意义上的使用，在我国，只要发表就会受到保护。</li>
          <li class="red">版权的分类</li>
          <li>文字作品：小说、散文、杂文、诗歌、剧本、学术论文、著作、期刊、教  材、书信。日记、报纸、广告词。</li>
          <li>口述作品：即兴的演说、授课、法庭辩论等以口头、语言形式表现的作品。</li>
          <li>音乐作品：歌曲、交响乐等能够演唱或者演奏的带词或不带词的作品。</li>
          <li>戏剧作品：话剧、歌剧、地方戏等为舞台演出而创作的作品，如剧本。</li>
          <li>曲艺作品：相声、单弦、评书、笑话、快板书、山东快书、京韵大鼓、京东大鼓、西河大鼓、河南坠子等形式的说唱脚本。</li>
          <li>舞蹈作品：舞蹈动作的设计和程序的编排，可以用文字或者其他特定方式记录下来。如用舞谱的形式表现舞蹈作品。如“定位舞谱法”</li>
          <li>杂技艺术作品：为车技、口技、顶碗、走钢丝、耍狮子、魔术等表演创作的剧本。</li>
          <li>美术作品：指绘画、书法、雕塑等以线条，色彩或者其他方式构成的具有审美意义的平面或者立体的造型艺术作品。纯美术作品：素描、油画、国画、版画、水彩画、企业标志、商标图形。实用美术作品：陶瓷艺术。</li>
          <li>建筑作品：建筑物的设计图纸或者是以建筑物为核心的绘画、摄影等。</li>
          <li>摄影作品</li>
        </ul>
        <el-row type="flex" justify="space-between" class="base-service">
          <h2>基础服务</h2>
          <el-link class="related" :underline="false" type="primary" target="_blank" href="/#/service/intellectual?q=版权">点击获取相关产品</el-link>
        </el-row>
        <ol class="service-list">
          <li>1.版权授权代理</li>
          <li>2.产品侵权状况监测</li>
          <li>3.调查维权和纠纷调解</li>
        </ol>
      </div>
      <!-- 商业秘密 -->
      <div v-if="active == 3" class="custom-tab-content">
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '知识产权',
      active: 0,
      registerImg: require('img/register.png')
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/variables";
.introduce {
  margin-top: 20px;
}
.tab-content {
  min-height: 300px;
  font-size: 16px;
  line-height: 36px;
  .indent {
    padding-left: 2em;
  }
  .indent-1 {
    padding-left: 4em;
  }
  p {
    margin-top: 10px;
    text-indent: 2em;
    .el-link {
      text-indent: 0;
    }
  }
  .custom-tabs {
    background-color: $infoColor;
    border-bottom: 2px solid $mainColor;
    .el-link {
      width: 160px;
      padding: 0 20px;
      line-height: 40px;
      color: #333;
      font-size: 16px;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      &.active {
        background-color: $mainColor;
        color: #fff;
      }
    }
  }
  .custom-tab-content {
    padding: 20px 16px 16px;
    .list {
      li {
        position: relative;
        padding-left: 20px;
        &:before {
            content: "";
            position: absolute;
            left: 0;
            top: 18px;
            margin-top: -5px;
            width: 10px;
            height: 10px;
            background-color: currentColor;
            border-radius: 50%;
            margin-right: 10px;
        }
      }
    }
    .red {
      color: $redColor;
    }
    .base-service {
      margin-top: 30px;
      position: relative;
      margin-bottom: 20px;
      line-height: 40px;
      font-weight: bold;
      border-bottom: 1px solid $mainColor;
      h2 {
        font-size: 18px;
        margin-right: 30px;
        border-radius: 10px;
      }
    }
    .service-list {
      padding: 0;
      list-style: none;
      li {
        padding: 2px 15px;
        margin-bottom: 10px;
        background-color: rgba($mainColor, 0.6);
        color: #fff;
        transition: all .3s;
      }
    }
    .related {
      padding: 0 20px;
      font-size: 18px;
      font-weight: bold;
      // color: #d1ba74;
      // background-color: $redColor;
      // border-radius: 20px;
      i {
        margin-left: 6px;
      }
    }
  }
}
@media only screen and (max-width: 991px) {
  .tab-content {
    .custom-tabs {
      .el-link {
        width: 140px;
      }
    }
  }
}
@media only screen and (max-width: 991px) {
  .tab-content {
    .custom-tabs {
      .el-link {
        width: 100px;
        font-size: 14px;
        line-height: 32px;
      }
    }
  }
}
</style>
