import router from './router';
import getPageTitle from '@/script/lib/get-page-title';
import { setCurrentMenuRoute } from '@/script/lib/sessionStorage';

router.beforeEach(async (to, from, next) => {
  setCurrentMenuRoute(to.fullPath);
  document.title = getPageTitle(to.meta.title);
  next();
});