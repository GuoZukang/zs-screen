<template>
  <VScaleScreen width="1920" height="1080">
    <div class="canvas">
      <div class="header">
        <img class="logo" src="@/assets/park-logo.png" alt="" />
        <div>
          <img class="btn" src="@/assets/btnOne.png" alt="" />
          <img class="btn" src="@/assets/btnTwo.png" alt="" />
        </div>
      </div>
      <div class="all-charts" style="color: #fff">
        <div class="section-one">
          <img class="img-header" src="@/assets/title1.png" alt="" />
          <div class="icons-container">
            <div class="item">
              <div class="icons-item building-icon">
                <span class="number">{{ parkInfo.base?.buildingTotal }}</span>
              </div>
              <div class="title">楼宇总数</div>
              <div class="unity">(栋)</div>
            </div>
            <div class="item">
              <div class="icons-item enterprise-icon">
                <span class="number">{{ parkInfo.base?.enterpriseTotal }}</span>
              </div>
              <div class="title">入驻企业总数</div>
              <div class="unity">(家)</div>
            </div>
            <div class="item">
              <div class="icons-item car-icon">
                <span class="number">{{ parkInfo.base?.parkingTotal }}</span>
              </div>
              <div class="title">车位总数</div>
              <div class="unity">(个)</div>
            </div>
            <div class="item">
              <div class="icons-item rod-icon">
                <span class="number">{{ parkInfo.base?.chargePoleTotal }}</span>
              </div>
              <div class="title">一体杆总数</div>
              <div class="unity">(个)</div>
            </div>
          </div>
        </div>
        <div class="section-two">
          <img class="img-header" src="@/assets/title2.png" alt="" />
          <div class="bar-chart-title">
            <span>单位：元</span>
            <div>
              <span class="bar-icon blue-bar-icon"></span>
              <span class="bar-icon red-bar-icon"></span>
              收入情况
            </div>
          </div>
          <div id="barChart" class="bar-chart"></div>
        </div>
        <div class="section-three">
          <img class="img-header" src="@/assets/title3.png" alt="" />
          <div id="pieChart" class="pie-chart"></div>
        </div>
      </div>
    </div>
    <div class="model-container">
      <!-- 进度条 -->
      <LoadingComponent :loading="showLoading" />
      <!-- 准备3D渲染节点 -->
      <canvas class="canvas-3d" ref="ref3d"></canvas>
      <div
        v-if="modelStatus"
        id="t"
        :class="{ animate__zoomIn: modelStatus }"
        :style="{ left: x + 'px', top: y + 'px' }"
        class="tip animate__animated"
      >
        <span class="close" @mousedown.stop="close"></span>
        <div class="header">
          {{ buildingInfo.name || buildingInfo.areaName }}
        </div>
      </div>
    </div>
  </VScaleScreen>
</template>

<script setup>
// 导入loading组件
import LoadingComponent from '@/components/LoadingComponent.vue'
import { onMounted, ref, computed } from 'vue'
import { getBuildingInfoApi, getAreaInfoApi } from '@/api/park'
import VScaleScreen from 'v-scale-screen'
import { useParkInfo, useInitBarChart, useInitPieChart } from './composables'
// 导入模型解析构造函数
import { Application } from '@splinetool/runtime'
const { parkInfo, getInfo } = useParkInfo()
const { initBarChart } = useInitBarChart(parkInfo)
const { initPieChart } = useInitPieChart(parkInfo)
const ref3d = ref(null)
const showLoading = ref(false)
const showModel = ref(false)
const x = ref()
const y = ref()
const buildingInfo = ref({})
const areaInfo = ref({})
const init3dModel = () => {
  // 开启loading
  showLoading.value = true
  let spline = new Application(ref3d.value)
  spline.load('https://fe-hmzs.itheima.net/scene.splinecode').then(() => {
    showLoading.value = false
    spline.addEventListener('mouseDown', (e) => {
      x.value = ''
      y.value = ''
      const params = e.target
      if (params.name.indexOf('办公楼') !== -1) {
        getBuildingInfo(params.id)
        window.addEventListener('mousedown', (e) => {
          x.value = e.offsetX
          y.value = e.offsetY
        })
      } else if (params.name.indexOf('停车场') !== -1) {
        getAreaInfo(params.id)
        window.addEventListener('mousedown', (e) => {
          x.value = e.offsetX
          y.value = e.offsetY
        })
      }
      showModel.value = true
    })
  })
}

const getBuildingInfo = async (id) => {
  try {
    const res = await getBuildingInfoApi(id)
    buildingInfo.value = res.data
    console.log(res.data)
  } catch (e) {
    console.log(e)
  }
}

const getAreaInfo = async (id) => {
  try {
    const res = await getAreaInfoApi(id)
    buildingInfo.value = res.data
    console.log(res.data)
  } catch (e) {
    console.log(e)
  }
}
onMounted(async () => {
  await getInfo()
  initBarChart()
  initPieChart()
  init3dModel()
})
const modelStatus = computed(() => {
  if (x.value && y.value) {
    return true
  } else {
    return false
  }
})

const close = () => {
  x.value = ''
  y.value = ''

  console.log(x.value, y.value)
}
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 3.125rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  margin-bottom: 1.875rem;
  z-index: 10;
  .logo {
    width: 25%;
  }
  .btn {
    width: 6rem;
    margin-right: 1.5rem;
    cursor: pointer;
  }
}
.all-charts {
  position: absolute;
  top: 0;
  left: 0;
  width: 30rem;
  height: 100%;
  padding: 5.5rem 1.25rem 0;
  display: flex;
  flex-direction: column;
  background: linear-gradient(
    270deg,
    rgba(0, 6, 15, 0) 0,
    rgba(0, 6, 15, 0) 20%,
    rgba(0, 0, 0, 0.4) 30%,
    rgba(0, 0, 0, 0.6) 40%,
    #01040b 70%,
    #04070d
  );
  .section-one,
  .section-two,
  .section-three {
    height: 19rem;
    .img-header {
      height: 1.875rem;
    }
  }
  .section-two {
    .bar-chart {
      width: 440px;
      height: 240px;
      user-select: none;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      padding: 0px;
      margin: 0px;
      border-width: 0px;
    }
    .bar-chart-title {
      display: flex;
      margin-top: 1.25rem;
      justify-content: space-between;
      font-size: 0.875rem;
      color: #c6d1db;

      .bar-icon {
        width: 0.75rem;
        height: 0.25rem;
        background: red;
        display: inline-block;
      }

      .blue-bar-icon {
        background: linear-gradient(90deg, #74c0f8, rgba(116, 192, 248, 0));
      }

      .red-bar-icon {
        background: linear-gradient(90deg, #ff7152, rgba(255, 113, 82, 0));
      }
    }
  }
  .section-three {
    .pie-chart {
      height: 100%;
    }
  }
}
.icons-container {
  display: flex;
  justify-content: space-between;
  padding: 1.25rem 0px;
  .item {
    text-align: center;
    display: flex;
    flex-direction: column;
    flex: 1 1 0%;
    .title {
      height: 1.875rem;
      margin-top: 0.5rem;
      font-size: 0.875rem;
      color: #cdd7e1;
    }
    .unity {
      margin-top: 0.5rem;
      font-size: 0.875rem;
      color: #cdd7e1;
    }
    .icons-item {
      height: 5rem;
      position: relative;
      .number {
        font-size: 1.125rem;
      }
    }
    .building-icon {
      background: url('@/assets/building-icon.png') 50% 0px / contain no-repeat;
    }
    .enterprise-icon {
      background: url('@/assets/enterprise-icon.png') 50% 0px / contain no-repeat;
    }
    .car-icon {
      background: url('@/assets/car-icon.png') 50% 0px / contain no-repeat;
    }
    .rod-icon {
      background: url('@/assets/rod-icon.png') 50% 0px / contain no-repeat;
    }
  }
}
.model-container {
  width: 100%;
  height: 100%;
  background-color: black;
  flex-shrink: 0;
  .tip {
    width: 281px;
    height: 140px;
    background: url('@/assets/modal-bg.png') no-repeat;
    background-size: cover;
    color: #fff;
    position: absolute;

    .close {
      position: absolute;
      right: 10px;
      top: 10px;
      width: 20px;
      height: 20px;
      background: url('@/assets/modal-close.png') no-repeat;
      background-size: cover;
      cursor: pointer;
    }
    .header {
      position: absolute;
    }
  }
}
</style>
