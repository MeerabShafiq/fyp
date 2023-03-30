import React from 'react'
import { Routes, Route } from 'react-router-dom'
import GigDetail from '../pages/GigDetail'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Signup from '../pages/Signup'

const Router = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/gig-detail" element={<GigDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  )
}

export default Router