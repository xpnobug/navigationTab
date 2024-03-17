<template>
  <div class="chat-input-wrapper">
    <button class="chat-attachment-btn">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="feather feather-paperclip" viewBox="0 0 24 24">
        <defs/>
        <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/>
      </svg>
    </button>
    <div class="input-wrapper">
      <input type="text" class="chat-input" v-model="inputMsg" :placeholder="isSign ? (isSending ? '消息发送中' : '来聊点什么吧~') : ''">
      <button class="emoji-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="feather feather-smile" viewBox="0 0 24 24">
          <defs/>
          <circle cx="12" cy="12" r="10"/>
          <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/>
        </svg>
      </button>
    </div>
    <button class="chat-send-btn" :class="['action', { 'is-edit': inputMsg.length, 'disabled': !inputMsg.length }]"
            :tabindex="!isSign || isSending"
            :disabled="!isSign || isSending"
            @click="sendMsgHandler">Send</button>
  </div>
<!--  <a-mentions rows="4" v-model:value="inputMsg"-->
<!--              autofocus-->
<!--              status="none"-->
<!--              :options="options"-->
<!--              @select="onSelect"-->
<!--              style="border: none;outline: none;"></a-mentions>-->
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue';
import { MsgEnum } from '@/enums'
import apis from '@/services/apis'
import { useGlobalStore } from '@/stores/global'
import { useChatStore } from '@/stores/chat'
import { useUserStore } from '@/stores/user'
import type { IMention } from '../../types'
import { message } from 'ant-design-vue';

const value = ref<string>('');
const inputMsg = ref('')
const isSending = ref(false)
const mentionList = ref<IMention[]>([])
const globalStore = useGlobalStore()
const chatStore = useChatStore()
const tempMessageId = ref(0)
const userStore = useUserStore()
// const currentReplUid = computed(() => currentMsgReply?.value.fromUser?.uid as number)
// const currentReplyUser = useUserInfo(currentReplUid)
// 置空回复的消息
const onClearReply = () => (chatStore.currentMsgReply = {})
const currentMsgReply = computed(() => (userStore.isSign && chatStore.currentMsgReply) || {})
const isSign = computed(() => userStore.isSign)

// 计算展示的回复消息的内容
// const showReplyContent = () => {
//   const name = currentReplyUser?.value.name
//   const type = currentMsgReply?.value.message?.type
//   return renderReplyContent(name, type, currentMsgReply?.value.message?.body?.content)
// }

// 发送消息
const send = (msgType: MsgEnum, body: any) => {
  apis
      .sendMsg({ roomId: globalStore.currentSession.roomId, msgType, body })
      .send()
      .then((res) => {
        // console.log("发送的信息",body)
        if (res.message.type === MsgEnum.TEXT) {
          chatStore.pushMsg(res) // 消息列表新增一条消息
          chatStore.chatListToBottomAction?.() // 滚动到消息列表底部
        } else {
          // 更新上传状态下的消息
          chatStore.updateMsg(tempMessageId.value, res)
        }
        inputMsg.value = '' // 清空输入列表
        onClearReply() // 置空回复的消息

        // 发完消息就要刷新会话列表，
        //  FIXME 如果当前会话已经置顶了，可以不用刷新
        chatStore.updateSessionLastActiveTime(globalStore.currentSession.roomId)
      })
      .finally(() => {
        isSending.value = false
        // focusMsgInput() // 输入框重新获取焦点
        chatStore.chatListToBottomAction?.() // 滚动到消息列表底部
      })
}


const sendMsgHandler = () => {
  // 空消息或正在发送时禁止发送
  if (!inputMsg.value?.trim().length || isSending.value) {
    message.warn("空消息或正在发送时禁止发送")
    return
  }

  isSending.value = true
  send(MsgEnum.TEXT, {
    content: inputMsg.value,
    replyMsgId: currentMsgReply.value.message?.id,
    atUidList: mentionList.value.map((item) => item.uid),
  })
}

watch(value, () => {
  // console.log('value', value);
});
const onSelect = (option: { value: string }) => {
  // console.log('select', option);
};

const options = [
  {
    value: 'afc163',
    label: 'afc163',
  },
  {
    value: 'zombieJ',
    label: 'zombieJ',
  },
  {
    value: 'yesmeck',
    label: 'yesmeck',
  },
];
</script>


<style scoped>
.chat-input {
  border: none;
  outline: none;
  height: 32px;
  flex: 1;
  margin-right: 4px;
  background-color: var(--chat-input);
  color: var(--text-dark);
}
.chat-input:placeholder {
  color: var(--text-light);
  font-size: 12px;
}
.chat-input-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: var(--box-shadow);
  margin-top: auto;
  border-radius: 6px;
  padding: 12px;
  background-color: var(--chat-input);
}

.input-wrapper {
  border: 1px solid var(--border-light);
  border-radius: 4px;
  font-size: 12px;
  display: flex;
  flex: 1;
  overflow: hidden;
  padding: 0 6px 0 12px;
  justify-content: space-between;
  margin: 0 8px;
  background-color: var(--chat-input);
}

.emoji-btn {
  border: none;
  background-color: transparent;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 4px;
  color: #ffca3e;
}

.chat-send-btn {
  height: 32px;
  color: #fff;
  background-color: var(--button-bg);
  border: none;
  border-radius: 4px;
  padding: 0 32px 0 10px;
  font-size: 12px;
  background-position: center right 8px;
  background-repeat: no-repeat;
  background-size: 14px;
  line-height: 16px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cdefs/%3E%3Cpath fill='%23fff' d='M481.508 210.336L68.414 38.926c-17.403-7.222-37.064-4.045-51.309 8.287C2.86 59.547-3.098 78.551 1.558 96.808L38.327 241h180.026c8.284 0 15.001 6.716 15.001 15.001 0 8.284-6.716 15.001-15.001 15.001H38.327L1.558 415.193c-4.656 18.258 1.301 37.262 15.547 49.595 14.274 12.357 33.937 15.495 51.31 8.287l413.094-171.409C500.317 293.862 512 276.364 512 256.001s-11.683-37.862-30.492-45.665z'/%3E%3C/svg%3E");
}

.chat-attachment-btn {
  border: none;
  padding: 0;
  background-color: transparent;
  color: var(--text-light);
  display: flex;
  align-items: center;
  opacity: 0.7;
}
</style>