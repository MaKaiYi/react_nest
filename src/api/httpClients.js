import axios from 'axios';
import { Modal } from 'antd';
// 创建Axios实例
const apiClient = axios.create({
  baseURL: '', // 设置API的基础URL
  timeout: 5000, // 设置请求超时时间
});

const reload = () => {
  Modal.error({
    title: '提示',
    content: '当前登录已失效，请重新登录',
    onOk: () => {
      window.location.href = '/subdir/login';
    },
  });
};
// 添加请求拦截器
apiClient.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么，比如添加请求头
    config.headers.Authorization = 'Bearer ' + localStorage.getItem('token');

    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
try {
  apiClient.interceptors.response.use(
    (response) => {
      if (response.data) return response.data;
      return { data: null, success: false, message: '未知错误' };
    },
    (error) => {
      if (error.response.status == 401) {
        reload();
        // 返回一个默认的对象结构来防止解构错误
        return error.response.data;
      }
      // 对响应错误做点什么
      return Promise.reject(error);
    }
  );
} catch (error) {}

// 导出Axios实例
export default apiClient;
