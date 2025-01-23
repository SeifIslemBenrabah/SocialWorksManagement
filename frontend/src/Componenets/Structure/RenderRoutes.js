import React from 'react'
import {Route,Routes,Navigate} from 'react-router-dom'
import Home from '../Home'
import Login from '../Login'
import ForgetPwd from '../ForgetPwd'
import DashboardC from '../DashboardC'
import NotFound from '../NotFound'
import { AuthData } from '../../Auth/AuthWrapper'
import Commette from '../Commette'
import Programmes from '../Programmes'
import Demand from '../Demand'
import Profile from '../Profile'
const RenderRoutes = () => {
    const {user}= AuthData();
    console.log(user)
  return (
    
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/ForgetPwd' element={<ForgetPwd/>}/>
      {user.isAuth && user.role === "admin" &&(
      <>
      <Route path='/Commette' element={<Commette/>}>
      <Route index element={<Navigate to="Dashboard" />} />
      <Route path="Dashboard" element={<DashboardC/>} />
      <Route path="Programmes" element={<Programmes/>}/>
      <Route path="Demand" element={<Demand/>}/>
      <Route path="Profile" element={<Profile/>}/>
      </Route>
    </>
    )}
    {user.isAuth && user.role=== "User"&&(
      <>
    </>
    )}
    <Route path='*' element={<NotFound/>}/>
    </Routes>
  )
}

export default RenderRoutes
