<template>
  <div class="work-space">
    <div class="waterfall-container">
      <div class="virtual-waterfall-container">
        <fs-virtual-water-fall :request="req" :gap="15" :column="6" :request-size="30">
          <template #item="{ item }">
            <img class="test-item" :src="item.src" />
          </template>
        </fs-virtual-water-fall>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FsVirtualWaterFall from "../components/FsVirtualWaterFall.vue";
import type { FsVirtualWaterfallReuqest } from "../components/type";
import {getImgList} from "@/api/mai";

const req: FsVirtualWaterfallReuqest = async (page, pageSize) => {
  // 请求，并传入分页参数
  const params = {
    cateName: 11,
    pageNum: page,
    pageSize: pageSize
  };
  const rep = await getImgList(params);
  console.log(rep.data)
  // 数据处理
// 数据处理
  let rows = [];
  let count = 0;
  rows = rep.data.records || [];
  count = rep.data.total || 0;
  rows = rows.map((item: any) => ({
    id: item.id,
    width: 800,
    height: 800,
    src: item.avatar + "?x-oss-process=image/resize,w_240/format,jpg",
  }));

  return {
    total: count,
    list: rows,
  };
};
</script>

<style scoped lang="scss">
.work-space {
  //width: 60vw;
  height: 90vh;
  .list-container {
    width: 100%;
    height: 80vh;
    max-width: 450px;
  }
  .waterfall-container {
    width: 100%;
    height: 100vh;
  }
}
.virtual-waterfall-container {
  width: 100%;
  height: 100%;
}
.test-item {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  //animation: identifier 0.25s; // 添加动画，使其出现时更加丝滑
}
@keyframes identifier {
  from {
    opacity: 0;
    transform: translateY(200px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
