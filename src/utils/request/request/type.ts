import type { AxiosRequestConfig, AxiosResponse } from 'axios';

//自定义拦截器接口,可选，可传可不传
export interface MYRequestInterceptors<T = AxiosResponse> {
  //请求拦截：拦截器本质为一个可执行函数，所以有返回类型
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (error: any) => any;
  //响应拦截：拦截器本质为一个可执行函数，所以有返回类型
  // responseInterceptor?: (config: AxiosResponse) => AxiosResponse;
  responseInterceptor?: (config: T) => T;
  responseInterceptorCatch?: (error: any) => any;
}

//自定义接口，继承自AxiosRequestConfig,这样自定义的接口类型就拥有了AxiosRequestConfig的属性,也就是对原来AxiosRequestConfig的扩展
export interface MYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  //扩展拦截器属性,可选
  interceptors?: MYRequestInterceptors<T>;
  //是否展示loading
  showLoading?: boolean;
}
