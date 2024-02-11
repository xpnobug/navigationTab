<template>
  <div style="text-align: center">
    <a-button type="primary" @click="showModal">扫码登录</a-button>
    <a-modal style="text-align: center" ref="modalRef" v-model:open="open" :wrap-style="{ overflow: 'hidden' }" @ok="handleOk" :closable="false" :footer="null">
      <template #title>
        <div ref="modalTitleRef" style="width: 100%; cursor: move">扫码登录</div>
      </template>
      <!--      二维码  status="loading" -->
      <a-space>
        <a-qrcode v-if="loginQrCode"  :value="loginQrCode" icon="https://npm.onmicrosoft.cn/hexo-tool-cc@1.1.7/source/svg/wx2.svg"/>
      </a-space>
      <p class="login-desc" v-if="loginStatus === LoginStatus.Waiting">
        扫码成功~，点击“登录”继续登录
      </p>
      <p class="login-desc" v-if="loginStatus === LoginStatus.Init">
        使用「<strong class="login-desc-bold">微信</strong>」扫描二维码登录~~
      </p>
      <template #modalRender="{ originVNode }">
        <div :style="transformStyle">
          <component :is="originVNode" />
        </div>
      </template>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed, CSSProperties, watch, watchEffect } from 'vue';
import { useDraggable } from '@vueuse/core';
import { useWsLoginStore, LoginStatus } from '@/stores/ws'
const loginStore = useWsLoginStore()
const open = ref<boolean>(false);
const modalTitleRef = ref<HTMLElement>(null);

const visible = computed({
  get() {
    return loginStore.showLogin
  },
  set(value) {
    loginStore.showLogin = value
  },
})
const loginQrCode = computed(() => loginStore.loginQrCode)
const loginStatus = computed(() => loginStore.loginStatus)

const qrLoading = ref();
if (loginStore.loginStatus == LoginStatus.Waiting){
  console.log("扫码成功",loginStatus)
  qrLoading.value = "scanned";
}
const showModal = () => {
  open.value = true;
  // 获取登录二维码
  loginStore.getLoginQrCode()
};



// watchEffect(() => {
//   console.log("打开窗口了 而且 二维码没获取，而且非登录就去获取二维码",visible.value)
//   // 打开窗口了 而且 二维码没获取，而且非登录就去获取二维码
//   if (visible.value && !loginQrCode.value) {
//     console.log("打开窗口了 而且 二维码没获取，而且非登录就去获取二维码",loginQrCode.value)
//     // 获取登录二维码
//     loginStore.getLoginQrCode()
//   }
// })
const { x, y, isDragging } = useDraggable(modalTitleRef);
const handleOk = (e: MouseEvent) => {
  console.log(e);
  open.value = false;
};
const startX = ref<number>(0);
const startY = ref<number>(0);
const startedDrag = ref(false);
const transformX = ref(0);
const transformY = ref(0);
const preTransformX = ref(0);
const preTransformY = ref(0);
const dragRect = ref({ left: 0, right: 0, top: 0, bottom: 0 });
watch([x, y], () => {
  if (!startedDrag.value) {
    startX.value = x.value;
    startY.value = y.value;
    const bodyRect = document.body.getBoundingClientRect();
    const titleRect = modalTitleRef.value.getBoundingClientRect();
    dragRect.value.right = bodyRect.width - titleRect.width;
    dragRect.value.bottom = bodyRect.height - titleRect.height;
    preTransformX.value = transformX.value;
    preTransformY.value = transformY.value;
  }
  startedDrag.value = true;
});
watch(isDragging, () => {
  if (!isDragging) {
    startedDrag.value = false;
  }
});

watchEffect(() => {
  if (startedDrag.value) {
    transformX.value =
        preTransformX.value +
        Math.min(Math.max(dragRect.value.left, x.value), dragRect.value.right) -
        startX.value;
    transformY.value =
        preTransformY.value +
        Math.min(Math.max(dragRect.value.top, y.value), dragRect.value.bottom) -
        startY.value;
  }
});
const transformStyle = computed<CSSProperties>(() => {
  return {
    transform: `translate(${transformX.value}px, ${transformY.value}px)`,
  };
});
</script>

<style scoped>
:deep(.ant-modal-footer) {
  display: none;
}

</style>