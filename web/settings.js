module.exports = {

  title: '后台管理',
  development: {
    baseURL: '/'
    //baseURL:'http://192.168.1.106:8585/'
  },
  production: {
    baseURL: '/'
  },
  menu: [{
    name: '服务器操作',
    route: '',
    index: '1',
    children: [{
      name: 'cmd',
      route: '/server/cmd',
      index: '1-1',
    }, {
      name: 'file-directory',
      route: '/server/file-directory',
      index: '1-2',
    }, {
      name: '菜单一3',
      route: '/test/3',
      index: '1-3',
    }]
  }, {
    name: 'typescript',
    route: '',
    index: '2',
    children: [{
      name: '基础类型',
      route: '/typescript/data-type',
      index: '2-1',
    }, {
      name: '菜单二2',
      route: '/test/5',
      index: '2-2',
    }, {
      name: '菜单二3',
      route: '/test/6',
      index: '2-3',
    }]
  }]
}