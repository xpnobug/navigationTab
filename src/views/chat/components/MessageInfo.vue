<template>
  <a-comment v-for="i in chatMessageList">
<!--    <template #actions>-->
<!--      <span key="comment-basic-like">-->
<!--        <a-tooltip title="Like">-->
<!--          <template v-if="action === 'liked'">-->
<!--            <LikeFilled @click="like" />-->
<!--          </template>-->
<!--          <template v-else>-->
<!--            <LikeOutlined @click="like" />-->
<!--          </template>-->
<!--        </a-tooltip>-->
<!--        <span style="padding-left: 8px; cursor: auto">-->
<!--          {{ likes }}-->
<!--        </span>-->
<!--      </span>-->
<!--      <span key="comment-basic-dislike">-->
<!--        <a-tooltip title="Dislike">-->
<!--          <template v-if="action === 'disliked'">-->
<!--            <DislikeFilled @click="dislike" />-->
<!--          </template>-->
<!--          <template v-else>-->
<!--            <DislikeOutlined @click="dislike" />-->
<!--          </template>-->
<!--        </a-tooltip>-->
<!--        <span style="padding-left: 8px; cursor: auto">-->
<!--          {{ dislikes }}-->
<!--        </span>-->
<!--      </span>-->
<!--      <span key="comment-basic-reply-to">Reply to</span>-->
<!--    </template>-->
    <template #author><a>Han Solo</a></template>
    <template #avatar>
      <a-avatar src="https://qexo.reaicc.com/pub/random_image/?num=1" alt="Han Solo" />
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
</template>
<script lang="ts" setup>
import dayjs from 'dayjs';
import { LikeFilled, LikeOutlined, DislikeFilled, DislikeOutlined } from '@ant-design/icons-vue';
import {computed, ref} from 'vue';
import relativeTime from 'dayjs/plugin/relativeTime';
import {useChatStore} from "@/stores/chat";
import {useUserStore} from "@/stores/user";
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
const userInfo = computed(() => userStore.userInfo)
const chatMessageList = computed(() => chatStore.chatMessageList)
console.log(chatMessageList.value)



</script>

