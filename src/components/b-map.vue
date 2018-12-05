<template>
    <div id="all" v-show="isShow" :class="{hide: !isShow}">
      <div class="mask" v-if="isAlert"></div>
      <div :class="{ content: isAlert }">
        <div class="search-input" v-if="isAlert">
          <!-- <span style="margin-left: 50px;">查询地址：</span> -->
          <input type="text" ref="suggestId" placeholder="请输入地址" v-model="address_detail"
            style="border: 1px solid #dddee1; border-radius: 4px;height:34px; width: 300px;vertical-align:middle;"
          ><Button type="primary" @click="choose">确定</Button>
          <!-- 查询结果(经纬度)：<input type="text" disabled v-model="location" id="result" style="border: 1px solid #dddee1;border-radius: 4px;height:32px; width: 260px;" class="padding-left-20 padding-right-20"> -->
        </div>
        <div ref="allmap" :style="{height: `${height}px`, width:`${width}px`}"></div>
        <Icon type="close-round" @click="cancel" class="cancel" v-if="isAlert"></Icon>
      </div>
    </div>
</template>
<script>
export default {
  props: {
    isShow: {
      // 是否显示
      type: Boolean,
      default: true
    },
    isAlert: {
      // 是否弹出窗形式
      type: Boolean,
      default: true
    },
    width: {
      type: Number,
      default: 706
    },
    height: {
      type: Number,
      default: 400
    },
    initPoint: {
      type: Object
    }
  },
  data() {
    return {
      address_detail: '', // 详细地址
      userlocation: { lng: '', lat: '' },
      location: '',
      map: null, // map 地图对象
      ac: null, // autoComplete 对象
      localSearch: null
    }
  },
  mounted() {
    !this.isAlert && this.$nextTick(() => {
      this.initMap()
      this.initPoint && setTimeout(() => {
        this.setPlace(true)
      }, 500)
    })
  },
  methods: {
    initMap() {
      // 创建Map实例
      this.map = new BMap.Map(this.$refs.allmap)
      this.map.centerAndZoom(this.initPoint ? new BMap.Point(this.initPoint.lng, this.initPoint.lat) : '杭州', 12)

      if (this.isAlert) {
        this.map.enableScrollWheelZoom() // 启用滚轮放大缩小，默认禁用
        this.map.enableContinuousZoom() // 启用地图惯性拖拽，默认禁用
        this.map.addControl(new BMap.NavigationControl()) // 添加默认缩放平移控件
        this.map.addControl(new BMap.OverviewMapControl()) // 添加默认缩略地图控件
      }

      this.localSearch = new BMap.LocalSearch(this.map)
      this.localSearch.enableAutoViewport() // 允许自动调节窗体大小
    },
    initAutoComplete() {
      this.ac = new BMap.Autocomplete({
        // 建立一个自动完成的对象
        input: this.$refs.suggestId,
        location: this.map
      })
      this.ac.addEventListener('onconfirm', e => {
        // 鼠标点击下拉列表后的事件
        let _value = e.item.value
        this.address_detail =
          _value.province +
          _value.city +
          _value.district +
          _value.street +
          _value.business
        this.setPlace()
      })
    },
    setPlace(flag) {
      let vm = this
      this.map.clearOverlays() // 清除地图上所有覆盖

      // marker 头上的 信息
      let getInfoWindow = (point) => {
        let content =
          this.address_detail +
          '<br/>经度：' +
          point.lng +
          '<br/>纬度：' +
          point.lat
        return new BMap.InfoWindow(
          '<p style="font-size:14px;">' + content + '</p>'
        )
      }

      // 创建标注，为要查询的地方对应的经纬度
      let getMarker = (_point) => {
        let marker = new BMap.Marker(new BMap.Point(_point.lng, _point.lat))
        this.map.addOverlay(marker)
        marker.addEventListener('click', function() {
          this.openInfoWindow(getInfoWindow(this.getPosition()))
        })
        return marker
      }

      if (!flag) {
        this.localSearch.setSearchCompleteCallback(searchResult => {
          let poi = searchResult.getPoi(0)
          this.userlocation = { lng: poi.point.lng, lat: poi.point.lat }
          this.map.centerAndZoom(poi.point, 13)
          let marker = getMarker(poi.point)

          marker.addEventListener('dragend', function(e) {
            this.openInfoWindow(getInfoWindow(e.point))
            vm.userlocation = { lng: e.point.lng, lat: e.point.lat }
          })
          marker.enableDragging() // 开启拖拽
          marker.openInfoWindow(getInfoWindow(poi.point))
          // marker.setAnimation(BMAP_ANIMATION_BOUNCE) // 跳动的动画
        })
        this.localSearch.search(this.address_detail)
      } else {
        let curPoint = new BMap.Point(vm.initPoint.lng, vm.initPoint.lat)
        this.map.panTo(curPoint)
        getMarker(vm.initPoint).setPosition(curPoint)
      }
    },
    choose() {
      this.$emit('location', this.userlocation)
      this.$emit('update:isShow', false)
    },
    cancel() {
      this.$emit('update:isShow', false)
    }
  },
  watch: {
    isShow(value) {
      if (value) {
        this.$nextTick(() => {
          this.initMap() // 每次显示都 初始化地图，因为有时候从 display：none 切换出来会出 bug
          !this.ac && this.initAutoComplete()
          setTimeout(() => {
            this.initPoint && this.setPlace(true)
          }, 500)
        })
      } else {
        this.map = null
        this.ac && this.ac.dispose()
        this.ac = null
      }
    }
  }
}
</script>

<style lang="less" scoped>
#allmap {
  width: 300px;
  height: 200px;
  font-family: '微软雅黑';
  border: 1px solid #8e8e8e;
}
#all {
  .mask {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 999;
  }
  .content {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    z-index: 1001;
    .search-input {
      width: 360px;
      position: absolute;
      z-index: 1;
      top: 10px;
      left: 50%;
      transform: translateX(-50%);

      #suggestId {
        padding-left: 10px;
        outline: none;
      }
    }
    .cancel {
      position: absolute;
      right: 20px;
      top: -30px;
      color: white;
      font-size: 20px;
      cursor: pointer;
    }
  }
}
</style>

<style lang="less">
.tangram-suggestion table {
  cursor: default;
  width: 100%;
  font-size: 14px;
  z-index: 1002;
  position: relative;
  background: white;
}
</style>
