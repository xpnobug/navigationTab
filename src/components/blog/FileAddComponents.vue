<template>
    <div>
        <a-button type="primary" @click="visible = true">同步文章</a-button>
        <a-modal v-model:open="visible" title="同步文章" ok-text="同步" cancel-text="" @ok="onOk" style="text-align: center;">
            <a-spin tip="Loading..." :spinning="spinning">
                <a-form ref="formRef" :model="formState" layout="vertical" name="form_in_modal">
                    <a-form-item name="type" label="文章分类" :rules="[{ required: true, message: '请选择文章类型' }]">
                        <FileAddTreeComponents v-model:value="formState.type"></FileAddTreeComponents>
                    </a-form-item>
                    <a-form-item name="repoName" label="repoName" :rules="[{ required: true, message: '请输入github用户名' }]">
                        <a-input v-model:value="formState.repoName" />
                    </a-form-item>
                    <a-form-item name="token" label="token" :rules="[{ required: true, message: '请输入token' }]">
                        <a-input v-model:value="formState.token" />
                    </a-form-item>
                    <a-form-item name="filePath" label="filePath" :rules="[{ required: true, message: '请输入文件位置' }]">
                        <a-input v-model:value="formState.filePath" />
                    </a-form-item>

                </a-form>
            </a-spin>
        </a-modal>
    </div>
</template>
<script lang="ts" setup>
import FileAddTreeComponents from './FlieAddTreeComponents.vue';
import { reactive, ref, toRaw } from 'vue';
import { FormInstance, message } from 'ant-design-vue';
import { getPostList, syncAdd } from '@/api/blog';
interface Values {
    repoName: string;
    token: string;
    filePath: string;
    type: string;
}

const formRef = ref<FormInstance>();
const visible = ref(false);
const formState = reactive<Values>({
    repoName: '',
    token: '',
    filePath: '',
    type: '',
});

//默认false
const spinning = ref(false);

const onOk = () => {
    formRef.value.validateFields().then(values => {
        spinning.value = true;
        syncAdd(values).then(res => {
            spinning.value = false;
            if (res.code === 200) {
                visible.value = false;
                formRef.value.resetFields();
                getPostList(values.type)
                message.success(res.data.message);
            } else {
                message.error(res.data.message);
            }
        }).catch(error => {
            spinning.value = false;
        });
    });
};



</script>
<style scoped>
.collection-create-form_last-form-item {
    margin-bottom: 0;
}
</style>
  