<template>
  <div class="news-container">
    <!-- banner -->
    <banner :banner="banner" />
    <div class="container">
      <breadcrumb />
      <article class="detail">
        <div class="article-header text-center">
          <h4 class="article-title">{{ article.title }}</h4>
          <el-row type="flex" align="middle" justify="center" class="flex-wrap other">
            <span>发布时间：{{ article.date }}</span>
            <span>来源：{{ article.source }}</span>
          </el-row>
        </div>
        <div class="article-content" v-html="article.content" />
        <!-- <div class="article-footer"></div> -->
      </article>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import Banner from '@/components/Banner'
export default {
  name: 'NewsDetail',
  components: { Banner, Breadcrumb },
  data() {
    return {
      title: '新闻资讯',
      banner: require('img/news-banner.png'),
      article: {
        title: '本地|成都首场跨境电商B2B出口监管试点政策通报解读会成功举办',
        content: '<p>&nbsp;</p><section data-style-id="16093" data-support="96编辑器"><p><span style="font-size:16px;"><span style="font-family:arial,helvetica,sans-serif;">8月13日，海关总署最新发布关于扩大跨境电子商务企业对企业出口监管试点范围的公告——在现有试点海关基础上，增加合肥、福州、青岛、济南、武汉、长沙、拱北、湛江、南宁、重庆、成都、西安等12个直属海关开展跨境电商B2B出口监管试点。该公告自2020年9月1日起施行<em>。</em></span></span></p></section><p>&nbsp;</p><p><span style="font-size:16px;"><span style="font-family:arial,helvetica,sans-serif;">“新的监管模式下，企业申报流程是怎样的？”“企业可享受哪些通关便利？”……为进一步了解行业诉求，面对跨境电商平台的一连串提问，成都市商务局联合成都海关19日上午在成都全球跨境电商公共服务中心举办了关于海关总署2020年第92号公告政策通报解读会，旨在帮助企业快速“上车”，以赶上试点红利。</span></span></p><p>&nbsp;</p><p><img alt="" class="alignnone size-large wp-image-12601" height="394" src="http://image.cdkjt.com.cn/uploads/2020/08/微信图片_20200820092852.jpg?x-oss-process=image/resize,m_fill,w_1024,h_768" width="525" srcset="https://image.cdkjt.com.cn/uploads/2020/08/微信图片_20200820092852.jpg 4032w, https://image.cdkjt.com.cn/uploads/2020/08/_20200820092852.jpg?x-oss-process=image/resize,m_fill,w_300,h_225 300w, https://image.cdkjt.com.cn/uploads/2020/08/_20200820092852.jpg?x-oss-process=image/resize,m_fill,w_768,h_576 768w, https://image.cdkjt.com.cn/uploads/2020/08/_20200820092852.jpg?x-oss-process=image/resize,m_fill,w_1024,h_768 1024w" sizes="(max-width: 525px) 100vw, 525px"></p><p>&nbsp;</p><p><span style="font-size:16px;"><span style="font-family:arial,helvetica,sans-serif;">跨境电商B2B出口监管，是指境内企业借助跨境电商平台与境外企业达成交易后，通过跨境物流将货物直接出口送达境外企业，包括“跨境电商B2B直接出口”和“跨境电商出口海外仓”模式。</span></span></p><p>&nbsp;</p><p><span style="font-size:16px;"><span style="font-family:arial,helvetica,sans-serif;">解读会上，成都海关公布的一组数据也说明了“试点”的必要性——今年以前，成都跨境电商主要以进口业务为主，2017-2019年，出口业务仅占跨境电商零售整体业务的1.1%、39.3%、47.2%。但是今年上半年，出口业务比重猛增到78.1%。对此，在市商务局相关负责人看来，跨境电商B2B出口监管新模式，对鼓励企业开展跨境电商业务，推动海外仓模式发展、降低物流成本将发挥积极作用。</span></span></p><p>&nbsp;</p><p><span style="font-size:16px;"><span style="font-family:arial,helvetica,sans-serif;">会上，在场企业代表发言：“通过本次政策解读，我们了解到新的模式不仅简化了原有的报关手续，提高了报关效率，也盘活了物流资源，衔接更加顺畅，时间也进一步缩短。除此之外，还可享受优先查验的利好政策，自然企业的积极性也会更高，对于跨境电商行业的信心也势必将调动更多资源，加大投入。”据了解，超过一半的在场企业积极表示愿在9月1日开展首单业务。</span></span></p><p>&nbsp;</p><p><img alt="" class="alignnone size-large wp-image-12602" height="350" src="http://image.cdkjt.com.cn/uploads/2020/08/微信图片_20200820092905.jpg?x-oss-process=image/resize,m_fill,w_1024,h_683" width="525" srcset="https://image.cdkjt.com.cn/uploads/2020/08/微信图片_20200820092905.jpg 5472w, https://image.cdkjt.com.cn/uploads/2020/08/_20200820092905.jpg?x-oss-process=image/resize,m_fill,w_300,h_200 300w, https://image.cdkjt.com.cn/uploads/2020/08/_20200820092905.jpg?x-oss-process=image/resize,m_fill,w_768,h_512 768w, https://image.cdkjt.com.cn/uploads/2020/08/_20200820092905.jpg?x-oss-process=image/resize,m_fill,w_1024,h_683 1024w" sizes="(max-width: 525px) 100vw, 525px"></p><p>&nbsp;</p><p><span style="color:#808080;"><span style="font-size:14px;"><span style="font-family:arial,helvetica,sans-serif;">以下为部分解读文件分享：</span></span></span></p><p>&nbsp;</p><section data-style-id="19829" data-support="96编辑器"><section><section data-width="25%"><section><section><p><span style="color:#FF0000;"><span style="font-size:16px;"><span style="font-family:arial,helvetica,sans-serif;"><strong>Q</strong><strong data-form="0" data-num="1">01 ：</strong><strong>跨境电商B2B出口、一般贸易出口、跨境电商零售出口有何不同？</strong></span></span></span></p><p>&nbsp;</p></section></section></section></section></section><p><img alt="" class="alignnone size-full wp-image-12603" height="880" src="http://image.cdkjt.com.cn/uploads/2020/08/图片1.png" width="640" srcset="https://image.cdkjt.com.cn/uploads/2020/08/图片1.png 640w, https://image.cdkjt.com.cn/uploads/2020/08/1.png?x-oss-process=image/resize,m_fill,w_218,h_300 218w" sizes="(max-width: 640px) 100vw, 640px"></p><p>&nbsp;</p><section data-style-id="19829" data-support="96编辑器"><p><span style="color:#FF0000;"><span style="font-size:16px;"><span style="font-family:arial,helvetica,sans-serif;"><strong>Q</strong></span></span><span style="font-size:16px;"><span style="font-family:arial,helvetica,sans-serif;"><strong data-form="0" data-num="1">02 ：</strong></span></span><span style="font-size:16px;"><span style="font-family:arial,helvetica,sans-serif;"><strong>对企业有哪些资质要求？</strong></span></span></span></p><p>&nbsp;</p></section><section data-style-id="27780" data-support="96编辑器"><p><span style="font-size:16px;"><span style="font-family:arial,helvetica,sans-serif;">1、办理企业注册登记：跨境电商平台、跨境电商平台企业、物流企业等参与跨境电商B2B出口业务的境内企业，应当依据海关报关单位注册登记有关规定在海关办理注册登记，并在跨境电商平台类型中勾选相应的企业类型；已办理注册登记未勾选企业类型的，可申请信息变更。</span></span></p><p>&nbsp;</p><p><span style="font-size:16px;"><span style="font-family:arial,helvetica,sans-serif;">2、办理出口海外仓业务模式备案：开展跨境电商出口海外仓业务的企业，还应在海关办理出口海外仓业务模式备案。具体如下：</span></span></p><p>&nbsp;</p><p><span style="font-size:16px;"><span style="font-family:arial,helvetica,sans-serif;"><strong>◆企业资质条件</strong>：开展跨境电商出口海外仓业务的境内企业应已在海关办理注册登记，且企业信用等级为一般信用及以上。</span></span></p></section>',
        date: '2020年8月20日',
        source: '成都日报'
      }
    }
  },
  methods: {
    handleClick(tab, event) {

    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/variables";
@import "~@/styles/mixin";
.detail {
  padding: 20px 0 40px;
  .article-header {
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px dashed #ddd;
  }
  .article-title {
    font-size: 24px;
    line-height: 32px;
    margin-bottom: 20px;
    font-weight: bold;
  }
  .other {
    color: #999;
    line-height: 24px;
    span {
      margin: 0 20px;
    }
  }
  .article-content {
    font-size: 16px;
    line-height: 36px;
    text-indent: 2em;
    text-align: justify;
    ::v-deep {
      img {
        display: block;
        max-width: 100%;
        height: auto;
      }
    }
  }
}
@media only screen and (max-width: 1199px) {
  .detail {
    padding: 18px 0 36px;
  }
}
@media only screen and (max-width: 991px) {
  .detail {
    padding: 15px 0 30px;
  }
}
@media only screen and (max-width: 767px) {
  .detail {
    padding: 10px 0 20px;
    .article-header {
      margin-bottom: 15px;
      padding-bottom: 15px;
    }
    .article-title {
      font-size: 20px;
      line-height: 30px;
      margin-bottom: 15px;
    }
    .other {
      span {
        margin: 0 10px;
      }
    }
    .article-content {
      font-size: 14px;
      line-height: 34px;
    }
  }
}
</style>
