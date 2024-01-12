<template>
  <a-list class="demo-loadmore-list" :loading="initLoading" item-layout="horizontal" :data-source="list">
    <template v-if="list.length === 0">
      <a-empty image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
        :image-style="{
          height: '60px',
        }">
        <template #description>
          <span>
            没有数据
            <!-- <a href="#api">Description</a> -->
          </span>
        </template>
      </a-empty>
    </template>
    <!-- <template #loadMore>
      <div v-if="!initLoading && !loading"
        :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }">
        <a-button @click="onLoadMore">loading more</a-button>
      </div>
    </template> -->

    <template #renderItem="{ item }">
      <a-list-item>
        <!-- <template #actions>
          <a key="list-loadmore-edit">edit</a>
          <a key="list-loadmore-more">more</a>
        </template> -->
        <a-skeleton avatar :title="false" :loading="!!item.loading" active>
          <a-list-item-meta description="">
            <template #title>
              <FileViewComponents :dateItem="item"></FileViewComponents>
            </template>
            <template #avatar>
              <icon-font type="icon-wenjianleixing-biaozhuntu-tupianwenjian" />
            </template>
          </a-list-item-meta>
          <!-- <div>content</div> -->
        </a-skeleton>
      </a-list-item>
    </template>
  </a-list>
</template>
<script lang="ts" setup>
import FileViewComponents from '@/components/blog/FileViewComponents.vue';
import { onMounted, ref, nextTick, toRefs } from 'vue';
import { createFromIconfontCN, SmileOutlined } from '@ant-design/icons-vue';
import { getPostList } from '@/api/blog'
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_1898478_gjo5nnbbjro.js',

});
const count = 10;
// const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

const initLoading = ref(true);
const loading = ref(false);
const data = ref([]);
const list = ref([]);
const props = defineProps(['keyId']);
const { keyId } = toRefs(props);
console.log('blog分类id：', keyId.value)
const ruleForm = ({
  keyId: ''
})

onMounted(() => {
  getPostList(keyId.value)
    .then(res => {
      console.log(res);
      initLoading.value = false;
      data.value = res.data;
      list.value = res.data;
    });
});

const onLoadMore = () => {
  loading.value = true;
  list.value = data.value.concat(
    [...new Array(count)].map(() => ({ loading: true, name: {}, picture: {} })),
  );
  getPostList(keyId.value)
    .then(res => {
      const newData = data.value.concat(res.data);
      loading.value = false;
      data.value = newData;
      list.value = newData;
      nextTick(() => {
        window.dispatchEvent(new Event('resize'));
      });
    });
};

</script>
<style scoped>
/* .demo-loadmore-list {
  min-height: 350px;
} */
</style>
