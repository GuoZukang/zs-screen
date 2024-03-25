import { ref } from 'vue'
import { getInfoApi } from '@/api/park'
export const useParkInfo = () => {
  const parkInfo = ref({})
  const getInfo = async () => {
    try {
      const res = await getInfoApi()
      parkInfo.value = res.data
    } catch (error) {
      console.log(error)
    }
  }
  return {
    parkInfo,
    getInfo
  }
}
