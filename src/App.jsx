import { useState ,useEffect} from 'react'

import Navbar from './compnents/Navbar'
import { v4 as uuidv4 } from 'uuid'; 


function App() {

  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showFinish, setshowFinish] = useState(true)

  useEffect(() => {
    let todostring=localStorage.getItem("todos")
    if(todostring){

      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }
  }, [])
  

  const saveToLs=() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setshowFinish(!showFinish)
  }

  const handledit=(e, id)=>{
   let t= todos.filter(i=>i, id == id)
    settodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id;
    })
    settodos(newTodos)
    saveToLs()
  }

  const handldelete=(e,id)=>{
  
    let index=todos.findIndex(item=>{
      return item.id===id;
    })
    console.log(index)
    let newTodos = todos.filter(item=>{
      return item.id!==id;
    })
    settodos(newTodos)
    saveToLs()
  }

  const handlAdd=()=>{
    settodos([...todos, {id:uuidv4(),todo, isComplited:false}])
    settodo("")
    saveToLs()
  }

  const handlechange=(e)=>{
    settodo(e.target.value)
  }
  
  const handlecheck= (e) => {
   let id= e.target.name
    let index=todos.findIndex(item=>{
      return item.id===id;
    })
    let newTodos = [...todos];
    newTodos[index].isComplited= !newTodos[index].isComplited
    settodos(newTodos)
    saveToLs()
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto bg-violet-100 my-5 rounded-xl p-5 min-h-[80vh]">
        <div className="addtodo my-5">
          <h1 className="font-bold text-center text-xl">iTask - Manage your todos at one place</h1>
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <input name={todo.name} onChange={handlechange} value={todo} type="text" className="w-1/2 rounded-lg p-1 " />
          <button onClick={handlAdd} disabled={todo.length<=3} className="bg-violet-800 hover:bg-violet-950 text-sm font-bold p-3 py-1 text-white rounded-md mx-6">Save </button>
        </div>
        <input onChange={toggleFinished} type="checkbox" checked={showFinish} /> Show Finished
        <h2 className="text-xl font-bold">Yours Todos</h2>
        <div className="todos">
          {todos.length===0 && <div className="m-5">No Todos to display</div>}
          {todos.map(item=>{

          
          return (showFinish || item.isComplited) && <div key={item.id} className="todo flex w-1/3 my-3 justify-between">
            <div className="flex gap-5">

            <input type="checkbox" onChange={handlecheck} checked={item.isComplited} name={item.id} id="" />
            <div className= {item.isCoplited?"line-through":""}>{item.todo}</div>
            </div>
            <div className="buttons flex h-full">
              <button onClick={(e)=>handledit(e, item.id)} className="bg-violet-800 hover:bg-violet-950 text-sm font-bold p-3 py-1 text-white rounded-md mx-1">Edit</button>
              <button onClick={(e)=>{handldelete(e,item.id)}} className="bg-violet-800 hover:bg-violet-950 text-sm font-bold p-3 py-1 text-white rounded-md mx-1">Delete</button>
            </div>
          </div>
          })}
        </div>
      </div>

    </>
  )
}

export default App
