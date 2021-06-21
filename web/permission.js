import Vue from 'vue'
import {
  Message
} from 'element-ui'

import router from './router'
import getPageTitle from '@/script/lib/get-page-title'

router.beforeEach(async (to, from, next) => {
  document.title = getPageTitle(to.meta.title);
  next();
});