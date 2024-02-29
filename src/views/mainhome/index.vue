<template>


  <div class="container" id="container" style="display: none">
    <div class="column" style="--column: 0">
      <a href="/#/admin" target="_blank"><div class="hexagon" style="--index: 1; --icon: '🚀';"></div></a>
      <div class="hexagon" style="--index: 2; --icon: '🎸';"></div>
      <div class="hexagon" style="--index: 3; --icon: '🤖';"></div>
      <div class="hexagon" style="--index: 4; --icon: '🫶';"></div>
      <div class="hexagon" style="--index: 5; --icon: '🔥';"></div>
    </div>
    <div class="column" style="--column: 1">
      <div class="hexagon" style="--index: 1; --icon: '🕹️';"></div>
      <div class="hexagon" style="--index: 2; --icon: '👾';"></div>
      <div class="hexagon" style="--index: 3; --icon: '✨';"></div>
      <div class="hexagon" style="--index: 4; --icon: '🌴';"></div>
      <div class="hexagon" style="--index: 5; --icon: '🖥️';"></div>
      <div class="hexagon" style="--index: 6; --icon: '💻';"></div>
    </div>
    <div class="column" style="--column: 2">
      <div class="hexagon" style="--index: 1; --icon: '⌨️';"></div>
      <div class="hexagon" style="--index: 2; --icon: '💡';"></div>
      <div class="hexagon" style="--index: 3; --icon: '🕶️';"></div>
      <div class="hexagon" style="--index: 4; --icon: '⚙️';"></div>
      <div class="hexagon" style="--index: 5; --icon: '🍒';"></div>
      <div class="hexagon" style="--index: 6; --icon: '🧙‍♂️';"></div>
      <div class="hexagon" style="--index: 7; --icon: '🎮';"></div>
    </div>
    <div class="column" style="--column: 3">
      <div class="hexagon" style="--index: 1; --icon: '👽';"></div>
      <div class="hexagon" style="--index: 2; --icon: '🌌';"></div>
      <div class="hexagon" style="--index: 3; --icon: '🎧';"></div>
      <div class="hexagon" style="--index: 4; --icon: '🌒';"></div>
      <div class="hexagon" style="--index: 5; --icon: '🌓';"></div>
      <div class="hexagon" style="--index: 6; --icon: '🌔';"></div>
      <div class="hexagon" style="--index: 7; --icon: '🎵';"></div>
      <div class="hexagon" style="--index: 8; --icon: '🎶';"></div>
    </div>
    <div class="column" style="--column: 4">
      <div class="hexagon" style="--index: 1; --icon: '❤️';"></div>
      <div class="hexagon" style="--index: 2; --icon: '🎙️';"></div>
      <div class="hexagon" style="--index: 3; --icon: '📸';"></div>
      <div class="hexagon" style="--index: 4; --icon: '🕰️';"></div>
      <div class="hexagon" style="--index: 5; --icon: '🚀';"></div>
      <div class="hexagon" style="--index: 6; --icon: '🎸';"></div>
      <div class="hexagon" style="--index: 7; --icon: '🤖';"></div>
      <div class="hexagon" style="--index: 8; --icon: '🫶';"></div>
      <div class="hexagon" style="--index: 9; --icon: '🔥';"></div>
    </div>
    <div class="column" style="--column: 5">
      <div class="hexagon" style="--index: 1; --icon: '🕹️';"></div>
      <div class="hexagon" style="--index: 2; --icon: '👾';"></div>
      <div class="hexagon" style="--index: 3; --icon: '✨';"></div>
      <div class="hexagon" style="--index: 4; --icon: '🌴';"></div>
      <div class="hexagon" style="--index: 5; --icon: '🖥️';"></div>
      <div class="hexagon" style="--index: 6; --icon: '💻';"></div>
      <div class="hexagon" style="--index: 7; --icon: '⌨️';"></div>
      <div class="hexagon" style="--index: 8; --icon: '💡';"></div>
    </div>
    <div class="column" style="--column: 6">
      <div class="hexagon" style="--index: 1; --icon: '🕶️';"></div>
      <div class="hexagon" style="--index: 2; --icon: '⚙️';"></div>
      <div class="hexagon" style="--index: 3; --icon: '🍒';"></div>
      <div class="hexagon" style="--index: 4; --icon: '🦄';"></div>
      <div class="hexagon" style="--index: 5; --icon: '📱';"></div>
      <div class="hexagon" style="--index: 6; --icon: '🖨️';"></div>
      <div class="hexagon" style="--index: 7; --icon: '📡';"></div>
    </div>
    <div class="column" style="--column: 7">
      <div class="hexagon" style="--index: 1; --icon: '🔬';"></div>
      <div class="hexagon" style="--index: 2; --icon: '🔭';"></div>
      <div class="hexagon" style="--index: 3; --icon: '🎚️';"></div>
      <div class="hexagon" style="--index: 4; --icon: '🎛️';"></div>
      <div class="hexagon" style="--index: 5; --icon: '🧬';"></div>
      <div class="hexagon" style="--index: 6; --icon: '🔮';"></div>
    </div>
    <div class="column" style="--column: 8">
      <div class="hexagon" style="--index: 1; --icon: '🧲';"></div>
      <div class="hexagon" style="--index: 2; --icon: '🛸';"></div>
      <div class="hexagon" style="--index: 3; --icon: '🪐';"></div>
      <div class="hexagon" style="--index: 4; --icon: '🌠';"></div>
      <div class="hexagon" style="--index: 5; --icon: '👓';"></div>
    </div>
  </div>
  <div class="switch" id="switch"></div>

</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
// 动态创建样式表链接元素
const css = document.createElement('link');
css.rel = 'stylesheet';
css.href = './css/style.css'; // 根据实际路径调整
document.head.appendChild(css);

const linkElement = document.createElement('link');
linkElement.rel = 'stylesheet';
linkElement.href = 'https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css'; // 根据实际路径调整
document.head.appendChild(linkElement);

const js = document.createElement('script');
js.src = './js/script.js'; // Adjust the path accordingly
document.head.appendChild(js);

// 创建 ref 来存储背景图片 URL
const backgroundUrl = ref('');

// 当组件挂载后执行的操作
onMounted(() => {
  // 设置背景图片的 URL
  const newBackgroundUrl = 'https://api.xingzhige.com/API/Bing_img/';
  // 更新背景图片 URL 的 ref 值
  backgroundUrl.value = newBackgroundUrl;

  // 创建一个 style 元素
  const style = document.createElement('style');
  // 添加样式内容
  style.innerHTML = `
    body:before {
      content: "";
      position: absolute;
      inset: 0;
      pointer-events: none;
      background: radial-gradient(at center, transparent 80%, black), linear-gradient(to top, rgba(0, 0, 0, 0.3) 70%, transparent), url(${backgroundUrl.value}) no-repeat 45% center/cover;
      opacity: 0;
      filter: blur(0.5rem);
      transition: opacity 0.6s ease-in-out, filter 0.6s ease-in-out;
    }
  `;
  // 将 style 元素添加到 head 中
  document.head.appendChild(style);
});
</script>

<style scoped>


</style>