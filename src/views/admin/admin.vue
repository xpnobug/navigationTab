<script setup lang="ts">
import {onMounted, ref} from "vue";
import {RouterView, useRouter} from 'vue-router';
import {createFromIconfontCN, MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons-vue';
import {message} from 'ant-design-vue';
import getMenuData from "../../router/menuUtil";

const change = (affixed: boolean) => {
  console.log(affixed);
};

const router = useRouter();


//获取菜单数据
const {menuData} = getMenuData();

console.log("", menuData)
// 判断menuData是否成功获取
if (menuData && menuData.length > 0) {
  message.success('菜单渲染成功');
} else {
  message.error('菜单加载失败');
}

const handleMenuItemClick = (item) => {
  const routeName = item.name; // 使用菜单项的name属性作为路由名称
  router.push({name: routeName, params: item.params});
  console.log(routeName, item.params)
};
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_1898478_qk3tcjfa6nc.js',
});

onMounted(() => {
  const body = document.querySelector('body'),
      shell = document.querySelector('nav'),
      toggle = document.querySelector(".toggle"),
      searchBtn = document.querySelector(".search-box"),
      modeSwitch = document.querySelector(".toggle-switch"),
      modeText = document.querySelector(".mode-text");
// 点击toggle元素时触发事件
  toggle.addEventListener("click", () => {
    // 切换shell元素的close类
    shell.classList.toggle("close");
  })
// 点击searchBtn元素时触发事件
  searchBtn.addEventListener("click", () => {
    // 移除shell元素的close类
    shell.classList.remove("close");
  })
// 点击modeSwitch元素时触发事件
  modeSwitch.addEventListener("click", () => {
    // 切换body元素的dark类
    body.classList.toggle("dark");
    // 如果body元素包含dark类
    if (body.classList.contains("dark")) {
      modeText.innerText = "白日模式";
    } else {
      modeText.innerText = "夜间模式";
    }
  });
});

const closesss = ref<boolean>(false);

const collapsed = ref<boolean>(false);
const toggleSidebar = () => {
  collapsed.value = !collapsed.value;
};

const contentStyles = computed(() => ({
  padding: '20px',
  marginLeft: collapsed.value ? '-150px' : '35px', // 根据collapsed的值动态调整marginLeft
  transition: 'all 0.3s ease'
}));

const selectedKeys = ref<string[]>(['1']);
</script>

<template>
  <div class="main">
    <div style="height: 100%; width: 250px;">
      <nav class="shell" :class="{ close: closesss }">
        <header>
          <div class="image-text">
                <span class="image">
                    <img src="https://q1.qlogo.cn/g?b=qq&nk=2877406366&s=640" alt="">
                </span>
            <div class="text logo-text">
              <span class="name">导航栏</span>
              <span class="software">导航栏</span>
            </div>
          </div>
          <icon-font class="iconfont toggle" type="icon-guanbi"  @click="toggleSidebar"/>
<!--          <i class="iconfont icon-guanbi toggle" @click="toggleSidebar"></i>-->
        </header>
        <div class="menu-bar">
          <div class="menu">
            <li class="search-box">
<!--              <i class="iconfont icon-sousuo icon"></i>-->
              <icon-font class="iconfont icon" type="icon-sousuo"/>
              <input type="text" placeholder="搜索...">
            </li>
            <ul class="menu-links" >
              <li class="nav-link" v-for="item in menuData">
                <RouterLink :to="item.path">
                  <icon-font class="icon" :type="item.meta.icon"/>
                  <!--                v-if="!item.children"-->
                  <span class="text nac-text" @click="handleMenuItemClick(item)">{{item.meta.title}}</span>
                </RouterLink>
              </li>
            </ul>
          </div>
          <div class="bottom-content">
            <li class="">
              <a href="#">
                <icon-font class="iconfont icon" type="icon-zhuxiao"/>
                <span class="text nac-text">注销</span>
              </a>
            </li>
            <li class="mode">
              <div class="sun-moon">
                <i class="iconfont icon-rijian icon sun"></i>
                <i class="iconfont icon-yejian icon moon"></i>
              </div>
              <span class="mode-text text">夜间模式</span>
              <div class="toggle-switch">
                <span class="switch"></span>
              </div>
            </li>
          </div>
        </div>
      </nav>
    </div>
    <div style="width: 100%; display: flex; align-items: stretch; " :style="contentStyles">
      <a-layout>
        <a-layout-content :style="{ padding: '24px', background: '#fff'}">
          <div>
            <RouterView/>
          </div>
        </a-layout-content>
      </a-layout>
    </div >

  </div>
</template>

<style scoped>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.main {
  display: flex;
  min-height: 100vh;
  background-color: var(--body-color);
  transition: all 0.3s ease;
}

.shell {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 250px;
  padding: 10px 14px;
  background: var(--shell-color);
  transition: all 0.3s ease;
  z-index: 100;
}

.close {
  width: 88px;
}

.shell li {
  height: 50px;
  list-style: none;
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.image,
.icon {
  min-width: 60px;
  border-radius: 6px;
}

.icon {
  min-width: 60px;
  border-radius: 6px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font: 300 23px '';
}

.text,
.icon {
  color: var(--text-color);
  transition: all 0.3s ease;
}

.text {
  font: 500 17px;
  white-space: nowrap;
  opacity: 1;
}

.shell.close .text {
  opacity: 0;
}

header {
  position: relative;
}

.image-text {
  display: flex;
  align-items: center;
}

.logo-text {
  display: flex;
  flex-direction: column;
}

.name {
  margin-top: 2px;
  font: 600 18px '';
}

.software {
  font-size: 20px;
  margin-top: -2px;
  display: block;
}

.image {
  display: flex;
  align-items: center;
  justify-content: center;
}

.image img {
  width: 45px;
  border-radius: 6px;
}

.toggle {
  position: absolute;
  top: 50%;
  right: -25px;
  transform: translateY(-50%) rotate(180deg);
  height: 25px;
  width: 25px;
  background-color: var(--primary-color);
  color: var(--shell-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.toggle {
  color: #ccc;
}

.shell.close .toggle {
  transform: translateY(-50%) rotate(0deg);
}

.menu {
  margin-top: 40px;
}

li.search-box {
  border-radius: 6px;
  background-color: var(--primary-color-light);
  cursor: pointer;
  transition: all 0.3s ease;
}

li.search-box input {
  height: 100%;
  width: 100%;
  outline: none;
  border: none;
  background-color: var(--primary-color-light);
  color: var(--text-color);
  border-radius: 6px;
  font-size: 17px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.shell li a {
  list-style: none;
  height: 100%;
  background-color: transparent;
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.shell li a:hover {
  background-color: var(--primary-color);
}

.shell li a:hover .icon,
.shell li a:hover .text {
  color: var(--shell-color);
}

.menu-bar {
  height: calc(100% - 55px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: scroll;
}

.menu-bar::-webkit-scrollbar {
  display: none;
}

.menu-bar .mode {
  border-radius: 6px;
  background-color: var(--primary-color-light);
  position: relative;
  transition: all 0.3s ease;
}

.menu-bar .mode .sun-moon {
  height: 50px;
  width: 60px;
}

.mode .sun-moon i {
  position: absolute;
}

.mode .sun-moon i.sun {
  opacity: 0;
}

.toggle-switch {
  position: absolute;
  right: 0;
  height: 100%;
  min-width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  cursor: pointer;
}

.switch {
  position: relative;
  height: 22px;
  width: 40px;
  border-radius: 25px;
  background-color: var(--toggle-color);
  transition: all 0.3s ease;
}

.switch::before {
  content: '';
  position: absolute;
  height: 15px;
  width: 15px;
  border-radius: 50%;
  top: 50%;
  left: 5px;
  transform: translateY(-50%);
  background-color: var(--shell-color);
  transition: all 0.3s ease;
}

.dark .shell li a:hover .icon,
.dark .shell li a:hover .text {
  color: #ccc;
}

.dark .mode .sun-moon i.sun {
  opacity: 1;
}

.dark .mode .sun-moon i.moon {
  opacity: 0;
}

.dark .switch::before {
  left: 20px;
}
</style>