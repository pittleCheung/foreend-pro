/**
 *
 * @param {*} appName 应用名称
 * @param {*} laodApp 应用加载函数 此函数会返回 bootstrap mount unmount
 * @param {*} activeWhen 什么时候激活 location => location.hash === "#/a"
 * @param {*} custom 用户自定义参数
 */

const app = [] // 这里用于存放所有的应用
export function registerApplication(appName, laodApp, activeWhen, custom) {
  console.log("registerApplication")
  const registeration = {
    name: appName,
    loadApp,
    activeWhen,
    customProps,
  }
}

app.push(registeration) // 保存到数组中后续可以在数组里筛选 需要的app是加载 还是 卸载 或 挂载
