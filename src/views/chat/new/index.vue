<template>
  <a-space direction="vertical" :style="{ width: '100%' }" :size="[0, 48]">
    <a-layout>
      <a-layout-sider :style="siderStyle">
        <UserListChat/>
      </a-layout-sider>
      <a-layout>
        <a-layout-header :style="headerStyle" class="header">Header</a-layout-header>
        <a-layout-content :style="contentStyle" class="gdt">
          <div v-for="i in 10">
            <MessageInfo/>
          </div>
        </a-layout-content>
        <a-layout-footer :style="footerStyle">
          <SendMessage/>
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </a-space>
</template>
<script lang="ts" setup>
import type { CSSProperties } from 'vue';
import UserListChat from "@/views/chat/components/UserListChat.vue";
import SendMessage from "@/views/chat/components/SendMessage.vue";
import MessageInfo from "@/views/chat/components/MessageInfo.vue";
const headerStyle: CSSProperties = {
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '245, 245, 245',
};

const contentStyle: CSSProperties = {
  height: 0,
  // lineHeight: '500px',
  padding: '0px 20px',
  overflowY: "scroll",
  backgroundColor: '245, 245, 245'
};

const siderStyle: CSSProperties = {
  // textAlign: 'center',
  lineHeight: '120px',
  backgroundColor: '#e5e4e4',
};

const footerStyle: CSSProperties = {
  borderTopStyle: "solid",
  borderTopColor: "#f1f1f1",
  backgroundColor: '245, 245, 245',
};
const handleScroll = (direction: string, e: Event) => {
  console.log('direction:', direction);
  console.log('target:', e.target);
};
</script>

<style scoped>
.header{
  border-bottom-style: solid;
  border-bottom-color: #f1f1f1;
  background-color: rgba(245, 245, 245);
}
.gdt::-webkit-scrollbar {
  width: 5px;
}
/* 修改滚动条颜色 */
.gdt::-webkit-scrollbar-thumb {
  width: 10px;
  background-color: rgba(232, 227, 227, 0.7);
  border-radius: 20px;
}
</style>