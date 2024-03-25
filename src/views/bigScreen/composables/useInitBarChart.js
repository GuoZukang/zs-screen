import * as echarts from 'echarts'
export const useInitBarChart = (parkInfo) => {
  // 柱状图
  const initBarChart = () => {
    const { parkIncome } = parkInfo.value
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
        data: parkIncome.xMonth
      },
      yAxis: {
        type: 'value',
        splitLine: {
          show: false
        }
      },
      series: [
        {
          data: parkIncome.yIncome.map((item, index) => {
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
  return {
    initBarChart
  }
}
