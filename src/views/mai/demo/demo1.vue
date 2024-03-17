<template>
  <a-tabs v-model:activeKey="activeKey" centered>
    <a-tab-pane key="1" tab="Tab 1">
      <div class="Gallery" @scroll="onScroll" id="scrollableElement">
        <img v-for="img in listInfo" :src="img.avatar" />
        <div v-if="loading">Loading...</div>
      </div>
    </a-tab-pane>
  </a-tabs>

</template>

<script lang="ts" setup>
import {ref,onMounted} from "vue";
import {getMaiInfo ,getImgList} from "@/api/mai"
import throttle from "lodash/throttle";
const listInfo = ref();
const total = ref(0);

const list = async () => {
  const params = {
    cateName:null,
    size:90
  };
  const res = await getImgList(params);
  listInfo.value = res.data.data.records;
  // console.log(listInfo.value)
}
list();

//滚动懒加载
// 数据加载成功后调用 scrollToBottom 方法
// 创建响应式变量来存储滚动容器
const scrollContainer = ref<HTMLElement | null>(null);
// 是否正在加载更多图片
const loading = ref(false);
onMounted(() => {
  // 获取需要检查滚动位置的元素，假设这个元素的id为 "scrollableElement"
  scrollContainer.value = document.getElementById("scrollableElement");
  // console.log(scrollContainer.value)
})
// 滚动时触发函数，主要处理新消息提示
// 创建节流函数
const onScroll = throttle(() => {
  if (!scrollContainer.value) return; // 如果滚动容器不存在，则直接返回
  // 获取元素的滚动位置
  const scrollPosition = scrollContainer.value.scrollTop;
  // console.log(scrollPosition)
  // 获取元素的滚动容器高度
  const containerHeight = scrollContainer.value.clientHeight;
  // 获取元素的滚动内容高度
  const contentHeight = scrollContainer.value.scrollHeight;
  // 计算滚动位置与滚动容器高度的差值
  const scrollDifference = contentHeight - containerHeight - scrollPosition;
  // 判断是否已滚动到底部最后一个可视范围内
  if (scrollDifference <= 0) {
    // 在此处加载更多图片数据
    loadMoreImages();
  }
}, 100);
// 将滚动事件处理器绑定到window的scroll事件上
// window.addEventListener('scroll', onScroll);
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
// 加载更多图片数据的函数
const loadMoreImages = () => {
  loading.value = true;
  // 模拟加载延迟
  setTimeout(() => {
    const params = {
      cateName:null,
      size:90
    };
    const newImages = getImgList(params);
    listInfo.value = [...listInfo.value, ...newImages];
    loading.value = false;
  }, 1000); // 模拟加载延迟为1秒
};
</script>

<style scoped>
/* Magic part here ✨✨✨ */

.Gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 12px; /* change space between image here */
  max-width: 1200px;
  margin: auto;
  overflow: scroll;
}

.Gallery img,
.Gallery-add {
  flex: 1 1 0;
  height: 250px; /* change line height here */
  width: auto;
  max-width: 100%;
  -o-object-fit: cover;
  object-fit: cover;
  cursor: pointer;
}

/* other */

.Gallery-add {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 100px;
  box-shadow: inset 0 0 10px 0px #d53a9d,
  inset 0 0 20px 10px #743ad5;
  color: #d53a9d;
}

.Gallery img {
  max-width: 100vh;
  transition: 0.5s;
}

.Gallery img:hover {
  filter: grayscale(1);
}

.Gallery img.notDisplay {
  max-width: 0;
  margin-left: -6px;
  margin-right: -6px;;
}

svg {
  width: 2rem;
  height: 2rem;
}

* {
  box-sizing: border-box;
}

body {
  margin: 12px;
  background: #111;
  font-family: 'Poppins', sans-serif;
}

.Me {
  position: fixed;
  z-index: 10;
  bottom: 20px;
  left: 50%;
  color: #fff;
  transform: translateX(-50%);
  font-weight: 700;
  opacity: .7;
}
</style>