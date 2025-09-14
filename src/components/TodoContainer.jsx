import React, { useEffect, useState } from 'react'
import axios from 'axios'

function TodoContainer() {

    const [TodoList, setTodoList] = useState([])
    const [Todo, setTodo] = useState('')

    const BaseUrl = 'http://localhost:3000/Todos'

    const GetTodos = async () => {
        const response = await axios.get(`${BaseUrl}`)
        setTodoList(response.data)
    }

    const AddTodo = async () => {
        const NewTodo = {
            "Todo": Todo,
            "completed": false
        }
        await axios.post(`${BaseUrl}`, NewTodo)
        GetTodos()
        setTodo("")
    }

    const CheckTodo = async (id, completed) => {
        await axios.patch(`${BaseUrl}/${id}`, { completed: !completed })
        setTodoList(
            TodoList.map(todo => todo.id === id ? { ...todo, completed: !completed } : todo)
        )
    }

    const DeleteTodo = async (id) => {
        await axios.delete(`${BaseUrl}/${id}`)
        setTodoList(TodoList.filter(todo => todo.id !== id))
        GetTodos()
    }

    useEffect(() => {
        GetTodos()
    }, [])

    return (
        <>
            <div className='flex flex-col w-[90%] h-150 items-center justify-between rounded-2xl p-3 py-5 bg-[#3E7CB1]'>
                <div className='flex w-full justify-between lg:justify-around xl:justify-center'>
                    <input type="text" onChange={(e) => setTodo(e.target.value)} value={Todo} placeholder='Add a Todo' className='w-[87%] h-10 rounded-2xl outline-0 px-3 text-lg transition duration-300 bg-[#dbe4ee] hover:bg-[#eaeef3]' />
                    <button onClick={AddTodo} className='w-10 h-10 rounded-2xl cursor-pointer xl:ml-3 bg-[#9ef01a]'><i className="fa-solid fa-plus"></i></button>
                </div>

                <div className='flex flex-col w-[98%] h-[90%] py-5 overflow-y-scroll'>
                    {TodoList.map(todo => (
                        <div key={todo.id} className='flex w-full h-fit items-center justify-between p-3 mb-3 rounded-2xl bg-white'>
                            <h3 className={`w-[240px] ${todo.completed ? "line-through text-green-500" : ""} break-words`}>{todo.Todo}</h3>
                            <div className='flex w-fit h-fit'>
                                <button onClick={() => CheckTodo(todo.id, todo.completed)} className='w-5 h-5 cursor-pointer'><i className="fa-solid fa-check"></i></button>
                                <button onClick={() => DeleteTodo(todo.id)} className='w-5 h-5 ml-1 cursor-pointer'><i className="fa-solid fa-xmark"></i></button>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </>

    )
}

export default TodoContainer