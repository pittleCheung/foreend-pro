import { reactive } from "./reactive.js"

const state = reactive({
  a: 1,
  b: 2,
  get c() {
    return this.a + this.b
  },
})

function fn() {
  // state.a
  // state.b
  // state.c
  // "a" in state // in关键字  只关心state中有还是没有"a"这个属性
  // for (let prop in state) {
  // }
}

fn()

// state.abc = 123
// state.a = 222

// delete state.a

state.d = 1

// state.a = 123  // 并不会改变state中有还是没有"a"这个属性
