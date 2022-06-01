//使用类来封装axios，封装性更强
//此时只有这一个文件对于axios有依赖，可将axios替换成其他
import axios from "axios";
import type { AxiosInstance } from "axios";
import type { MYRequestInterceptors, MYRequestConfig } from "./type";

//Loading
import { message } from "antd";
//设置默认loading常量值
const DEFAULT_LOADING = false;

class MYRequest {
  //保存axios实例
  instance: AxiosInstance;
  //保存拦截器
  interceptors?: MYRequestInterceptors;
  //是否显示loading
  showLoading?: boolean;

  // 通过构造器,根据传入不同的config配置，创建不同的实例，保存在instance中
  constructor(config: MYRequestConfig) {
    //创建axios实例
    this.instance = axios.create(config);
    //保存基本信息
    this.interceptors = config.interceptors;
    //保存传入showLoading，若没传为默认值
    this.showLoading = config.showLoading ?? DEFAULT_LOADING;

    // 通过axios里面的use来使用拦截器，拦截器本质是一个函数，可以被执行，可以把拦截器抽取成单独的hooks分离出去
    // 这里的拦截器是每个实例自己的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );

    // 添加所有的实例都有的拦截器（全局拦截器）
    this.instance.interceptors.request.use(
      (config) => {
        //请求开始，根据showLoading判断是否开启loading
        if (this.showLoading) {
          message.loading({
            key: "loading",
            content: "加载中",
            duration: 0,
          });
        }
        return config;
      },
      (err) => {
        return err;
      }
    );
    this.instance.interceptors.response.use(
      (res) => {
        //请求结束，关闭全局loading
        message.destroy("loading");

        // console.log(res.data);
        return res.data;
      },
      (err) => {
        //请求结束，关闭全局loading(请求失败也要关闭loading)
        message.destroy("loading");

        //对错误进行全局拦截判断，可利用switch
        if (err.response.status === 404) {
          console.log("404 Not Found ...");
        }
        // ...
        return err;
      }
    );
  }

  // 自己类里面封装的request
  request<T>(config: MYRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      //1.单个请求对数据的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }

      //2.根据传入的showLoading判断是否显示loading
      if (config.showLoading === !DEFAULT_LOADING) {
        this.showLoading = config.showLoading;
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          //1.每次响应自己单独的拦截器,这里可不必拦截错误
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }
          //2.每次请求结束将showLoading改为默认值，避免不同请求之间不同showLoading值的干扰
          this.showLoading = DEFAULT_LOADING;
          //3.将请求结果resolve出去
          resolve(res);
        })
        .catch((err) => {
          //请求错误也要修改showLoading默认值为false
          this.showLoading = DEFAULT_LOADING;
          reject(err);
          // return err;
        });
    });
  }

  //封装自己类里面的不同请求方式
  get<T>(config: MYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "GET" });
  }
  post<T>(config: MYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "POST" });
  }
  delete<T>(config: MYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "DELETE" });
  }
  patch<T>(config: MYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "PATCH" });
  }
  put<T>(config: MYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "PUT" });
  }
  //按需添加请求方法 ...
}

export default MYRequest;
