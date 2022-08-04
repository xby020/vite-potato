import axios from 'axios';
import type { AxiosRequestConfig, AxiosInstance } from 'axios';
import { merge, get } from 'lodash';

interface CustomResponse<T = any> {
  code: number;
  msg: string;
  data: T;
}

/**
 * @description 创建请求实例
 */
function createService<T = any>(): AxiosInstance {
  const service = axios.create();
  // 请求拦截
  service.interceptors.request.use(
    (config) => config,
    (error) => {
      // 发送失败
      console.log(error);
      return Promise.reject(error);
    }
  );
  // 响应拦截
  service.interceptors.response.use(
    (response): CustomResponse<T> => {
      // 判断response结构
      const { data: resData } = response;
      if (resData.code) {
        // code存在，标准结构
        // TODO:全局非200状态码处理
        // if (resData.code !== 200) {
        //   window.$message.error(resData.msg);
        //   throw resData;
        // }
        return resData;
      } else {
        // code不存在，可能是第三方接口，直接返回结果
        return {
          code: 200,
          msg: 'success',
          data: resData
        };
      }
    },
    (error) => {
      // 响应错误
      throw error;
    }
  );
  return service;
}

/**
 * @description 创建请求方法
 * @param {Object} service axios 实例
 */
function createRequest(service: AxiosInstance) {
  return async function <T = any>(config: AxiosRequestConfig): Promise<T> {
    const configDefault = {
      headers: {
        'Content-Type': get(config, 'headers.Content-Type', 'application/json')
      },
      baseURL: import.meta.env.VITE_API_URL,
      timeout: 5000,
      data: {}
    };

    const option: AxiosRequestConfig = merge(configDefault, config);
    try {
      const response = await service(option);
      const data: T = response.data;
      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
}

// 用于真实网络请求的实例和请求方法
export const service = createService();
export const request = createRequest(service);
