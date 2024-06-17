// const { produce } = require('immer');
function produce(base, recipe) {
  // 预定义一个 copy 副本
  let copy
  // 定义 base 对象的 proxy handler
  const baseHandler = {
    set(obj, key, value) {
      // 先检查 copy 是否存在，如果不存在，创建 copy
      if (!copy) {
        copy = { ...base }
      }
      // 如果 copy 存在，修改 copy，而不是 base
      copy[key] = value
      console.log("copy====   ", copy)
      return true
    },
  }

  // 被 proxy 包装后的 base 记为 draft
  const draft = new Proxy(base, baseHandler)
  // 将 draft 作为入参传入 recipe
  recipe(draft)
  // 返回一个被“冻结”的 copy，如果 copy 不存在，表示没有执行写操作，返回 base 即可
  // “冻结”是为了避免意外的修改发生，进一步保证数据的纯度
  // 使其不可修改，包括属性的添加、删除和修改。
  // console.log(copy, "copy", base)
  return Object.freeze(copy || base)
}

let baseState = {
  ids: [1, 2, 3],
  pos: {
    x: 1,
    y: 2,
  },
}
const nextState = produce(baseState, (draft) => {
  draft.ids.push(4)
})

console.log(baseState === nextState)
console.log(baseState.pos === nextState.pos)
//比较对象是否相等不需要深度遍历对象的每一层属性

//
