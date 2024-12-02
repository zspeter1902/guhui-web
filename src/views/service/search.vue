<template>
  <div class="service-container">
    <!-- banner -->
    <banner :banner="banner" />
    <!-- 导航 -->
    <!-- layout -->
    <div class="container">
      <div class="overseas">
        <!-- 列表 -->
        <div v-for="item of lists" :key="item.id">
          <card :info="item" />
        </div>
        <pagination
          v-show="total>page.limit"
          :total="total"
          :page.sync="page.page"
          :limit.sync="page.limit"
          layout="prev, pager, next"
          @pagination="getList"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import Card from './components/Card.vue'
import Banner from '@/components/Banner'
export default {
  name: 'Service',
  components: { Card, Banner, Pagination },
  data() {
    return {
      banner: require('img/service-banner.png'),
      total: 3,
      page: {
        page: 1,
        limit: 10
      },
      lists: [
        {
          id: 1,
          name: '拼多多app',
          company: '拼多多公司',
          desc: '多多国际是拼多多在致力于社交电商场景下打造海外品牌一站式服务平台，为更多中国消费者提供更为丰富的进口产品. 依托社交电商和多多国际消费人群，通过优化入驻流程，3天入驻，0元起步，同时结合国家政策生态构建多多国际供应链网络，提供更为灵活的跨境物流解决方案。在商家支持方面，提供多多国际商家培训、起步以及运营商家成长体系，快速对接商家与用户。相较于其他平台，更为开放，入驻方便快捷，加之新兴社交电商人群，以及投入产出比更高的社交电商玩法，在为海外大牌做好渠道下沉同时，也让海外中小品牌进入中国成为可能。',
          thumb: require('img/logo11.jpg')
        },
        {
          id: 2,
          name: '洋码头app',
          company: '合肥洋码头网络技术有限公司',
          desc: '洋码头成立于2010年，是中国独立海外购物平台的领军者。作为一站式海外购物平台，洋码头专注于连接全球零售市场与中国本土消费，致力于将世界各地优质丰富的商品以及潮流的生活方式和文化理念同步给中国消费者。通过海外买手商家实时直播的海外购物场景，以及跨境直邮快速、安全的运输，同时为消费者提供正品保障、假一赔十的服务，为消费者解决后顾之忧，让每一个中国消费者足不出户，即可安心享受海外原汁原味的正品和服务。',
          thumb: require('img/logo10.png')
        },
        {
          id: 3,
          name: '跨境综合服务',
          company: '合肥跨境通国际贸易有限公司',
          desc: '合肥跨境通国际贸易有限公司目前已经与1200余家全球各地的境外商户达成合作协议，主要经营食品洗护、母婴保健、鞋包服饰、电子家居等八大类进口商品。目前正积极打造一个涵盖新型电子商务、新型国际贸易、新型国际物流仓储、新型国际金融和新型智能社区的“五新”商业服务平台.跨境通以供应链服务为目标，以高效整合产业链为手段，以资源整合为基础，以综合物流服务为支撑，持续推进跨境电商零售进口、冰鲜冷链、外商独资机构、保税展示交易等多种跨境业务，全力打造跨境货物服务贸易综合性中心.跨境通作为中国跨境电子商务交易平台的先驱，将持续为客户提供商品口岸服务、展览、销售渠道的一站式解决方案。',
          thumb: require('img/logo20.png')
        }
      ],
      currentId: null
    }
  },
  methods: {
    onSelectTap(item) {
      // console.log(item)
      this.currentId = item.menuId
    },
    getList() {

    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/styles/variables';

.service-container {
  background-color: #f8f8f8;
  overflow: hidden;
  .container {
    margin-top: 40px;
    margin-bottom: 40px;
  }
  .card {
    margin-bottom: 20px;
  }
}
@media only screen and (max-width:1199px){
}
@media only screen and (max-width:991px){
}
@media only screen and (max-width:767px){
  .service-container {
    .card-hover {
      margin-bottom: 15px;
    }
  }
}
</style>
