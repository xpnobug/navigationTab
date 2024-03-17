<template>
    <!-- <a-space direction="vertical" style="width: 100%">
        <a-alert message="需求提示！！！" type="info" show-icon>
            <template #icon><smile-outlined /></template>
            <template #description>
                <div>
                    <p>当前页展示学习笔记</p>
                    <p>1. 后续实现富文本上传及页面展示预览。</p>
                    <p>2. 后续页面优化。</p>
                </div>
            </template>
        </a-alert>
    </a-space> -->
    <FileAddComponents></FileAddComponents>
    <a-collapse v-model:activeKey="activeKey" accordion ghost @change="handleCollapseChange">
        <a-collapse-panel v-for="a in treeData" :key="a.key" :header="a.title">
            <a-collapse ghost v-for="b in a.children" @change="handleCollapseChange">
                <a-collapse-panel :key="b.key" :header="b.title">
                    <Projects :keyId="b.key"></Projects>
                </a-collapse-panel>
            </a-collapse>
        </a-collapse-panel>

        <!-- <a-collapse-panel key="4" header="数据库" collapsible="disabled">
            <p>{{ text }}</p>
        </a-collapse-panel>

        <a-collapse-panel key="5" header="13.框架" collapsible="disabled">
            <p>{{ text }}</p>
        </a-collapse-panel> -->
    </a-collapse>
</template>
<script lang="ts" setup>
import { getBlogFlList } from '@/api/blog'
import { createFromIconfontCN, SmileOutlined } from '@ant-design/icons-vue';
import Projects from '@/views/blog/Projects.vue';
import { ref, watch, onMounted } from 'vue';
import FileAddComponents from './FileAddComponents.vue';
const text = `A dog  .`;
const activeKey = ref(['1']);
const treeData = ref();
onMounted(() => {
    getBlogFlList()
        .then(res => {
            //   initLoading.value = false;
            treeData.value = res.data;
        });
});

const handleCollapseChange = (keys) => {
    console.log("Active Keys:", keys);
};

watch(activeKey, val => {
    // console.log(val);
});
</script>
  
  