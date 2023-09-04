import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Logout from './components/Logout';
import Protected from './components/Protected';
function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route index path='/' element={<Protected Component = {Home} />} />
                <Route path='login' element={<Login/>} />
                <Route path='sign' element={<Signup/>}  />
                <Route path='logout'  element={<Logout/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;