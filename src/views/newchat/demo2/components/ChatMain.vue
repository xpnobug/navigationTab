<template>
  <div class="app-main">
    <div class="chat-list-name" style="margin-bottom: 10px; border-bottom: 1px solid var(--border-light);">聊天讨论组</div>
    <div class="chat-wrapper" @scroll="onScroll" id="scrollableElement" ref="virtualListRef">
      <div v-if="chatMessageList?.length !== 0" v-for="i in chatMessageList">
        <div style="text-align: center" v-if="i.timeBlock">
          <a-space :size="[0, 'small']" wrap style="top: 10px; margin: 10px">
            <a-tag class="chat-list-name" :bordered="false">{{ i.timeBlock }}</a-tag>
          </a-space>
        </div>
        <div class="message-wrapper" :class="[{ 'reverse': isCurrentUser(i.fromUser.uid) }]">
          <div class="profile-picture">
            <img :src="i.fromUser.avatar" :alt="i.fromUser.name">
          </div>
          <div class="message-content">
            <p class="name">{{ i.fromUser.name }}</p>
            <div class="message">{{ i.message.body.content }}</div>
          </div>
        </div>
<!--        <div class="message-wrapper"  :class="[{ 'reverse': isCurrentUser(i.fromUser.uid) }]">-->
<!--          <img class="message-pp" :src="i.fromUser.avatar" :alt="i.fromUser.name" />-->
<!--          <div class="message-box-wrapper">-->
<!--            <div class="message-box">-->
<!--              {{ i.message.body.content }}-->
<!--            </div>-->
<!--&lt;!&ndash;            <span>9h ago</span>&ndash;&gt;-->
<!--          </div>-->
<!--        </div>-->
      </div>
      <EmptyInfo v-else></EmptyInfo>
    </div>
    <SendMessage v-if="userStore.isSign === true"/>
    <div style="text-align: center;margin: 10px" v-else>
      <p>登录方式</p>
      <div style="display: flex; justify-content: center;">
        <login-qrcode/>
        <QqLogin/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import EmptyInfo from "@/views/chat/components/EmptyInfo.vue";
import {computed, ref} from "vue";
import {useChatStore} from "@/stores/chat";
import {useUserStore} from "@/stores/user";
import LoginQrcode from "@/views/chat/components/LoginQrcode.vue";
import QqLogin from "@/views/chat/components/QqLogin.vue";
import SendMessage from "@/views/newchat/demo2/components/SendMessage.vue";
import throttle from "lodash/throttle";

const chatStore = useChatStore()
const userStore = useUserStore()
const chatMessageList = computed(() => chatStore.chatMessageList)

// 创建 isCurrentUser 计算属性
const userInfo = computed(() => userStore.userInfo)

const isCurrentUser = (uid) => {
  return uid == userInfo.value.uid
}
const currentNewMsgCount = computed(() => chatStore.currentNewMsgCount)

// 数据加载成功后调用 scrollToBottom 方法
const scrollContainer = ref();
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
onMounted(() => {
  // 获取需要检查滚动位置的元素，假设这个元素的id为 "scrollableElement"
  scrollContainer.value = document.getElementById("scrollableElement");
  if (chatMessageList.value.length != 0){
    // console.log('chatMessageList.value',chatMessageList.value.length)
    scrollContainer.value.scrollTop = calculateBottomPosition();
  }
  nextTick(() => {
    chatStore.chatListToBottomAction = () => {
      goToBottom()
    }
  })
})
// 回到底部
const goToBottom = async () => {
// 获取滚动容器的最底部位置
  scrollContainer.value.scrollTop = calculateBottomPosition()
  chatStore.clearNewMsgCount()
}

</script>

<style scoped>

::-webkit-scrollbar {
  display: none;
  width: 8px;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: var(--scrollbar-thumb);
}
.app-main {
  flex: 3;
  height: 100%;
  background-color: var(--box-color);
  border-radius: 10px;
  padding: 16px;
  padding-top: 0;
  display: flex;
  flex-direction: column;
  transition: 0.2s;
}
.app-main-header {
  position: sticky;
  top: 0;
  background-color: var(--box-color);
  border: 1px solid var(--box-border);
}

.chat-wrapper {
  overflow: auto;
}


/*.message-wrapper {*/
/*  word-break: break-all;!*允许单词内换行即可实现自动换行*!*/
/*  display: flex;*/
/*  align-items: flex-start;*/
/*  padding-bottom: 20px;*/
/*}*/
/*.message-wrapper.reverse {*/
/*  justify-content: flex-end;*/
/*}*/
/*.message-wrapper.reverse .message-box {*/
/*  background-color: var(--message-box-2);*/
/*  color: #fff;*/
/*}*/
/*.message-wrapper.reverse .message-box-wrapper {*/
/*  display: flex;*/
/*  flex-direction: column;*/
/*  align-items: flex-end;*/
/*}*/
/*.message-wrapper.reverse .message-pp {*/
/*  order: 2;*/
/*}*/

.profile-picture {
  border-radius: 8px;
  width: 32px;
  height: 32px;
  overflow: hidden;
  margin-right: 12px;
  flex-shrink: 0;
}
.profile-picture img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.message-wrapper {
  display: flex;
  word-break: break-all;
}

.name {
  margin: 0;
  line-height: 16px;
  font-size: 12px;
  font-weight: 700;
  color: var(--message-text);
}

.message {
  margin-top: 8px;
  background-color: var(--message-bg);
  padding: 8px 16px;
  border-radius: 0 12px 12px 12px;
  font-size: 12px;
  line-height: 16px;
  /*max-width: calc(100% - 32px);*/
  color: var(--message-text);
}

.message-wrapper {
  padding: 16px 0;
}
.message-wrapper.reverse {
  flex-direction: row-reverse;
}
.message-wrapper.reverse .message {
  background-color: var(--message-bg-2);
  color: #fff;
  margin-left: auto;
  border-radius: 16px 0px 16px 16px;
}
.message-wrapper.reverse .profile-picture {
  margin-right: 0px;
  margin-left: 12px;
}
.message-wrapper.reverse .name {
  text-align: right;
}


.message-pp {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  -o-object-fit: cover;
  object-fit: cover;
  flex-shrink: 0;
}

.message-box {
  background-color: var(--message-box-1);
  box-shadow: var(--box-shadow);
  border-radius: 4px;
  padding: 10px;
  font-size: 12px;
  line-height: 16px;
  width: auto;
  /*max-width: 80%;*/
  color: var(--text-dark);
}
.message-box-wrapper {
  margin: 0 12px;
}
.message-box-wrapper span {
  font-size: 10px;
  line-height: 16px;
  color: var(--text-light);
  opacity: 0.6;
}
.chat-list-name {
  display: inline-block;
  font-size: 14px;
  line-height: 16px;
  font-weight: 500;
  color: var(--text-light);
}
</style>