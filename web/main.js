import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import Vue from 'vue'
import VueHighlightJS from 'vue-highlightjs'
import hljs from 'highlight.js'

import 'highlight.js/styles/vs2015.css'
import 'element-ui/lib/theme-chalk/index.css'

import post from '@/script/lib/post-sdk'
import upload from '@/script/lib/upload'
import loading from '@/script/uc/loading'
import toast from '@/script/uc/toast'

import App from './App'
import store from './store'
import router from './router'

import '@/css/index.scss'
import '@/css/icon/iconfont.css'
import '@/permission'
import '@/script/filter'

Vue.use(VueHighlightJS);
Vue.use(loading);
Vue.use(ElementUI, {
  locale
});

Vue.config.productionTip = false;
Vue.prototype.$eventBus = new Vue();
Vue.prototype.$post = post;
Vue.prototype.$upload = upload;
Vue.prototype.$toast = toast;
Vue.prototype.$hljs = hljs;
Vue.prototype.$copy = copy;
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
});


//去除浏览器自带的弹出框的域名提示
window.prompt = function (message) {
  var iframe = document.createElement('IFRAME');
  iframe.style.display = 'none';
  iframe.setAttribute('src', 'data:text/plain,');
  document.documentElement.appendChild(iframe);
  var alertFrame = window.frames[0];
  var result = alertFrame.window.prompt(message);
  iframe.parentNode.removeChild(iframe);
  return result;
};

window.confirm = function (message) {
  var iframe = document.createElement('IFRAME');
  iframe.style.display = 'none';
  iframe.setAttribute('src', 'data:text/plain,');
  document.documentElement.appendChild(iframe);
  var alertFrame = window.frames[0];
  var result = alertFrame.window.confirm(message);
  iframe.parentNode.removeChild(iframe);
  return result;
};

window.alert = function (name) {
  var iframe = document.createElement("IFRAME");
  iframe.style.display = "none";
  iframe.setAttribute("src", 'data:text/plain,');
  document.documentElement.appendChild(iframe);
  window.frames[0].window.alert(name);
  iframe.parentNode.removeChild(iframe);
};

function copy(value) {
  var input = document.createElement('input');
  input.setAttribute('readonly', 'readonly');
  input.value = value;
  document.body.appendChild(input);
  input.select();
  document.execCommand('copy');
  input.style.display = 'none';
  input.remove();
}