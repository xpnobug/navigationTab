<template>

  <div v-for="i in chatMessageList">
    <a-comment :class="[{ 'current-user': isCurrentUser(i.fromUser.uid) }]">
      <template #author><a>{{ i.fromUser.name }}</a></template>
      <template #datetime>
        <a-tooltip :title="dayjs().format('YYYY-MM-DD HH:mm:ss')">
          <span>{{ i.message.sendTime }}</span>
        </a-tooltip>
      </template>
      <template #avatar>
        <img :src="i.fromUser.avatar" :alt="i.fromUser.name" style="border-radius: 8%;"/>
      </template>
      <template #content>
        <div style="margin-right: 10px;">
          <div :class="{'message-bubble': true, 'green-bubble': isCurrentUser(i.fromUser.uid) }">
            {{i.message.body.content}}
          </div>
        </div>
<!--        <MessageContent :content="i.message.body.content" :uid="i.fromUser.uid"/>-->
      </template>
    </a-comment>
  </div>
</template>
<script lang="ts" setup>
import dayjs from 'dayjs';
import {computed, ref} from 'vue'
import relativeTime from 'dayjs/plugin/relativeTime';
import {useUserStore} from '@/stores/user'
import {useChatStore} from '@/stores/chat'
import {useCachedStore} from '@/stores/cached'
import eventBus from '@/utils/eventBus'
import type {CacheUserItem} from '@/services/types'
import MessageContent from "@/views/chat/components/MessageContent.vue";

dayjs.extend(relativeTime);

const likes = ref<number>(0);
const dislikes = ref<number>(0);
const action = ref<string>();

const like = () => {
  likes.value = 1;
  dislikes.value = 0;
  action.value = 'liked';
};

const dislike = () => {
  likes.value = 0;
  dislikes.value = 1;
  action.value = 'disliked';
};
const chatStore = useChatStore()
const userStore = useUserStore()


// 多根元素的时候，不加这个透传属性会报 warning
defineOptions({inheritAttrs: false})

// 只能对一级 props 进行 toRefs 结构，否则会丢失响应

const userInfo = computed(() => userStore.userInfo)
const chatMessageList = computed(() => chatStore.chatMessageList)
const currentNewMsgCount = computed(() => chatStore.currentNewMsgCount)

const cachedStore = useCachedStore()

// 创建 isCurrentUser 计算属性
const isCurrentUser = (uid) => {
  return uid == userInfo.value.uid
}
const onSelectPerson = (uid: number, ignore = false) => {
  if (!uid) return
  eventBus.emit('focusMsgInput')
  setTimeout(() => {
    const userItem = cachedStore.userCachedList[uid]
    userItem && selectPerson?.(userItem as CacheUserItem, ignore)
  }, 10)
}
// 暴露 ref 属性
defineExpose({onSelectPerson})
const getKey = (item: CacheUserItem) => item.uid
</script>
<style scoped>
:deep(.current-user .ant-comment-inner) {
  display: flex !important;
  flex-direction: row-reverse;
}
:deep(.current-user .ant-comment-content-author){
  flex-direction: row-reverse;
}
:deep(.current-user .ant-comment-content) {
  text-align: right;
}
:deep(.ant-comment-content) {
  flex: 0 0 auto;
}
/*:deep(.ant-comment-content-author) {*/
/*  justify-content: flex-end;*/
/*}*/

:deep(.ant-comment .ant-comment-avatar img) {
  border-radius: 8%
}

@media (max-width: 768px) {
  :deep(.ant-comment-content-detail) {
    /*width: 260px;*/
  }
}
.message-bubble {
  position: relative;
  display: inline-block;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 10px;
}
.green-bubble {
  background-color: #89d961;
}
</style>
