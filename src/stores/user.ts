import { ref } from 'vue'
import apis from '@/services/apis'
import { defineStore } from 'pinia'
import type { UserInfoType } from '@/services/types'

// 创建一个名为 useUserStore 的 Pinia store
export const useUserStore = defineStore('user', () => {
  // 使用 ref 创建响应式变量 userInfo，存储用户信息
  const userInfo = ref<Partial<UserInfoType>>({})

  // 使用 ref 创建响应式变量 isSign，表示用户是否已登录
  const isSign = ref(false)
  console.log("初始化isSign",isSign)
  // 本地存储中读取用户信息，若存在则初始化 userInfo
  let localUserInfo = {}
  try {
    localUserInfo = JSON.parse(localStorage.getItem('USER_INFO') || '{}')
  } catch (error) {
    localUserInfo = {}
  }

  // 如果 userInfo 为空且本地存储中有用户信息，则初始化 userInfo
  if (!Object.keys(userInfo.value).length && Object.keys(localUserInfo).length) {
    console.log(localUserInfo)
    userInfo.value = localUserInfo
  }

  // 定义获取用户详细信息的异步函数
  function getUserDetailAction() {
    // 使用 APIs 对象调用 getUserDetail 方法
    apis
        .getUserDetail()
        .send()
        .then((data) => {
          // 将获取到的用户信息合并到当前的 userInfo
          userInfo.value = { ...userInfo.value, ...data }
        })
        .catch(() => {
          // 如果请求失败，删除本地存储中的 TOKEN 和 USER_INFO
          localStorage.removeItem('TOKEN')
          localStorage.removeItem('USER_INFO')
        })
  }

  // 返回 store 中的数据和方法
  return { userInfo, isSign, getUserDetailAction }
})
