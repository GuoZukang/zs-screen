<template>
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
              <span class="number">{{ baseList.buildingTotal }}</span>
            </div>
            <div class="title">楼宇总数</div>
            <div class="unity">(栋)</div>
          </div>
          <div class="item">
            <div class="icons-item enterprise-icon">
              <span class="number">{{ baseList.enterpriseTotal }}</span>
            </div>
            <div class="title">入驻企业总数</div>
            <div class="unity">(家)</div>
          </div>
          <div class="item">
            <div class="icons-item car-icon">
              <span class="number">{{ baseList.parkingTotal }}</span>
            </div>
            <div class="title">车位总数</div>
            <div class="unity">(个)</div>
          </div>
          <div class="item">
            <div class="icons-item rod-icon">
              <span class="number">{{ baseList.chargePoleTotal }}</span>
            </div>
            <div class="title">一体杆总数</div>
            <div class="unity">(个)</div>
          </div>
        </div>
      </div>
      <div class="section-two">
        <img class="img-header" src="@/assets/title2.png" alt="" />
        <div id="eee" style="width: 100%; height: 200px"></div>
      </div>
      <div class="section-three">
        <img class="img-header" src="@/assets/title3.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { getInfoApi } from '@/api/park'
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
const baseList = ref({})
const parkIncomeList = ref({})
const parkIndustryList = ref([])

const getInfo = async () => {
  try {
    const {
      data: { base, parkIncome, parkIndustry }
    } = await getInfoApi()
    baseList.value = base
    parkIncomeList.value = parkIncome
    parkIndustryList.value = parkIndustry
    // console.log('base', base)
    console.log('parkIncome', parkIncome)
    // console.log('parkIndustry', parkIndustry)
  } catch (error) {
    console.log(error)
  }
}
getInfo()
onMounted(() => {
  const chartDom = document.getElementById('eee')
  const myChart = echarts.init(chartDom)
  const option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
      }
    ]
  }
  option && myChart.setOption(option)
})
</script>

<style lang="scss" scoped>
.canvas {
  width: 100%;
  height: 100%;
  background-color: #141d2e;
}
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
  width: 25%;
  height: 100vh;
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
  position: absolute;
  top: 0;
  left: 0;
  .section-one,
  .section-two,
  .section-three {
    height: 16.875rem;
    .img-header {
      width: 100%;
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
      font-size: 10px;
      color: rgb(205, 215, 225);
    }
    .unity {
      margin-top: 0.5rem;
      font-size: 10px;
      color: rgb(205, 215, 225);
    }
    .icons-item {
      height: 5rem;
      position: relative;
      .number {
        font-size: 12px;
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
</style>
