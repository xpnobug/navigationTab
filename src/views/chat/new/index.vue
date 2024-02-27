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
          <a-layout-content :style="contentStyle" class="gdt" id="scrollableElement" ref="virtualListRef" @totop="onToTop"  @scroll="onScroll">
            <div v-if="chatMessageList?.length !== 0">
              <!--            <div style="text-align: center">-->
              <!--              <a-space :size="[0, 'small']" wrap style="top: 10px; margin: 10px">-->
              <!--                <a-tag :bordered="false">new Data</a-tag>-->
              <!--              </a-space>-->
              <!--            </div>-->
              <!--            <div>-->
              <!--              <MessageInfo />-->
              <!--            </div>-->
              <MessageInfoMe />
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
import {computed, reactive, ref, watchEffect} from 'vue'
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
import type { MessageType, MsgType, CacheUserItem} from '@/services/types'
import QqLogin from "@/views/chat/components/QqLogin.vue";
import throttle from 'lodash/throttle'
import { pageSize, useChatStore } from '@/stores/chat'
import { useElementVisibility } from '@vueuse/core'
import eventBus from '@/utils/eventBus'
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

const userStore = useUserStore()
const chatStore = useChatStore()
const userInfo = computed(() => userStore.userInfo)
const chatMessageList = computed(() => chatStore.chatMessageList)
const messageOptions = computed(() => chatStore.currentMessageOptions)
const currentNewMsgCount = computed(() => chatStore.currentNewMsgCount)
// 回到底部
const virtualListRef = ref()
// 提供虚拟列表 ref 给子组件使用
provide('virtualListRef', virtualListRef)

// 数据加载成功后调用 scrollToBottom 方法
const scrollContainer = ref();
const msgVisibleEl = ref(null)

onMounted(() => {
  // 获取需要检查滚动位置的元素，假设这个元素的id为 "scrollableElement"
  scrollContainer.value = document.getElementById("scrollableElement");
  if (chatMessageList.value.length != 0){
    console.log('chatMessageList.value',chatMessageList.value.length)
    scrollContainer.value.scrollTop = calculateBottomPosition();
  }
  nextTick(() => {
    chatStore.chatListToBottomAction = () => {
      goToBottom()
    }
  })
})
// 到顶部时触发函数 记录旧的滚动高度，加载更多消息后滚动回加载时那条消息的位置
const onToTop = async () => {
  if (messageOptions.value?.isLoading) return
  const oldIndex = virtualListRef.value.getSizes()
  await chatStore.loadMore()
  virtualListRef.value.scrollToIndex(virtualListRef.value.getSizes() - oldIndex)
}

// 滚动到消息
const scrollToMsg = async (msg: MsgType) => {
  const { id } = msg
  const { reply } = msg.body
  // 不允许跳转不跳转，目前是 100 条(后端配置)以内允许跳转
  if (!reply || !reply.canCallback) return
  // 如果消息已经加载过了，就直接跳转
  const index = chatStore.getMsgIndex(reply.id)
  if (index > -1) {
    virtualListRef?.value?.scrollToIndex(index, true, 12)
  } else {
    // 如果没有加载过，就先加载，然后跳转
    const curMsgIndex = chatStore.getMsgIndex(id)
    // +1 是在 reply.gapCount - curMsgIndex 刚好是 pageSize 倍数的时候，跳转到的是第一条消息，会触发加载更多，样式会乱掉
    const needLoadPageSize = Math.ceil((reply.gapCount - curMsgIndex + 1) / pageSize) * pageSize
    // 加载数据
    await chatStore.loadMore(needLoadPageSize)
    // 跳转
    // FIXME 这时候新加载消息了，所以会有滚动冲突，故不加动画效果，否则会很怪异。
    setTimeout(virtualListRef?.value?.scrollToIndex(chatStore.getMsgIndex(reply.id), false, 12), 0)
    // TODO 跳转到的消息 高亮一下
  }
}

// 滚动时触发函数，主要处理新消息提示
// 创建节流函数
const onScroll = throttle(() => {
  // chatStore.getMsgList(20)
  // 获取元素的滚动位置
  const scrollPosition = scrollContainer.value.scrollTop;
  // console.log(scrollPosition)
  // 获取元素的滚动容器高度
  const containerHeight = scrollContainer.value.clientHeight;
  // 获取元素的滚动内容高度
  const contentHeight = scrollContainer.value.scrollHeight;
  // 计算滚动位置与滚动容器高度的差值
  const scrollDifference = contentHeight - containerHeight - scrollPosition;
  // 判断是否已滚动到底部最后一个可视范围内
  const isScrollEnd = scrollDifference <= 0;
  if (isScrollEnd) {
    currentNewMsgCount.value && (currentNewMsgCount.value.isStart = false)
    chatStore.clearNewMsgCount()
  } else {
    currentNewMsgCount.value && (currentNewMsgCount.value.isStart = true)
  }
}, 100);
// 将滚动事件处理器绑定到window的scroll事件上
// window.addEventListener('scroll', onScroll);
// 计算滚动容器的最底部位置
const calculateBottomPosition = () => {
  // 获取元素的滚动容器高度
  const containerHeight = scrollContainer.value.clientHeight;
  // 获取元素的滚动内容高度
  const contentHeight = scrollContainer.value.scrollHeight;
  // 计算滚动容器的最底部位置
  const bottomPosition = contentHeight - containerHeight;
  // 返回最底部位置
  return bottomPosition;
};

// 回到底部
const goToBottom = async () => {
  if (virtualListRef.value) {
    // 获取滚动容器的最底部位置
    scrollContainer.value.scrollTop = calculateBottomPosition()
    chatStore.clearNewMsgCount()
  }
}

// 回到最新消息
const goToNewMessage = () => {
  // 未读消息数 = 总数 - 新消息数
  virtualListRef.value.scrollToIndex(
      chatMessageList.value.length - (currentNewMsgCount.value?.count || 0),
  )
  chatStore.clearNewMsgCount()
}

// 提供虚拟列表 ref 给子组件使用
provide('virtualListRef', virtualListRef)


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