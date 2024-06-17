export const NOT_LOAD = "NOT_LOAD" // 应用默认状态下是未加载状态

export const LOADING_SOURCE_COOD = "LOADING_SOURCE_COOD" // 正在加载文件资源

export const NOT_BOOTSTRAPPED = "NOT_BOOTSTRAPPED" // 此时没有调用bootstrap

export const BOOTSTRAPPING = "BOOTSTAPPEDING" // 正在启动中 此时bootstrap调用完毕后 需要表示成有没有挂载

export const NOT_MOUNTED = "NOT_MOUNTED" // 调用了mount方法

export const MOUNTED = "MOUNTED" //表示挂载成功

export const UNMOUNTING = "UNMOUNTING" // 卸载中 卸载后回到NOT_MOUNTED
