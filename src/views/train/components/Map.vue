<template>
  <el-dialog title="活动地址地图" :visible.sync="visible" center>
    <div id="map-container" />
  </el-dialog>
</template>

<script>
// import axios from 'axios'
export default {
  props: {
    address: {
      type: String,
      default: '',
      require: true
    }
  },
  // 定义属性
  data() {
    return {
      visible: false,
      Map: null,
      icon: require('img/address.png'),
      location: {}
    }
  },
  // 方法集合
  methods: {
    open() {
      this.visible = true
      this.$nextTick(() => {
        this.geocoder()
        this.initMap()
      })
    },
    close() {
      this.visible = false 
    },
    geocoder() {
      console.log(this.address)
      this.$jsonp('https://h5gw.map.qq.com/ws/place/v1/search', {
        key: 'MHRBZ-XRE6J-QDMF2-XRTXY-STLH3-AHFQT',
        keyword: this.address,
        boundary: 'region(全国, 0)',
        output: 'jsonp'
      }).then(res => {
        if (res.status === 0) {
          console.log(res)
          this.location = res.data[0].location
          this.initMap()
        }
      }).catch(err => {
        console.log(err)
      })
    },
    initMap() {
      const map = new qq.maps.Map(document.getElementById('map-container'), {
        center: new qq.maps.LatLng(this.location.lat, this.location.lng),
        zoom: 17,
        draggable: true,
        scrollwheel: true,
        disableDoubleClickZoom: false
      })
      new qq.maps.Marker({
        icon: this.icon,
        position: map.getCenter(),
        animation: qq.maps.MarkerAnimation.BOUNCE,
        map: map
      })
      map.panTo(new qq.maps.LatLng(this.location.lat, this.location.lng))
      console.log(map)
    }
  }
}
</script>

<style lang="scss" scoped>
#map-container {
  width: 100%;
  min-height: 200px;
  height: 50vh;
}
</style>
