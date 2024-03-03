<template>
  <div class="app-left">
    <div class="app-profile-box">
      <a-avatar shape="square" size="large" :src="userInfo?.avatar || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" />
      <div class="app-profile-box-name">
        {{userInfo.name}}
<!--        <button class="app-setting">-->
<!--          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="feather feather-settings" viewBox="0 0 24 24">-->
<!--            <defs/>-->
<!--            <circle cx="12" cy="12" r="3"/>-->
<!--            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>-->
<!--          </svg>-->
<!--        </button>-->
      </div>
<!--      <p class="app-profile-box-title">UI Designer</p>-->
      <div class="switch-status">
<!--        <input type="checkbox" name="switchStatus" id="switchStatus" checked>-->
<!--        <label class="label-toggle" for="switchStatus"></label>-->
<!--        <span class="toggle-text toggle-online">在线</span>-->
        <a-space direction="vertical">
          <a-switch v-model:checked="state.checked1" checked-children="在线" un-checked-children="下线" @click="enterIconLoading"/>
        </a-space>
      </div>
    </div>

    <div class="chat-list-wrapper">
<!--      <div class="chat-list-header">Active Conversations <span class="c-number"></span>-->
<!--        <svg class="list-header-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"  viewBox="0 0 24 24">-->
<!--          <defs/>-->
<!--          <path d="M18 15l-6-6-6 6"/>-->
<!--        </svg>-->
<!--      </div>-->
      <ul class="chat-list active" v-for="list in sessionList">
        <li class="chat-list-item active">
          <img :src="list.avatar" alt="chat">
          <span class="chat-list-name">{{list.name}}</span>
          <div style="width: 130px;">
            <p style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 0;">{{list.lastMsg}}</p>
          </div>

        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref, reactive, computed} from 'vue';
import { useChatStore } from '@/stores/chat'
import { useUserInfo } from '@/hooks/useCached'
import { MsgEnum, RoomTypeEnum } from '@/enums'
import { formatTimestamp } from '@/utils/computedTime'
import { IsAllUserEnum } from '@/services/types'
import renderReplyContent from '@/utils/renderReplyContent'
import {useUserStore} from "@/stores/user";
import {LoginStatus, useWsLoginStore} from '@/stores/ws'
import {message} from "ant-design-vue";
const state = reactive({
  checked1: true,
});

const userStore = useUserStore()
const chatStore = useChatStore()
const userInfo = computed(() => userStore.userInfo)
const initLoading = ref(true);
const loading = ref(false);
const data = ref([]);
const list = ref([]);
const sessionList = computed(() =>
    chatStore.sessionList.map((item) => {
      // 最后一条消息内容
      const lastMsg = Array.from(chatStore.messageMap.get(item.roomId)?.values() || [])?.slice(
          -1,
      )?.[0]
      let LastUserMsg = ' '
      if (lastMsg) {
        const lastMsgUserName = useUserInfo(lastMsg.fromUser.uid)
        LastUserMsg =
            lastMsg.message?.type === MsgEnum.RECALL
                ? `${lastMsgUserName.value.name}:'撤回了一条消息'`
                : renderReplyContent(
                    lastMsgUserName.value.name,
                    lastMsg.message?.type,
                    ' '+lastMsg.message?.body?.content || lastMsg.message?.body,
                )
      }
      return {
        ...item,
        tag: item.hot_Flag === IsAllUserEnum.Yes ? '官方' : '',
        lastMsg: LastUserMsg || item.text || '欢迎使用',
        lastMsgTime: formatTimestamp(item?.activeTime),
      }
    }),
)
//
// onMounted(() => {
//   initLoading.value = false;
//   data.value = sessionList.value;
//   list.value = sessionList.value;
// });

//是否登录
const loginStore = useWsLoginStore() // 显示登录框
// 获取用户详情
chatStore.getSessionList(true)
// console.log(chatMessageList)
if (!userStore.isSign) {
  // console.log("!userStore.isSign",!userStore.isSign)
  loginStore.showLogin = true
}

//注销登录
interface DelayLoading {
  delay: number;
}
const iconLoading = ref<boolean | DelayLoading>(false);
const enterIconLoading = () => {
  iconLoading.value = { delay: 1000 };
  setTimeout(() => {
    iconLoading.value = false;
    userStore.isSign = false
    userStore.userInfo = {}
    localStorage.removeItem('USER_INFO')
    localStorage.removeItem('TOKEN')
    loginStore.loginStatus = LoginStatus.Init
    message.success("注销成功！")
  }, 3000);
};
</script>

<style scoped>

.app-left {
  flex-basis: 320px;
  flex-shrink: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  max-width: 480px;
  margin-right: 24px;
  overflow-y: auto;
}
.app-left-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: var(--app-bg);
}
.app-left-header h1 {
  margin: 0;
  font-size: 20px;
  color: var(--text-dark);
  margin-left: 12px;
}
.app-logo svg {
  width: 40px;
  height: 40px;
}
.app-logo svg .path-1 {
  fill: var(--logo-path-1);
}
.app-logo svg .path-2 {
  fill: var(--logo-path-2);
}

.app-profile-box {
  border: 1px solid var(--box-border);
  background-color: var(--box-color);
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 16px;
  border-radius: 10px;
  margin-bottom: 24px;
}
.app-profile-box img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  -o-object-fit: cover;
  object-fit: cover;
}
.app-profile-box-name {
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
  color: var(--text-dark);
  margin: 4px 0;
  display: flex;
  align-items: center;
}
.app-profile-box-title {
  font-size: 12px;
  line-height: 16px;
  color: var(--text-light);
  margin: 0;
}

.switch-status {
  display: flex;
  align-items: center;
  margin-top: 12px;
}

.switch-status input {
  opacity: 0;
  position: absolute;
  width: 0;
  height: 0;
}
.switch-status input:checked + label {
  background-color: var(--toggle-bg);
}
.switch-status input:checked + label:before {
  left: 12px;
}
.switch-status input:checked ~ .toggle-offline {
  display: none;
}
.switch-status input:checked ~ .toggle-online {
  display: inline-block;
}

.toggle-text {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  color: var(--text-light);
}

.toggle-online {
  display: none;
}

.toggle-offline {
  display: inline-block;
}

.label-toggle {
  background-color: var(--toggle-bg-off);
  border-radius: 24px;
  width: 24px;
  height: 14px;
  display: inline-block;
  margin-right: 4px;
  position: relative;
  transition: 0.2s;
  cursor: pointer;
}
.label-toggle:before {
  content: "";
  position: absolute;
  width: 10px;
  height: 10px;
  left: 2px;
  top: 50%;
  transform: translatey(-50%);
  border-radius: 50%;
  background-color: var(--toggle-ball);
  transition: all 0.2s ease;
}

.toggle-text {
  font-size: 12px;
  line-height: 16px;
}

.app-setting {
  padding: 0;
  border: none;
  background-color: transparent;
  color: var(--text-dark);
  margin-left: 4px;
}

.chat-list {
  padding: 0;
  list-style: none;
  height: 0px;
  overflow: hidden;
  transition: 0.4s ease-in;
  display: none;
  opacity: 0;
}
.chat-list.active {
  display: block;
  height: auto;
  max-height: auto;
  opacity: 1;
}
.chat-list-item {
  transition: 0.2s;
  padding: 8px 14px;
  margin: 0;
  border-radius: 6px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  position: relative;
  cursor: pointer;
}
.chat-list-item.active {
  background-color: var(--box-color);
}
.chat-list-item.active span {
  color: var(--text-dark);
  font-weight: 700;
}
.chat-list-item img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  -o-object-fit: cover;
  object-fit: cover;
  margin-right: 8px;
}
.chat-list-item:hover {
  background-color: var(--box-color);
}
.chat-list-name {
  display: inline-block;
  font-size: 14px;
  line-height: 16px;
  font-weight: 500;
  color: var(--text-light);
}
.chat-list-header {
  font-weight: 700;
  line-height: 24px;
  font-size: 16px;
  color: var(--text-dark);
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 40px;
}
.chat-list-header .c-number {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--button-bg);
  color: #fff;
  font-weight: 500;
  font-size: 12px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin-left: 8px;
}

.list-header-arrow {
  margin-left: auto;
  transform: rotate(180deg);
  transition: 0.2s ease;
}
.chat-list-header.active .list-header-arrow {
  transform: rotate(0deg);
}
</style>