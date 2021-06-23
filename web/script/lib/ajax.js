import axios from 'axios'
import {
  MessageBox,
  Message
} from 'element-ui'
import defaultSettings from '@/settings'
import router from '@/router'

const ajax = axios.create({
  baseURL: defaultSettings[process.env.NODE_ENV].baseURL,
});

//请求拦截器
ajax.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

//响应拦截器
ajax.interceptors.response.use(
  async (response) => {
      const res = response.data;
      if (res.status !== 0) {
        Message({
          message: res.errmsg || 'Error',
          type: 'error',
          duration: 5 * 1000
        });
        return Promise.reject(new Error(res.errmsg || 'Error'));
      } else {
        return res.data;
      }
    },
    error => {
      Message({
        message: error.errmsg,
        type: 'error',
        duration: 5 * 1000
      });
      return Promise.reject(error);
    }
);

export const upload = axios.create({
  timeout: 10000,
  baseURL: defaultSettings[process.env.NODE_ENV].baseURL,
  headers: {
    'Content-Type': `multipart/form-data;`,
    'X-Requested-With': 'XMLHttpRequest;'
  }
});

function arrToFormData(arr) {
  let data = [];
  arr.forEach((item, index) => {
    if (item.constructor === Array) {
      arrToFormData(item).forEach(cItem => {
        data.push({
          key: `[${index}]${cItem.key}`,
          value: cItem.value
        });
      });
    } else if (item.constructor === Object) {
      objToFormData(item).forEach(cItem => {
        data.push({
          key: `[${index}]${cItem.key}`,
          value: cItem.value
        });
      });
    } else {
      data.push({
        key: `[${index}]`,
        value: item
      });
    }
  });
  return data;
}

function objToFormData(obj) {
  let data = [];
  Object.keys(obj).forEach(key => {
    if (obj[key].constructor === Array) {
      arrToFormData(obj[key]).forEach(item => {
        data.push({
          key: `[${key}]${item.key}`,
          value: item.value
        });
      });
    } else if (obj[key].constructor === Object) {
      objToFormData(obj[key]).forEach(item => {
        data.push({
          key: `[${key}]${item.key}`,
          value: item.value
        });
      });
    } else {
      data.push({
        key: `[${key}]`,
        value: obj[key]
      });
    }
  });
  return data;
}

//Upload请求拦截器
upload.interceptors.request.use(
  config => {
    if (config.data && config.data.constructor !== FormData) {
      let formData = new FormData();
      Object.keys(config.data).forEach(key => {
        let value = config.data[key];
        if (value.constructor === Array) {
          arrToFormData(value).forEach(r => {
            formData.append(`${key}${r.key}`, r.value);
          });
        } else if (value.constructor === Object) {
          objToFormData(value).forEach(r => {
            formData.append(`${key}${r.key}`, r.value);
          });
        } else {
          formData.append(key, value);
        }
      });
      config.data = formData;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

//响应拦截器
upload.interceptors.response.use(
  async (response) => {
      const res = response.data;
      if (res.status !== 0) {
        Message({
          message: res.errmsg || 'Error',
          type: 'error',
          duration: 5 * 1000
        });
        return Promise.reject(new Error(res.errmsg || 'Error'));
      } else {
        return res.data;
      }
    },
    error => {
      Message({
        message: error.errmsg,
        type: 'error',
        duration: 5 * 1000
      });
      return Promise.reject(error);
    }
);

export default ajax