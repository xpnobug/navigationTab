<template>

  <div v-for="i in chatMessageList">
    <a-comment :class="[{ 'current-user': isCurrentUser(i.fromUser.uid) }]">
    <template #author><a>{{i.fromUser.name}}</a></template>
      <template #avatar>
        <img :src="i.fromUser.avatar" :alt="i.fromUser.name" style="border-radius: 8%;"/>
      </template>
      <template #content>
        <p>
          {{ i.message.body.content }}
        </p>
      </template>
      <template #datetime>
        <a-tooltip :title="dayjs().format('YYYY-MM-DD HH:mm:ss')">
          <span>{{ i.message.sendTime }}</span>
        </a-tooltip>
      </template>
    </a-comment>
  </div>
</template>
<script lang="ts" setup>
import dayjs from 'dayjs';
import { computed, inject, nextTick, onMounted, reactive, ref, watch } from 'vue'
import MsgItem from '../MsgItem/index.vue'
import relativeTime from 'dayjs/plugin/relativeTime';
import { useUserStore } from '@/stores/user'
import { useChatStore } from '@/stores/chat'
import { useCachedStore } from '@/stores/cached'
import { useUserInfo } from '@/hooks/useCached'
import eventBus from '@/utils/eventBus'
import type { MessageType, MsgType, CacheUserItem} from '@/services/types'
import VirtualList from "@/components/VirtualList";

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
defineOptions({ inheritAttrs: false })

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
defineExpose({  onSelectPerson })
const getKey = (item: CacheUserItem) => item.uid
</script>
<style scoped>
:deep(.current-user .ant-comment-inner) {
  display: flex !important;
  flex-direction: row-reverse;
}
:deep(.ant-comment-content) {
  flex: 0 0 auto;
}
:deep(.ant-comment-content-author) {
  justify-content: flex-end;
}

:deep(.ant-comment .ant-comment-avatar img){
  border-radius:8%
}
</style>
