# React

React16 引入 fiber 从根本上解决 js 单线程运行 动画卡顿的问题

内容

1. React API
   createElement | Ref
   createContext | Component
   jsx => js | Suspense
   concurrentMode |Hooks

2. React 中更新创建
   ReactDom.render
   Fiber
   UpdateQueue

   FiberRoot
   Update
   expirationTime

3. Fiber Scheduler
   scheduleWork
   bachedUptates
   performWork
   performUnitOfWork
   requestWork
   react scheduler
   renderRoot

4. 开始更新
   beginWork 以及优化
   各类组件的更新过程
   调和子节点的过程

5. 完成各个节点的更新
   completeUnitOfWork
   completeWork
   unwindWork
   虚拟 Dom 对比
   错误捕获处理
   完成整棵树更新

6. 提交更新
   commitRoot 整体流程
   提交快照
   提交 Dom 更新
   提交所有声明周期
   开发时的帮助方法
   提交 DOM 插入
   提交 DOM 删除

7. 各种功能的实现过程
   context 的实现过程
   ref 的实现过程
   hydrate 的实现过程
   React 的事件体系
