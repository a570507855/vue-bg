import Layout from '@/components/Layout'
import router from '@/router'
import get from '@/script/lib/get-sdk'
import store from '@/store'

let value = 0;

function getGroupAndMaxValue(menus, value = 0) {
  return menus.reduce((meno, item) => {
    meno.maxValue = Math.max(meno.maxValue, item.value);
    meno.group[item.value] = item;
    if (item.children && item.children.length)
      meno.group = Object.assign({}, meno.group, getGroupAndMaxValue(item.children).group);

    return meno;
  }, {
    maxValue: value,
    group: {}
  });
};

function getMenuChildren(child) {
  return child.reduce((meno, item) => {
    let urlArr = item.route.split('?');
    let url = urlArr[0];
    let query = urlArr.length !== 1 ? urlArr[1] : '';
    let childMenu = {
      path: url,
      meta: {
        title: item.name,
        icon: ''
      },
      query: `?${query}`
    };
    if (item.route)
      childMenu.component = process.env.NODE_ENV === 'development' ? resolve => require([`@/views${url}`], resolve) : () => import(`@/views${url}`);

    if (item.children && item.children.length)
      childMenu.children = getMenuChildren(item.children);

    meno.push(childMenu);
    return meno;
  }, []);
};

function getMenus(menus) {
  if (!menus || !menus.length)
    return [];

  return menus.reduce((meno, item) => {
    let copyRoute = {
      path: `/${item.name}`,
      component: Layout,
      meta: {
        title: item.name,
        icon: ''
      }
    };
    if (item.children && item.children.length)
      copyRoute.children = getMenuChildren(item.children);

    meno.push(copyRoute);
    return meno;
  }, []);
};

function setAsyncRoutes(menus) {
  let asyncRoutes = getMenus(menus);
  store.dispatch('permission/generateRoutes', {
    routes: asyncRoutes,
    roles: ['admin']
  });
  router.addRoutes(asyncRoutes);
};

function sortMenu(menus, parent, level) {
  if (!parent)
    value = 0;

  let len = menus.length;
  for (let i = 0; i < len; ++i) {
    menus[i].parent = parent;
    menus[i].level = level;
    menus[i].value = ++value;

    if (!menus[i].route)
      menus[i].route = '';

    if (i === 0) {
      menus[i].isFirst = true;
      menus[i].isLast = false;
    } else if (i === len - 1) {
      menus[i].isFirst = false;
      menus[i].isLast = true;
    } else {
      menus[i].isFirst = false;
      menus[i].isLast = false;
    }
    if (len === 1) {
      menus[i].isFirst = true;
      menus[i].isLast = true;
    }
    if (menus[i].children && menus[i].children.length) {
      sortMenu(menus[i].children, menus[i].value, menus[i].level + 1);
    }
  }
};

export default {
  menus: [],
  group: {},
  maxValue: 0,
  async getMenuTree() {
    //this.menus = await get('/menu/get');
    this.menus = [{
      name: '运营中心',
      children: [{
        name: '用户管理',
        children: [{
          name: '全部用户',
          route: '/bg-account/user'
        }, ]
      }, {
        name: '内容管理',
        children: [{
            name: '表态',
            route: '/content-manage/statement'
          },
          {
            name: '评论',
            route: '/content-manage/statement-comment-menu'
          }
        ]
      }, {
        name: '活动中心',
        children: [{
            name: '签到活动',
            route: '/activity-center/sign-in'
          },
          {
            name: '红包兑奖',
            route: '/activity-center/cash_config'
          }
        ]
      }, {
        name: '推广管理',
        children: [{
          name: '校园大使',
          route: '/popularize/campus-ambassador'
        }, {
          name: '用户审核',
          route: '/popularize/user-review'
        }]
      }],
    }, {
      name: '系统管理',
      children: [{
        name: '账号管理',
        children: [{
          name: '员工账号',
          route: '/bg-account/bg-user'
        }]
      }]
    }, {
      name: '设置',
      children: [{
          name: '默认设置',
          children: [{
              name: '手机闪屏',
              route: '/setting/default-flash-screen-image'
            },
            {
              name: 'app数值设置',
              route: '/setting/app-default-setting'
            },
            {
              name: '其他设置',
              route: '/setting/other-setting'
            },
            {
              name: 'app版本',
              route: '/setting/app-version'
            }
          ]
        },
        {
          name: '表情包管理',
          children: [{
              name: '表情库',
              route: '/emoji/lib'
            },
            {
              name: '表情排版',
              route: '/emoji/emoji-sort'
            }
          ]
        }
      ]
    }];
    sortMenu(this.menus, 0, 1);
    this.group = getGroupAndMaxValue(this.menus).group;
    this.maxValue = getGroupAndMaxValue(this.menus).maxValue;
  },
  setLv2Menus(lv1Name) {
    let lv2Menus = this.menus.filter(item => item.name === lv1Name);
    if (lv2Menus && lv2Menus.length)
      setAsyncRoutes(lv2Menus[0].children);
  },
  getLv2Menus(lv1Name) {
    return this.menus.filter(item => item.name === lv1Name);
  }
};