import axios from "axios";

// 创建Axios实例
const apiClient = axios.create({
  baseURL: "", // 设置API的基础URL
  timeout: 5000, // 设置请求超时时间
});

// 添加请求拦截器
apiClient.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么，比如添加请求头
    config.headers.Authorization = "Bearer " + localStorage.getItem("token");
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
      // 对响应数据做点什么
      return response.data;
    },
    (error) => {
      if (error.response.status == 401 || error.response.status == 500) {
        return error.response.data;
      }
      // 对响应错误做点什么
      return Promise.reject(error);
    }
  );
} catch (error) {}

// 导出Axios实例
export default apiClient;
