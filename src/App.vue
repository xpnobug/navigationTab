<script setup>
 
</script>

<template>
    <RouterView />
</template>

<style>
/* 设置全局变量 */
:root {
  --body-color: #E4E9F7;
  --shell-color: #FFF;
  --primary-color: #695CFE;
  --primary-color-light: #F6F5FF;
  --toggle-color: #DDD;
  --text-color: #707070;
}

/* 深色主题变量 */
.dark {
  --body-color: #202224;
  --shell-color: #171717;
  --primary-color: #3a3b3c;
  --primary-color-light: #3a3b3c;
  --toggle-color: #fff;
  --text-color: #ccc;
}

</style>
