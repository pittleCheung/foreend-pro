import { produce } from "immer"
export const immer = (initializer) => {
  // 这的immer的返回值就是传到vanilla中的createState
  return (set, get, store) => {
    store.setState = (updater) => {
      const nextState = produce(updater)
      console.log("nextState", typeof nextState, updater)
      return set(nextState)
    }
    return initializer(store.setState, get, store)
  }
}
export default immer
// produce的 第一参数不是baseState？？
