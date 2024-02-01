<template>
  <a-comment>
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
        我不好
      </p>
    </template>
    <template #datetime>
      <a-tooltip :title="dayjs().format('YYYY-MM-DD HH:mm:ss')">
        <span>{{ dayjs().fromNow() }}</span>
      </a-tooltip>
    </template>
  </a-comment>
</template>
<script lang="ts" setup>
import dayjs from 'dayjs';
import { LikeFilled, LikeOutlined, DislikeFilled, DislikeOutlined } from '@ant-design/icons-vue';
import { ref } from 'vue';
import relativeTime from 'dayjs/plugin/relativeTime';
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
</script>
<style scoped>
::v-deep .ant-comment-inner {
  display: flex !important;
  flex-direction: row-reverse;
}
::v-deep .ant-comment-content{
  flex: 0 0 auto;
}
::v-deep .ant-comment-content-author{
  justify-content: flex-end;
}
</style>
