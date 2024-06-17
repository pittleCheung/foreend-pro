// import { produce } from 'immer';
// let baseState = {
//   ids: [1],
//   pos: {
//     x: 1,
//     y: 1
//   }
// }

// let nextState = produce(baseState, (draft) => {
//   draft.ids.push(2);
// })

// console.log(nextState, baseState, nextState === baseState)
// console.log(baseState.ids === nextState.ids);//false
// console.log(baseState.pos === nextState.pos);//true

import { produce } from "immer"
// import { immer } from 'zustand/middleware/immer'

const baseState = {
  list: {
    a: ["1", "2"],
    b: [3, 4],
  },
}

const result = produce(baseState, (draft) => {
  // const l = draft.list.a
  // l.push('3')
  draft.list.c = { x: "xxx" }
})

console.log(baseState)
console.log(result)
console.log(baseState.list === result.list)
// console.log(baseState.list.b === result.list.b)
