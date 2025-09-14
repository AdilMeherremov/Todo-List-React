import { useState } from 'react'
import Navbar from './components/Navbar'
import TodoContainer from './components/TodoContainer'

function App() {

  return (
    <div className='flex flex-col items-center'>
      <Navbar/>
      <TodoContainer/>
    </div>
  )
}

export default App
