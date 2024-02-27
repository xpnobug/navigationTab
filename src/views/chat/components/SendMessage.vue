<template>
  <div style="display: flex; flex-direction: column; align-items: flex-end;">
<!--    background-color: #f5f5f5;-->
    <a-mentions rows="4" v-model:value="inputMsg"
                autofocus
                status="none"
                :options="options"
                @select="onSelect"
                style="border: none;outline: none;"></a-mentions>
    <a-button type="primary" style="margin-top: 10px;"
              :class="['action', { 'is-edit': inputMsg.length, 'disabled': !inputMsg.length }]"
              :tabindex="!isSign || isSending"
              :disabled="!isSign || isSending"
              :placeholder="isSign ? (isSending ? '消息发送中' : '来聊点什么吧~') : ''"
              @click="sendMsgHandler">发送</a-button>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue';
import { MsgEnum } from '@/enums'
import apis from '@/services/apis'
import { useGlobalStore } from '@/stores/global'
import { useChatStore } from '@/stores/chat'
import { useUserStore } from '@/stores/user'
import type { IMention } from '../types'
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
        console.log("发送的信息",body)
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
  console.log('value', value);
});
const onSelect = (option: { value: string }) => {
  console.log('select', option);
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

