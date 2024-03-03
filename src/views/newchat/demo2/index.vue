<template>
  <div class="main-new" data-theme=indigo>
    <div class="app-container">
      <ChatLeft/>
      <ChatMain/>
      <ChatRight/>
      <ChatRithtBottom/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed, onMounted, ref} from "vue";
import ChatLeft from "./components/ChatLeft.vue"
import ChatMain from "@/views/newchat/demo2/components/ChatMain.vue";
import ChatRight from "@/views/newchat/demo2/components/ChatRight.vue";
import ChatRithtBottom from "@/views/newchat/demo2/components/ChatRithtBottom.vue";
import {useUserStore} from "@/stores/user";
import {useChatStore} from "@/stores/chat";
import {LoginStatus, useWsLoginStore} from "@/stores/ws";
import {message} from "ant-design-vue";

const userStore = useUserStore()
const chatStore = useChatStore()
const userInfo = computed(() => userStore.userInfo)
const chatMessageList = computed(() => chatStore.chatMessageList)
const messageOptions = computed(() => chatStore.currentMessageOptions)
const currentNewMsgCount = computed(() => chatStore.currentNewMsgCount)


onMounted(() => {
  const linkElement = document.createElement('link');
  linkElement.rel = 'stylesheet';
  linkElement.href = './css/newchat/normalize.min.css'; // 根据实际路径调整
  document.head.appendChild(linkElement);

  let title = document.querySelectorAll(".chat-list-header");
  let totalHeight = 0;

  for (let i = 0; i < title.length; i++) {
    let totalHeight = 0;
    title[i].addEventListener("click", function () {
      let result = this.nextElementSibling;
      let activeSibling = this.nextElementSibling.classList.contains('active');
      this.classList.toggle('active');
      result.classList.toggle("active");
      if (!activeSibling) {
        for (i = 0; i < result.children.length; i++) {
          totalHeight = totalHeight + result.children[i].scrollHeight + 40;
        }
      } else {
        totalHeight = 0;
      }
      result.style.maxHeight = totalHeight + "px";
    });
  }

  const themeColors = document.querySelectorAll('.theme-color');
  themeColors.forEach(themeColor => {
    themeColor.addEventListener('click', e => {
      themeColors.forEach(c => c.classList.remove('active'));
      const theme = themeColor.getAttribute('data-color');
      document.querySelector('.main-new')?.setAttribute('data-theme', theme);
      themeColor.classList.add('active');
    });
  });
});

</script>

<style scoped>
.main-new {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: var(--app-bg);
  font-family: "DM Sans", sans-serif;
  --text-dark: #1a2f45;
  --text-light: #445e78;
  --chat-box-dark: #1b243b;
  --chat-box-light: #fff;
  --button-text: #fff;
  --toggle-ball: #fff;
  --list-item-active: #e5effb;
  --number-bg: #6895A3;
  --message-box-1: #fff;
  --message-box-2: #1a233b;
  --chat-input: #060415;
  --border-light: #8187a2;
  --info-box-color-1: #004dfc;
  --info-box-color-2: #00ba9d;
  --info-box-color-3: #715fc2;
  --info-box-color-4: #ff562d;
  --info-icon-bg-1: #b1c7fc;
  --info-icon-bg-2: #c6f0ea;
  --info-icon-bg-3: #d9d3ff;
  --info-icon-bg-4: #ffe1d4;
  --app-bg: #060415;
  --box-color: #12172d;
  --box-border: #477eff;
  --button-bg: #477eff;
  --text-dark: rgba(255,255,255,1);
  --text-light: rgba(255,255,255,.6);
  --info-box-1: rgba(160, 186, 242, 0.5);
  --info-box-2: rgba(168, 240, 229, 0.55);
  --info-box-3: rgba(194, 168, 240, 0.34);
  --info-box-4: rgba(240, 185, 168, 0.34);
  --toggle-bg: #477eff;
  --toggle-bg-off: #6895a3;
  --message-box-2: #477eff;
  --message-box-1: #576c99;
  --logo-path-1: #477eff;
  --logo-path-2: #576c99;
  --box-shadow: rgba( 18, 23, 45 ,.6) 0px 8px 24px;
  --scrollbar-thumb: linear-gradient(to bottom, rgba(43, 88, 118, .8), rgba(78, 67, 118, .8));

  --app-background: #eaebf5;
  --chat-background: #fff;
  --link-color: #c0c1c5;
  --navigation-bg: #fff;
  --navigation-box-shadow: 0 2px 6px 0 rgba(136, 148, 171, 0.2), 0 24px 20px -24px rgba(71, 82, 107, 0.1);
  --main-color: #3d42df;
  --message-bg: #f3f4f9;
  --message-bg-2: #3d42df;
  --message-text: #2c303a;
  --placeholder-text: #a2a4bc;
}
.main-new[data-theme=indigo], .main-new[data-theme=pink] {
  --app-bg: #fff;
  --box-color: #f5f8fc;
  --box-border: #e7edf5;
  --text-dark: #1a2f45;
  --text-light: #445e78;
  --chat-box-dark: #1b243b;
  --chat-box-light: #fff;
  --button-bg: #004dfc;
  --button-text: #fff;
  --toggle-bg: #004dfc;
  --toggle-bg-off: #6895A3;
  --toggle-ball: #fff;
  --logo-path-1: #A0C9E1;
  --logo-path-2: #18689C;
  --list-item-active: #e5effb;
  --number-bg: #6895A3;
  --message-box-1: #fff;
  --message-box-2: #1a233b;
  --chat-input: #f5f8fc;
  --border-light: #e5e6eb;
  --info-box-1: rgba( 217, 228, 252 ,1);
  --info-box-2: rgba( 226, 246, 243 ,1);
  --info-box-3: #f7f3ff;
  --info-box-4: #fff1e9;
  --box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  --info-box-3: #b3a5ce;
  --info-box-4: #ffceb3;
  --scrollbar-thumb: linear-gradient(to top, rgba(131, 164, 212, .5), rgb(182, 188 ,255 , 0.4));
}
.main-new[data-theme=pink] {
  --box-color: #f8f1f1;
  --button-bg: #1a233b;
  --logo-path-1: #e8d5db;
  --logo-path-2: #6895A3;
  --toggle-bg: #1a233b;
}
.main-new[data-theme=navy-dark] {
  --app-bg: #060415;
  --box-color: #12172d;
  --box-border: #477eff;
  --button-bg: #477eff;
  --toggle-bg: #477eff;
  --toggle-bg-off: #6895a3;
  --message-box-2: #477eff;
  --message-box-1: #576c99;
  --chat-input: #060415;
  --border-light: #8187a2;
}
.main-new[data-theme=navy-dark], .main-new[data-theme=dark] {
  --text-dark: rgba(255,255,255,1);
  --text-light: rgba(255,255,255,.6);
  --info-box-1: rgba(160, 186, 242, 0.5);
  --info-box-2: rgba(168, 240, 229, 0.55);
  --info-box-3: rgba(194, 168, 240, 0.34);
  --info-box-4: rgba(240, 185, 168, 0.34);
  --logo-path-1: #477eff;
  --logo-path-2: #576c99;
  --scrollbar-thumb: linear-gradient(to bottom, rgba(43, 88, 118, .8), rgba(78, 67, 118, .8));
}
.main-new[data-theme=dark] {
  --app-bg: #040508;
  --box-color: #131a24;
  --box-border: #131a24;
  --button-bg: #1e2b4a;
  --toggle-bg: #477eff;
  --toggle-bg-off: #6895a3;
  --message-box-2: #1e2b4a;
  --message-box-1: #576c99;
  --chat-input: #040508;
  --border-light: #040508;
}

.app-container {
  display: flex;
  height: 100%;
  width: 100%;
  padding: 24px;
  max-width: 1800px;
}
.open-left, .open-right {
  position: absolute;
  padding: 0;
  display: none;
  width: 20px;
  height: 20px;
  background-color: var(--box-color);
  box-shadow: var(--box-shadow);
  border: 1px solid var(--box-border);
  border-radius: 4px;
  top: 24px;
}

.open-left {
  left: 0;
}

.open-right {
  right: 0;
}

::-webkit-scrollbar {
  width: 8px;
  display: none;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: var(--scrollbar-thumb);
}

@media screen and (max-width: 1025px) {
  .app-left {
    transform: translateX(-100%);
    position: absolute;
    opacity: 0;
    top: 0;
    z-index: -2;
    height: 100%;
    width: 100%;
    transition: all 300ms cubic-bezier(0.19, 1, 0.56, 1);
  }
  .app-left.open {
    transform: translateX(0);
    opacity: 1;
  }

  .open-left {
    display: block;
  }
}
@media screen and (max-width: 680px) {
  .app-right {
    /*transform: translateX(100%);*/
    position: absolute;
    opacity: 0;
    top: 0;
    z-index: -2;
    /*height: 100%;*/
    /*width: 100%;*/
    transition: all 300ms cubic-bezier(0.19, 1, 0.56, 1);
  }
  .app-right.open {
    transform: translateX(0);
    opacity: 1;
  }
  .open-right {
    display: block;
  }

  .app-theme-selector {
    position: fixed;
    bottom: 0;
  }

  .app-main {
    height: calc(100% - 48px);
  }
}
</style>