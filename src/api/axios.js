// axios.js

import axios from 'axios';
import { message } from 'ant-design-vue';

// 创建一个Axios实例
const instance = axios.create({
  baseURL: "/api", // 根据实际情况设置基础URL
  timeout: 90000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json', // 设置请求头
  },
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    // 可以在这里添加token等全局配置
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 对响应数据做些什么
    // console.log(response);
    return response;
  },      
  (error) => {
    // 对响应错误做些什么
    if (error.response) {
      // 请求已发出，但服务器返回状态码不在 2xx 范围
      // console.error('Error status', error.response.status);
      // console.error('Error data', error.response.data);
      // console.error('Error headers', error.response.headers);

      // 根据状态码执行不同的操作
      switch (error.response.status) {
        case 400:
          message.error('请求错误：Bad Request');
          break;
        case 401:
          message.error('请求错误：Unauthorized');
          break;
        case 403:
          message.error('请求错误：Forbidden');
          break;
        case 404:
          message.error('请求错误：Not Found');
          break;
        case 500:
          message.error(`${error.response.data.message}` );
        default:
      }
    } else if (error.request) {
      // 请求已发出，但没有收到响应
      console.error('No response received');
      message.error('网络请求超时');
    } else {
      // 发生了错误，触发了一个错误
      console.error('Error message', error.message);
      message.error(`请求失败：${error.message}`);
    }
    
    // 你可以选择返回一个错误对象，也可以返回 Promise.reject(error) 来终止请求链
    // return Promise.reject(error);
    return Promise.resolve(); // 返回一个 resolved 状态的 Promise，以终止请求链
  }
);

export default instance;
