import  { useEffect, useState }from 'react'
import {BsFillTrashFill,BsCircleFill, BsFillCheckCircleFill } from 'react-icons/bs';

import Create from './Create'
import axios from 'axios'
function Home() {
  const [todos,setTodos]=useState([])

  useEffect(()=>{
    axios.get("http://localhost:3001/get")
    .then(result=>setTodos(result.data))
    .catch(err=>console.log(err))
  },[])

  const handleEdit=(id)=>{

    axios.put("http://localhost:3001/update/"+id)
    .then(result=>{
      location.reload()
      console.log(result)})
    .catch(err=>console.log(err))

  } 

  const handledelete=(id)=>{
    axios.delete("http://localhost:3001/delete/"+id)
    .then(result=>{
      location.reload()
      console.log(result)})
    .catch(err=>console.log(err))
  }
  return (
    <div className='home'> 
        Todo List 
     <Create/>
      { 
        todos.length===0
        ?
        <div>
          <h2>No Todo Yet</h2>
        </div>
        :
        todos.map((todo, index)=>(
          
          <div className='task' key={index}>

            <div className='checkbox' onClick={()=>handleEdit(todo._id)}>

              {todo.done?
                <BsFillCheckCircleFill className='icon'></BsFillCheckCircleFill>
                :
                <BsCircleFill className='icon'></BsCircleFill>

              }
            <p className={todo.done? "line_through":""}>  {todo.task}</p>
            </div>

            <div>
              <span> <BsFillTrashFill className='icon' onClick={()=>handledelete(todo._id)}></BsFillTrashFill></span>
            </div>
            

          </div>
        )) 

      }
    
    </div>
  )
}

export default Home
