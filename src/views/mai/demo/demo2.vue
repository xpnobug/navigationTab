<template>
<div class="main">
  <ImgAddComponents/>
  <div style="position: fixed;">
    <a-space warp>
      <a-button type="text" danger v-for="i in typeItems" @click="handleClick(i)">{{ i.label }}
        <span v-if="i.label === typeName">({{total}})</span>
      </a-button>
    </a-space>
  </div>
  <div class="Gallery" id="scrollableElement" ref="virtualListRef" @scroll="onScrolls">
    <div class="imglist">
      <ShowCompents :listInfo="listInfo"/>
    </div>
    <div style="text-align: center; margin: 20px; color: white" v-if="loading">Loading...</div>
  </div>
</div>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue';
import { getImgList } from "@/api/mai";
import { useInView } from "@/hooks/useInView";
import throttle from "lodash/throttle";
import ShowCompents from "@/views/mai/demo/ShowCompents.vue";
import ImgAddComponents from "@/views/mai/demo/components/ImgAddComponents.vue";

const typeItems = ref([
  { id: 1, label: '动漫'},
  { id: 2, label: '古风'},
  { id: 3, label: '情侣'},
  { id: 4, label: '男生'},
  { id: 5, label: '女生'},
  { id: 6, label: '明星'},
  { id: 7, label: '搞怪'},
  { id: 8, label: '精选'},
]);

const imgRef = ref([]);
const listInfo = ref([]);
const total = ref(0);
const virtualListRef = ref(null);
provide('virtualListRef', virtualListRef);
const typeName = ref('动漫');
const handleClick = async (i) => {
  typeName.value = i.label;
  const params = {
    cateName: i.label,
    pageNum: 1,
    pageSize: 20
  };
  const res = await getImgList(params);
  total.value = res.data.total
  listInfo.value = res.data.records;
  await nextTick();
  imgRef.value = document.querySelectorAll("img");
}
const list = async () => {
  const params = {
    cateName: '动漫',
    pageNum: 1,
    pageSize: 20
  };
  const res = await getImgList(params);
  listInfo.value = res.data.records;
  total.value = res.data.total
  await nextTick();
  imgRef.value = document.querySelectorAll("img");
};

// 是否正在加载更多图片
const loading = ref(false);
const num = ref(1)

// 加载更多图片数据的函数
const loadMoreImages = async () => {
  num.value += 1;
  // console.log(num.value)
  loading.value = true;
  setTimeout(async () => {
    try {
      const params = {
        cateName: typeName.value,
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
}, 800);




onMounted(async () => {
  // 获取需要检查滚动位置的元素，假设这个元素的id为 "scrollableElement"
  scrollContainer.value = document.getElementById("scrollableElement");
  await list();
  useInView(imgRef)
});
</script>



<style scoped>
/* 定义淡入动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
/* 应用淡入动画到元素 */
.fade-in {
  animation: fadeIn 0.6s ease-in;
}

::-webkit-scrollbar {
  display: none;
  width: 8px;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: var(--scrollbar-thumb);
}
.Gallery {
  overflow: auto;
  max-width: 1200px;
  height: 730px;
  margin-top: 30px;
}
.imglist{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 12px; /* change space between image here */
}

.Gallery .imglist img,
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


.Gallery .imglist img {
  max-width: 100vh;
  transition: 0.5s;
}

.Gallery .imglist img:hover {
  filter: grayscale(1);
}

.Gallery .imglist img.notDisplay {
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

.main {
  /*margin: 12px;*/
  /*background: #111;*/
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