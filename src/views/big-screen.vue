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
  </VScaleScreen>
</template>

<script setup>
import * as echarts from 'echarts'
import { getInfoApi } from '@/api/park'
import { onMounted, ref } from 'vue'
import VScaleScreen from 'v-scale-screen'
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
    // console.log('base', base.value)
    // console.log('parkIncome', parkIncomeList.value)
    // console.log('parkIndustry', parkIndustryList.value)
  } catch (error) {
    console.log(error)
  }
}

// 柱状图
const initBarChart = () => {
  const chartDom = document.getElementById('barChart')
  const myChart = echarts.init(chartDom)
  const option = {
    textStyle: {
      color: '#B4C0CC'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: 0,
      top: 10,
      bottom: 20,
      right: 0,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: parkIncomeList.value.xMonth
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false
      }
    },
    series: [
      {
        data: parkIncomeList.value.yIncome.map((item, index) => {
          let color = ''
          if (index % 2 === 0) {
            color = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0.23, color: '#74c0f8' },
              { offset: 1, color: 'rgba(116,192,248,0.00)' }
            ])
          } else {
            color = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0.23, color: '#ff7152' },
              { offset: 1, color: 'rgba(255,113,82,0.00)' }
            ])
          }
          return {
            value: item,
            itemStyle: {
              color: color
            }
          }
        }),
        type: 'bar',
        barWidth: 10
      }
    ]
  }
  option && myChart.setOption(option)
}
// 饼图
const initPieChart = () => {
  const chartDom = document.getElementById('pieChart')
  const myChart = echarts.init(chartDom)
  const option = {
    color: ['#00B2FF', '#2CF2FF', '#892CFF', '#FF624D', '#FFCF54', '#86ECA2'],
    tooltip: {
      trigger: 'item',
      formatter: function (params) {
        return `${params.seriesName} <br/>${params.marker}  ${params.name} ${params.percent}%`
      }
    },
    legend: {
      top: 'bottom',
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        color: '#c6d1db'
      }
    },
    series: [
      {
        name: '园区产业分析',
        type: 'pie',
        radius: ['55%', '60%'],
        center: ['50%', '40%'],
        label: {
          show: false,
          position: 'center'
        },
        data: parkIndustryList.value
      }
    ]
  }
  option && myChart.setOption(option)
}
onMounted(async () => {
  await getInfo()
  initBarChart()
  initPieChart()
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
  position: absolute;
  top: 0;
  left: 0;
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
</style>
