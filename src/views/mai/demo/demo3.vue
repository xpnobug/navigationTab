<template>
<div class="main" @scroll="onScrolls" id="scrollableElement">
  <div class="shell" >
    <div class="image" v-for="i in listInfo"><img :src="i.avatar"/></div>
  </div>
  <div style="text-align: center; margin: 20px;"  v-if="loading">Loading...</div>
</div>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue';
import { getImgList } from "@/api/mai";
import { useInView } from "@/hooks/useInView";
import throttle from "lodash/throttle";
// import { debounce, throttle } from "@/hooks/useJlfd";

const imgRef = ref([]);
const listInfo = ref([]);
const total = ref(0);
const virtualListRef = ref(null);
provide('virtualListRef', virtualListRef);

const list = async () => {
  const params = {
    cateName: 11,
    pageNum: 1,
    pageSize: 20
  };
  const res = await getImgList(params);
  listInfo.value = res.data.records;
  await nextTick();
  imgRef.value = document.querySelectorAll("img");
};

// 是否正在加载更多图片
const loading = ref(false);
const num = ref(1)
// 加载更多图片数据的函数
const loadMoreImages = async () => {
  num.value += 1;
  console.log(num.value)
  loading.value = true;
  setTimeout(async () => {
    try {
      const params = {
        cateName: null,
        pageNum: num.value,
        pageSize: 20
      };
      const res = await getImgList(params);
      listInfo.value = [...listInfo.value, ...res.data.records];
      await nextTick();
      imgRef.value = document.querySelectorAll("img");
    } catch (error) {
      console.error("Error loading more images:", error);
    } finally {
      loading.value = false;
    }
  }, 1000); // 2秒延迟
};

const scrollContainer = ref();
// 滚动时触发函数，主要处理新消息提示
// 创建节流函数
const onScrolls = throttle(() => {
  // 获取元素的滚动位置
  const scrollPosition = scrollContainer.value.scrollTop;
  console.log(scrollPosition)
  // 获取元素的滚动容器高度
  const containerHeight = scrollContainer.value.clientHeight;
  // 获取元素的滚动内容高度
  const contentHeight = scrollContainer.value.scrollHeight;
  // 计算滚动位置与滚动容器高度的差值
  const scrollDifference = contentHeight - containerHeight - scrollPosition;
  // 判断是否已滚动到底部最后一个可视范围内
  console.log("calculateBottomPosition",scrollDifference)
  if (scrollDifference <= 1) {
    // 在此处加载更多图片数据
    loadMoreImages();
  }
}, 800);
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


onMounted(async () => {
  // 获取需要检查滚动位置的元素，假设这个元素的id为 "scrollableElement"
  scrollContainer.value = document.getElementById("scrollableElement");
  await list();
  // useInView(imgRef)
});
</script>

<style scoped>
.main{
  background-color: rgba(130, 140, 250, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: auto;
  height: 790px;
}
.shell{
  max-width: 1300px;
  column-count: 5;
  column-gap: 15px;
}
.image{
  margin-bottom: 15px;
}
.image img{
  width: 100%;
}
@media (max-width:1200px){
  .shell{
    column-count: 4;
  }
}
@media (max-width:850px){
  .shell{
    column-count: 3;
  }
}
@media (max-width:600px){
  .shell{
    column-count: 2;
  }
}
</style>