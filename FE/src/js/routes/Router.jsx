import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import GigDetail from '../pages/GigDetail'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import AddUpdategig from '../pages/AddUpdategig'
import CreateUpdateProfile from '../pages/CreateUpdateProfile'
import Buyer from "../pages/Buyer"
const Router = () => {
  const [buyer, setBuyer] = useState(false)
console.log(buyer);
  return (
    <Routes>
      <Route index element={<Signup />} />
      <Route path="/gig-add" element={<AddUpdategig />} />
      <Route path="/gig-edit:id" element={<AddUpdategig />} />
      <Route path="/gig-detail" element={<GigDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home setBuyer={setBuyer} buyer={buyer}/>} />
      <Route path="/create-profile" element={<CreateUpdateProfile />} />
      <Route path="/buyer" element={<Buyer />} />
    </Routes>
  )
}

export default Router