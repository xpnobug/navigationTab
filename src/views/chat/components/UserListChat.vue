<template>
  <a-list
      class="demo-loadmore-list"
      :loading="initLoading"
      item-layout="horizontal"
      :data-source="list"
  >
<!--    <template #loadMore>-->
<!--      <div-->
<!--          v-if="!initLoading && !loading"-->
<!--          :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }"-->
<!--      >-->
<!--        <a-button @click="onLoadMore"></a-button>-->
<!--      </div>-->
<!--    </template>-->
    <template #renderItem="{ item }">
      <a-list-item>
        <a-skeleton avatar :title="false" :loading="!!item.loading" active>
          <a-list-item-meta
              description="内容"
          >
            <template #title>
              <a href="https://www.antdv.com/">{{ item.name.last }}</a>
            </template>
            <template #avatar>
              <a-avatar :src="item.picture.large" />
            </template>
          </a-list-item-meta>
        </a-skeleton>
      </a-list-item>
    </template>
  </a-list>
</template>
<script lang="ts" setup>
import { onMounted, ref, nextTick } from 'vue';
const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

const initLoading = ref(true);
const loading = ref(false);
const data = ref([]);
const list = ref([]);
onMounted(() => {
  fetch(fakeDataUrl)
      .then(res => res.json())
      .then(res => {
        initLoading.value = false;
        data.value = res.results;
        list.value = res.results;
      });
});

const onLoadMore = () => {
  loading.value = true;
  list.value = data.value.concat(
      [...new Array(count)].map(() => ({ loading: true, name: {}, picture: {} })),
  );
  fetch(fakeDataUrl)
      .then(res => res.json())
      .then(res => {
        const newData = data.value.concat(res.results);
        loading.value = false;
        data.value = newData;
        list.value = newData;
        nextTick(() => {
          // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
          // In real scene, you can using public method of react-virtualized:
          // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
          window.dispatchEvent(new Event('resize'));
        });
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
</style>
