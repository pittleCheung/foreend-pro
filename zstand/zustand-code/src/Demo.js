import { useState, useEffect, useSyncExternalStore } from "react"
import { todosStore } from "./todoStore.js"

// function useSyncExternalStore(subscribe, getSnapshot) {
//   const [state, setState] = useState(getSnapshot())
//   useEffect(() => {
//     return subscribe((newState) => {
//       setState({ ...newState })
//     })
//   }, [])
//   // return state
//   return getSnapshot()
// }
export default function TodosApp() {
  const todos = useSyncExternalStore(
    todosStore.subscribe,
    todosStore.getSnapshot,
  )
  console.log(todos, "xxx")
  return (
    <>
      <button onClick={() => todosStore.addTodo()}>Add todo</button>
      <hr />
      <ul>
        {todos && todos.map((todo) => <li key={todo.id}>{todo.text}</li>)}
      </ul>
    </>
  )
}
