import Axios from "axios";
import axios_config from "./axios_config";
import {ElMessage} from 'element-plus'
import {CONSTANTS} from "../common/constants.js";

const axios = Axios.create(axios_config);

// 请求拦截器
axios.interceptors.request.use(
  function(config) {
      let token_info = localStorage.getItem(CONSTANTS.STORAGE_TOKEN);
      if (token_info && config.url.indexOf('/api/refreshToken') < 0) {
          token_info = JSON.parse(token_info);
          config.headers["Authorization"] = "Bearer " + token_info.accessToken;
      }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

// 响应拦截器
axios.interceptors.response.use(
    async (response) => {
      if (response.status === 200) {
          if (response.data.code === 403) {
              ElMessage.error(response.data.msg)
              return Promise.reject(new Error(response.data.msg));
          }
          if (response.data.code === 500) {
              ElMessage.error(response.data.msg)
              return Promise.reject(new Error(response.data.msg));
          }
          return response.data;
      } else {
          ElMessage.error('系统异常,请联系管理员')
          return Promise.reject(new Error('系统异常,请联系管理员'));
      }
  },
  function(error) {
      if (error.response && error.response.status === 403) {
          ElMessage.error(error.response.data.msg)
      }
      ElMessage.error('系统异常,请联系管理员')
      return Promise.reject(error);
  }
);

export default axios;
