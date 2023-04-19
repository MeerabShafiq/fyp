import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import GigDetail from '../pages/GigDetail';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import AddUpdategig from '../pages/AddUpdategig';
import CreateUpdateProfile from '../pages/CreateUpdateProfile';
import Buyer from '../pages/Buyer';
const Router = () => {
  const navigate = useNavigate();
  const [buyer, setBuyer] = useState(false);
  const [login, setIslogin] = useState(null);
  const token = JSON?.parse(localStorage?.getItem('user-token'))?.token;
  const userId = JSON?.parse(localStorage?.getItem('user-token'))?.userId;
  const email = JSON?.parse(localStorage?.getItem('user-token'))?.email;
  console.log(login);
  useEffect(() => {
    if (userId) setIslogin({ token, email, userId });
    else {
      navigate('/login');
    }
  }, [userId]);
  console.log(buyer);
  return (
    <Routes>
      {login ? (
        <>
          <Route path='/gig-add' element={<AddUpdategig />} />
          <Route path='/gig-edit:id' element={<AddUpdategig />} />
          <Route path='/gig-detail' element={<GigDetail />} />
          <Route path='/home' element={<Home setBuyer={setBuyer} buyer={buyer} />} />
          <Route path='/create-profile' element={<CreateUpdateProfile />} />
          <Route path='/buyer' element={<Buyer />} />
        </>
      ) : (
        <>
          <Route index path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </>
      )}
      {/* <Route index element={<Signup />} /> */}
      {/* <Route path="/login" element={<Login />} /> */}
      {/* <Route path="/signup" element={<Signup />} /> */}
    </Routes>
  );
};

export default Router;
