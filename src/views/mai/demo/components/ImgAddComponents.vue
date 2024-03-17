<template>
    <div>
        <a-button danger @click="visible = true">添加套图</a-button>
        <a-button danger @click="handleStop" style="margin-left: 10px">停止添加</a-button>
        <a-modal v-model:open="visible" title="添加套图" ok-text="添加" cancel-text="" @ok="onOk" style="text-align: center;">
            <a-spin tip="Loading..." :spinning="spinning">
                <a-form ref="formRef" :model="formState" layout="vertical" name="form_in_modal">
                    <a-form-item name="type" label="图片分类" :rules="[{ required: true, message: '请选择类型' }]">
                      <a-radio-group v-model:value="formState.type" name="radioGroup">
                        <a-radio value="1" disabled>壁纸</a-radio>
                        <a-radio value="2">套图</a-radio>
                      </a-radio-group>
                    </a-form-item>
                    <a-form-item name="picType" label="图片类型" :rules="[{ required: true, message: '请选择图片类型' }]">
                      <ImgAddTreeComponents v-model:value="formState.picType"/>
                    </a-form-item>
                    <a-form-item name="pageNum" label="页数" :rules="[{ required: true, message: '请输入pageNum（页数）' }]">
                        <a-input v-model:value="formState.pageNum" />
                    </a-form-item>
                    <a-form-item name="delay" label="延时时间" :rules="[{ required: true, message: '请输入延时时间' }]">
                        <a-input v-model:value="formState.delay" />
                    </a-form-item>
                </a-form>
            </a-spin>
        </a-modal>
    </div>
</template>
<script lang="ts" setup>
import { reactive, ref, toRaw } from 'vue';
import { FormInstance, message } from 'ant-design-vue';
import {autoAdd, stop} from "@/api/mai";
import ImgAddTreeComponents from "@/views/mai/demo/components/ImgAddTreeComponents.vue";
const value = ref<string>('2');
interface Values {
  type: number;
  picType: number;
  pageNum: number;
  delay: number;
}

const formRef = ref<FormInstance>();
const visible = ref(false);
const formState = reactive<Values>({
  type: 0,
  picType: 0,
  pageNum: 0,
  delay: 0,
});

//默认false
const spinning = ref(false);

const handleStop = async () => {
  console.log("dddddddddd")
  const res = await stop();
  message.success(res.data.data);
}
const onOk = () => {
    formRef.value.validateFields().then(values => {
        spinning.value = true;
        autoAdd(values).then(res => {
            spinning.value = false;
            if (res.data.code === 200) {
                visible.value = false;
                formRef.value.resetFields();
                message.success(res.data.message);
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
  