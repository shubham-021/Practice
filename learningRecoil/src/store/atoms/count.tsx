import { atom,selector } from "recoil";


// Problem: Recoil 0.7.7 is NOT compatible with React 19

// React 19 introduced breaking changes in React internals.

// Recoil 0.7.7 still relies on private internals like
// __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
// which React 19 removed or changed.

// That’s why you're seeing the error:

// __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED is undefined

export const countAtom = atom({
    key: "countAtom",
    default: 0
})

export const evenSelector = selector({
    key : "evenSelector",
    get : ({get}) => {
        const count = get(countAtom)
        return count%2
    }
})


// asynchronous data queries

//Recoil allows you to seamlessly mix synchronous and asynchronous functions in your data-flow graph of 
// selectors. Simply return a Promise to a value instead of the value itself from a selector get callback, 
// the interface remains exactly the same. Because these are just selectors, other selectors can also depend
// on them to further transform the data.

// Selectors can be used as one way to incorporate asynchronous data into the Recoil data-flow graph. Please
// keep in mind that selectors represent "idempotent" functions: For a given set of inputs they should always
// produce the same results (at least for the lifetime of the application). This is important as selector 
// evaluations may be cached, restarted, or executed multiple times. Because of this, selectors are generally
// a good way to model read-only DB queries.

// in short , atom can not have async functions , for that they have to use selectors

// export const notifications = atom({
//     key : "network",
//     default : selector({
//         key: "networkAtomSelector",
//         get: async () => {
//             const res = await axios.get("..url")
//             return res.data
//         }
//     })
// })



// atom family example

// export const todosAtomFamily = atomFamily({
//     key : 'todosAtomFamily',
//     default: id => {
//         return TODOS.find(x => x.id === id )
//     }
// })

// TODOS is an hardcoded array of todos object

// component example

// function Todo({id}){
//     const currentTodo = useRecoilValue(todosAtomFamily(id))

//     return (
//         <>
//             {currentTodo.title}
//             {currentTodo.description}
//         </>
//     )
// }


// selectorFamily example , async call in atomFamily

// export const todosAtomFamily = atomFamily({
//     key : 'todosAtomFamily',
//     default: selectorFamily({
//     key : "todoSelectorFamily",
//     get : (id) => async () => {
//          const res = await axios.get(`https://fetchTodos?id=${id}`)
//          return res.data.todo
//          }
//     })
// })


// useRecoilStateLoadable
// useRecoilValueLoadable

// example

// function Todo({id}){
//     const todo = useRecoilValueLoadable(todosAtomFamily(id))

// now todo not only have your state value , it is a object which has two values 
// {
//     contents,
//     state
// }

//     if(todo.state === "loading"){
//          return <div>
//              loading...
//          </div>
//     }else if(todo.state === "hasValue"){
//          return (
//          <>
//              {todo.contents.title}
//              {todo.contents.description}
//          </>
//          )
//     }
// }
