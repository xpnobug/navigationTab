<template>
  <a-space direction="vertical" style="margin: 0 10px;">
    <a-space>
      <a-popover>
        <template #content>
          <p>QQ登录</p>
        </template>
        <a-button shape="circle" :size="size" @click="loginHandle">
          <template #icon>
            <icon-font type="icon-a-QQ1" style="height: 28px; width: 28px"></icon-font>
          </template>
        </a-button>
      </a-popover>

    </a-space>
  </a-space>
</template>

<script lang="ts" setup>
import {Icon} from '@arco-design/web-vue';
import type {SizeType} from 'ant-design-vue/es/config-provider';
import {ref} from 'vue';
import {loginByQQ} from '@/api/login';

const IconFont = Icon.addFromIconFontCn({src: '//at.alicdn.com/t/c/font_1898478_qk3tcjfa6nc.js'});
const size = ref<SizeType>('large');
const loginHandle = async () => {
  const res = await loginByQQ();
  const redirectUrl = res.data.data;
  // window.location.href = redirectUrl; // 跳转到获取的链接
  window.open(redirectUrl, '_blank'); // 在新的页面中打开链接
}

</script>

