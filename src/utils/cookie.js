import Cookies from 'js-cookie'
const KEY = 'vue_admin_template_token'

// 获取token
export const getCookies = () => {
  return Cookies.get(KEY)
}

// 设置token
export const setCookies = (value) => {
  return Cookies.set(KEY, value)
}

// 删除token
export const removeCookies = () => {
  return Cookies.remove(KEY)
}
