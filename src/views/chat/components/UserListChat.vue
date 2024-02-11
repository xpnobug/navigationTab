<template>
  <LbtShow/>
  <a-list
      class="demo-loadmore-list"
      :loading="initLoading"
      item-layout="horizontal"
      :data-source="sessionList"
  >
    <template #loadMore>
      <div
          v-if="!initLoading && !loading"
          :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }"
      >
<!--        <a-button @click="onLoadMore"></a-button>-->
      </div>
    </template>

    <template #renderItem="{ item }">
      <div style="padding: 5px" >
        <a-card :bordered="false">
          <div style="display: flex; align-items: center; padding: 10px; justify-content: space-between;">
            <div style="display: flex; align-items: center; padding: 10px;">
              <div style="padding: 0px 10px 0px 0px;">
                <a-avatar :src="item.avatar" />
              </div>
              <div>
                <a href="#">{{ item.name }}</a>
                <div style="width: 130px;">
                  <p style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 0;">{{item.lastMsg}}</p>
                </div>
              </div>
            </div>

            <span class="message-time">{{ item.lastMsgTime }}</span>
          </div>
        </a-card>
      </div>
<!--      <a-list-item>-->
<!--        <a-skeleton avatar :title="false" :loading="!!item.loading" active>-->
<!--          <a-list-item-meta>-->
<!--            <template #title>-->
<!--              <a href="#">{{ item.name }}</a>-->
<!--            </template>-->
<!--            <template #avatar>-->
<!--              <a-avatar :src="item.avatar" />-->
<!--            </template>-->
<!--            <template #description>-->
<!--              <p style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 0;">{{item.lastMsg}}</p>-->
<!--            </template>-->
<!--          </a-list-item-meta>-->
<!--        </a-skeleton>-->
<!--      </a-list-item>-->
    </template>
  </a-list>
</template>
<script lang="ts" setup>
import { onMounted, ref, nextTick } from 'vue';
import { useChatStore } from '@/stores/chat'
const chatStore = useChatStore()
import { useUserInfo } from '@/hooks/useCached'
import { MsgEnum, RoomTypeEnum } from '@/enums'
import renderReplyContent from '@/utils/renderReplyContent'
import { IsAllUserEnum } from '@/services/types'
import { formatTimestamp } from '@/utils/computedTime'
import LbtShow from "@/views/chat/components/LbtShow.vue";
const count = 3;
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
        lastMsg: '[1条] '+ LastUserMsg || item.text || '欢迎使用MallChat',
        lastMsgTime: formatTimestamp(item?.activeTime),
      }
    }),
)

onMounted(() => {
  initLoading.value = false;
  data.value = sessionList.value;
  list.value = sessionList.value;
});

const onLoadMore = () => {
  loading.value = true;
  list.value = data.value.concat(
      [...new Array(count)].map(() => ({ loading: true, name: {}, picture: {} })),
  );
  const newData = data.value.concat(sessionList.value);
  loading.value = false;
  data.value = newData;
  list.value = newData;
  nextTick(() => {
    // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
    // In real scene, you can using public method of react-virtualized:
    // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
    window.dispatchEvent(new Event('resize'));
  });

};
</script>
<style scoped>
.demo-loadmore-list {
  overflow-y: auto;
  min-height: 610px;
  height: 0;
}
.demo-loadmore-list::-webkit-scrollbar {
  width: 5px;
}
/* 修改滚动条颜色 */
.demo-loadmore-list::-webkit-scrollbar-thumb {
  width: 10px;
  background-color: rgb(208, 207, 207);
  border-radius: 20px;
}
:deep(.ant-card .ant-card-body){
  padding: 0;
}
</style>
