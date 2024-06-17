import { registerApplication, start } from "single-spa"

const application = {
  bootstrap: () => {
    console.log("bootstrap")
    return Promise.resolve()
  }, //bootstrap function
  mount: () => {
    console.log("mount")
    return Promise.resolve()
  }, //mount function
  unmount: () => {
    console.log("unmount")
    return Promise.resolve()
  }, //unmount function
}
// registerApplication({
//   name: "@single-spa/welcome",  // 应用名字 随便起
//   app: () =>                    // 当路径匹配到的时候 执行这个方法
//     System.import(              // 加载一个远程的模块 这个模块会暴露三个钩子 bootstrap mount unmount
//       "https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js"
//     ),
//   activeWhen: location => location.pathname === '/',
// }, application);

registerApplication(
  "@single-spa/welcome",
  () =>
    // 当路径匹配到的时候 执行这个方法
    System.import(
      "https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js",
    ),
  // (location) => location.pathname.startsWith("/"),
  (location) => location.pathname === "/",
)

registerApplication({
  name: "@pittle/vue", // 应用名字 随便起
  app: () =>
    // 当路径匹配到的时候 执行这个方法
    System.import(
      // 加载一个远程的模块 这个模块会暴露三个钩子 bootstrap mount unmount
      "@pittle/vue",
    ),
  activeWhen: ["/vue"], // 以vue开头的就能匹配到
  customProps: { a: "123" },
})

registerApplication({
  name: "@pittle/react", // 应用名字 随便起
  app: () =>
    // 当路径匹配到的时候 执行这个方法
    System.import(
      // 加载一个远程的模块 这个模块会暴露三个钩子 bootstrap mount unmount
      "@pittle/react",
    ),
  activeWhen: ["/react"], // 以react开头的就能匹配到
  customProps: { a: "123" },
})
// registerApplication({
//   name: "@pittle/navbar",
//   app: () => System.import("@pittle/navbar"),
//   activeWhen: ["/"]
// });

start({
  // 启动应用
  urlRerouteOnly: true,
})

export function bootstrap(props) {
  return Promise.resolve().then(() => {
    // One-time initialization code goes here
    console.log("bootstrapped!")
  })
}
