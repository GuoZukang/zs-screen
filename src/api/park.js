import service from '@/utils/request'

export const getInfoApi = () => {
  return service({
    url: '/park/statistics/info',
    method: 'GET'
  })
}
