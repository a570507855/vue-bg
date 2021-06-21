module.exports = {

  title: '后台管理',

  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  fixedHeader: true,

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: false,
  development: {
    baseURL: 'http://127.0.0.1:8888'
    //baseURL:'http://192.168.1.106:8585/'
  },
  production: {
    baseURL: '/'
  }
}