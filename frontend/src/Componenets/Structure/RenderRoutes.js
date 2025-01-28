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
import Meeting from '../Meeting'
import UDemand from '../UDemand'
import UProgrammes from '../UProgrammes'
import Users from '../Users'
import ProgrammeDetail from '../ProgrammeDetail'
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
      <Route path="Meeting" element={<Meeting/>}/>
      </Route>
    </>
    )}
    {user.isAuth && user.role=== "user"&&(
      <>
      <Route path='/Users' element={<Users/>}>
      <Route index element={<Navigate to="UProgrammes"/>} />
      <Route path="UProgrammes" element={<UProgrammes/>}/>
      <Route path="programme/:id" element={<ProgrammeDetail />} />
      <Route path="UDemand" element={<UDemand/>}/>
      <Route path="Profile" element={<Profile/>}/>
      </Route>
    </>
    )}
    <Route path='*' element={<NotFound/>}/>
    </Routes>
  )
}

export default RenderRoutes
