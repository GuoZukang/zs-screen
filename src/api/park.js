import service from '@/utils/request'

// 园区大屏-查询楼宇概况 收入和产业信息
export const getInfoApi = () => {
  return service({
    url: '/park/statistics/info',
    method: 'GET'
  })
}

// 获取点击的楼宇信息
export const getBuildingInfoApi = (id) => {
  return service({
    url: '/park/statistics/building?id=' + id,
    method: 'GET'
  })
}

// 获取点击的停车场信息
export const getAreaInfoApi = (id) => {
  return service({
    url: `/parking/area/${id}`,
    method: 'GET'
  })
}
