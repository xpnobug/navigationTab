<!-- 常用站点--我的 -->
<template>
    <a-space direction="vertical" style="width: 100%">
        <a-alert message="需求提示！！！" type="info" show-icon>
            <template #icon><smile-outlined /></template>
            <template #description>
                <div>
                    <p>当前页展示常用的各大平台地址，个人博客等链接</p>
                    <p>1. 后续实现链接分类，例如：博客，阅读，音乐，实用工具等网址链接。</p>
                    <p>2. 主要功能实现基础CRUD操作，添加常用站点到起始页。</p>
                    <p>3. 后续页面优化。</p>
                </div>
            </template>
        </a-alert>
    </a-space>
    <div class="flex">
        <a-card hoverable style="margin:20px; width:312px;" v-for="i in 100">
            <!-- <template #cover>
                <img alt="example" src="" />
            </template> -->
            <template #actions>
                <setting-outlined key="setting" />
                <edit-outlined key="edit" />
                <ellipsis-outlined key="ellipsis" />
            </template>
            <a href="https://blog.reaicc.com">
                <a-card-meta title="REAI">
                    <template #description>
                        <a-tooltip title="热爱漫无边际，生活自有分寸！！！" color="#2db7f5">
                            <div class="ant-card-meta-description">热爱漫无边际，生活自有分寸！！！</div>
                        </a-tooltip>
                    </template>
                    <template #avatar>
                        <a-avatar src="https://q1.qlogo.cn/g?b=qq&nk=2877406366&s=640" />
                    </template>
                </a-card-meta>
            </a>
        </a-card>

        <a-card hoverable style="width:312px; margin:20px;">
            <!-- <template #cover>
                <img alt="example" src="" />
            </template> -->
            <template #actions>
                <setting-outlined key="setting" />
                <edit-outlined key="edit" />
                <ellipsis-outlined key="ellipsis" />
            </template>
            <a href="https://blog.zhheo.com/">
                <a-card-meta title="张洪Heo" description="分享设计与科技生活">
                    <template #avatar>
                        <a-avatar src="https://img.zhheo.com/i/2022/08/19/62ff32fa28da1.png" />
                    </template>
                </a-card-meta>
            </a>
        </a-card>
    </div>
</template>
<script lang="ts" setup>
import { SmileOutlined, SettingOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons-vue';

</script>
<style scoped>
.flex {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: auto;
    /* display: flex;
    flex-wrap: wrap;
    justify-content: space-between;  */
}

/* 响应式布局 */
@media (max-width: 1600px) {
    .flex {
        grid-template-columns: repeat(3, 1fr); /* 当窗口宽度小于 1200px 时，切换到 3 列布局 */
    }
}
@media (max-width: 1200px) {
    .flex {
        grid-template-columns: repeat(2, 1fr); /* 当窗口宽度小于 1200px 时，切换到 3 列布局 */
    }
}

@media (max-width: 768px) {
    .flex {
        grid-template-columns: repeat(1, 1fr); /* 当窗口宽度小于 768px 时，切换到 2 列布局 */
    }
}

@media (max-width: 480px) {
    .flex {
        grid-template-columns: 1fr; /* 当窗口宽度小于 480px 时，切换到 1 列布局 */
    }
}


/* 响应式布局 */
/* 当窗口宽度小于 1200px 时，为每个项目分配 33.33% 的宽度 */
 /* 当窗口宽度小于 768px 时，为每个项目分配 50% 的宽度 */
/* @media (max-width: 1200px) {
    .flex {
        
        flex: 1 0 calc(33.33% - 20px);  
    }
}

@media (max-width: 768px) {
    .flex {
        flex: 1 0 calc(50% - 20px);
    }
} */

.ant-card-meta-description {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
}
</style>