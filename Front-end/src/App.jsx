import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AddTask from './components/AddTask'
import TaskList from './components/TaskList'
import Login from './components/Login'
const App = () => {
  return (
    <>
      <BrowserRouter><Routes>
        <Route path='/' element={<Login/>}></Route>
         <Route path='/add/task' element={<AddTask/>}></Route>
          <Route path='/tasks' element={<TaskList/>}></Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
