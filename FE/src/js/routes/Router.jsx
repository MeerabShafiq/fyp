import React from 'react'
import { Routes, Route } from 'react-router-dom'
import GigDetail from '../pages/GigDetail'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import AddUpdategig from '../pages/AddUpdategig'

const Router = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/gig-add" element={<AddUpdategig />} />
      <Route path="/gig-edit:id" element={<AddUpdategig />} />
      <Route path="/gig-detail" element={<GigDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  )
}

export default Router