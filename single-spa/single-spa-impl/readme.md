# 状态

```json
{
  "NOT_LOADED": "NOT_LOADED",
  "LOADING_SOURCE_CODE": "LOADING_SOURCE_CODE",
  "NOT_BOOTSTRAPPED": "NOT_BOOTSTRAPPED",
  "BOOTSTRAPPING": "BOOTSTRAPPING",
  "NOT_MOUNTED": "NOT_MOUNTED",
  "MOUNTING": "MOUNTING",
  "UPDATING": "UPDATING",
  "LOAD_ERROR": "LOAD_ERROR",
  "MOUNTED": "MOUNTED",
  "UNMOUNTING": "UNMOUNTING",
  "SKIP_BECAUSE_BROKEN": "SKIP_BECAUSE_BROKEN"
}

NOT_LOADED：应用程序尚未加载，也没有开始加载。

LOADING_SOURCE_CODE：应用程序正在加载其源代码。这个状态表示应用程序正在从服务器获取代码。

NOT_BOOTSTRAPPED：应用程序已经加载了源代码，但尚未开始启动。

BOOTSTRAPPING：应用程序正在启动。在这个阶段，应用程序会执行一些需要在启动之前完成的任务，例如注册全局变量或设置路由。

NOT_MOUNTED：应用程序已经启动，但尚未挂载到 DOM 中。

MOUNTING：应用程序正在被挂载到 DOM 中。在这个阶段，应用程序会创建并添加其组件到指定的 DOM 节点中。

UPDATING：应用程序正在更新（重新渲染）。这可能是由于外部状态的改变或其他原因导致的。

LOAD_ERROR：应用程序在加载或启动过程中遇到了错误。

MOUNTED：应用程序已成功挂载到 DOM 中。

UNMOUNTING：应用程序正在从 DOM 中卸载。

SKIP_BECAUSE_BROKEN：由于错误或其他原因，应用程序被跳过，不会加载或启动。
```

NOT_LOADED 没有加载过

LOADING_SOURCE_CODE 加载资源 资源加载失败(LOAD_ERROR)

NOT_BOOTSTRAPPED 没有启动过 代码出错(SKIP_BECAUSE_BROKEN)

BOOTSTRAPPING 启动中

NOT_MOUNTED 没有挂载 UNMOUNTING

UNLOADING (完全卸载)

MOUNTED 挂载完成 更新中(UPDATING)
