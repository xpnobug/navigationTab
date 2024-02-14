<template>
  <a-space direction="vertical" :style="{ width: '100%' }" :size="[0, 48]">
    <a-layout>
      <div class="userInfo-isShow" style="background-color: #2e2e2e">
        <div style="display: flex; flex-direction: column; align-items: center; margin-top: 10px; width: 70px;">
          <div style="display: flex; flex-direction: column; align-items: center;" >
            <a-space wrap :size="16" style="margin-bottom: 10px">
              <a-avatar shape="square" size="large" :src="userInfo?.avatar || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" />
            </a-space>
            <a-space :size="[0, 'small']" wrap>
              <a-tag :bordered="false" color="success" style="margin-right: 0;">{{userInfo.name}}</a-tag>
            </a-space>
            <a-space style="margin-top: 10px" v-if="userInfo.name != null">
              <a-button danger type="text" :loading="iconLoading" @click="enterIconLoading">退出</a-button>
            </a-space>
          </div>
        </div>
      </div>
<!--      用户列表-->
      <div class="isShow">
        <a-layout-sider>
          <UserListChat/>
        </a-layout-sider>
      </div>
      <a-layout>
        <a-layout-header :style="headerStyle" class="header">聊天群</a-layout-header>
        <div>
          <a-layout-content :style="contentStyle" class="gdt">
            <div v-if="chatMessageList?.length !== 0">
              <!--            <div style="text-align: center">-->
              <!--              <a-space :size="[0, 'small']" wrap style="top: 10px; margin: 10px">-->
              <!--                <a-tag :bordered="false">new Data</a-tag>-->
              <!--              </a-space>-->
              <!--            </div>-->
              <!--            <div>-->
              <!--              <MessageInfo />-->
              <!--            </div>-->
              <div>
                <MessageInfoMe />
              </div>
            </div>
            <EmptyInfo v-else></EmptyInfo>
          </a-layout-content>
        </div>
        <a-layout-footer :style="footerStyle" >
          <SendMessage v-if="userStore.isSign === true"/>
          <div style="text-align: center;margin: 10px" v-else>
            <p>登录方式</p>
            <div style="display: flex; justify-content: center;">
              <login-qrcode/>
              <QqLogin />
            </div>
          </div>

        </a-layout-footer>
      </a-layout>
    </a-layout>
  </a-space>
</template>
<script lang="ts" setup>
import type { CSSProperties } from 'vue';
import { computed, reactive, watchEffect } from 'vue'
import {LoginStatus, useWsLoginStore} from '@/stores/ws'
import UserListChat from "@/views/chat/components/UserListChat.vue";
import SendMessage from "@/views/chat/components/SendMessage.vue";
import MessageInfo from "@/views/chat/components/MessageInfo.vue";
import MessageInfoMe from "@/views/chat/components/MessageInfoMe.vue";
import LoginQrcode from "@/views/chat/components/LoginQrcode.vue";
import {message} from 'ant-design-vue';
import { Empty } from 'ant-design-vue';
import { useUserStore } from '@/stores/user'
import EmptyInfo from "@/views/chat/components/EmptyInfo.vue";
import {useChatStore} from "@/stores/chat";
import type { MessageType, MsgType, CacheUserItem} from '@/services/types'
import QqLogin from "@/views/chat/components/QqLogin.vue";
const headerStyle: CSSProperties = {
  height: '72px',
  // paddingInline: '90px',
  lineHeight: '75px',
  backgroundColor: '245, 245, 245',
};

const contentStyle: CSSProperties = {
  height: '440px',
  // lineHeight: '500px',
  padding: '0px 110px',
  overflowY: "scroll",
  backgroundColor: '245, 245, 245'
};

const siderStyle: CSSProperties = {
  // textAlign: 'center',
  lineHeight: '120px',
  backgroundColor: '#e5e4e4',
  minWidth: '300px'
};

const footerStyle: CSSProperties = {
  borderTopStyle: "solid",
  borderTopColor: "#f1f1f1",
  backgroundColor: '245, 245, 245',
  padding:'15px 20px'
};
const handleScroll = (direction: string, e: Event) => {
  console.log('direction:', direction);
  console.log('target:', e.target);
};

//是否登录
// const isLogin = ref(false);
const loginStore = useWsLoginStore() // 显示登录框


const userStore = useUserStore()
const chatStore = useChatStore()
const userInfo = computed(() => userStore.userInfo)
const chatMessageList = computed(() => chatStore.chatMessageList)
// 获取用户详情
chatStore.getSessionList(true)
console.log(chatMessageList)
if (!userStore.isSign) {
  console.log("!userStore.isSign",!userStore.isSign)
  loginStore.showLogin = true
}


//注销登录
interface DelayLoading {
  delay: number;
}
const loading = ref<boolean>(false);
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
.header{
  border-bottom-style: solid;
  border-bottom-color: #f1f1f1;
  background-color: rgba(245, 245, 245);
}
.gdt::-webkit-scrollbar {
  width: 5px;
}
/* 修改滚动条颜色 */
.gdt::-webkit-scrollbar-thumb {
  width: 10px;
  background-color: rgba(232, 227, 227, 0.7);
  border-radius: 20px;
}

:deep(.ant-layout .ant-layout-sider){
  min-width: 300px !important;
  background-color: #e5e4e4;
}
@media (max-width: 768px) {
  :deep(.ant-layout .ant-layout-content){
    padding: 0 25px!important;
  }
  .userInfo-isShow{
    display: none;
  }
  .isShow{
    display: none;
  }
}

</style>