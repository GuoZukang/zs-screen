import * as echarts from 'echarts'
export const useInitPieChart = (parkInfo) => {
  // 饼图
  const initPieChart = () => {
    const { parkIndustry } = parkInfo.value
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
          data: parkIndustry
        }
      ]
    }
    option && myChart.setOption(option)
  }
  return {
    initPieChart
  }
}
