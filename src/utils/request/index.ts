import MYRequest from "./request";
import { BASE_URL, TIME_OUT } from "./request/config";

// new了一个MYRequest的对象，并且导出
// 可创建多个对象，生成多个实例，用于url不同的网络请求
const myRequest = new MYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    //请求成功的拦截
    requestInterceptor: (config: any) => {
      return config;
    },
    //请求失败的拦截
    requestInterceptorCatch: (err) => {
      return err;
    },
    //响应成功的拦截
    responseInterceptor: (res) => {
      return res;
    },
    //响应失败的拦截
    responseInterceptorCatch: (err) => {
      return err;
    },
  },
});

export default myRequest;
