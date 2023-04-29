import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import GigDetail from '../pages/GigDetail';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import AddUpdategig from '../pages/AddUpdategig';
import CreateUpdateProfile from '../pages/CreateUpdateProfile';
import Buyer from '../pages/Buyer';
import { fetchrequest } from '../../function';
const Router = () => {
  const navigate = useNavigate();
  const [buyer, setBuyer] = useState(false);
  const [login, setIslogin] = useState(null);

  const token = JSON?.parse(localStorage?.getItem('user-token'))?.token;
  const userId = JSON?.parse(localStorage?.getItem('user-token'))?.userId;
  const email = JSON?.parse(localStorage?.getItem('user-token'))?.email;
  useEffect(() => {
    if (token) {
      const checkLogin = async () => {
        await fetchrequest({ endpoint: 'login', method: 'post', data: { token } }).then((res) => {
          if (!res.data.success) {
            localStorage.clear();
            navigate('/login');
          }
        });
      };
      checkLogin();
    } else {
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    if (userId) setIslogin({ token, email, userId });
    else {
      navigate('/login');
    }
  }, [userId]);

  return (
    <Routes>
      {login ? (
        <>
          <Route path='/gig-add' element={<AddUpdategig />} />
          <Route path='/gig-edit:id' element={<AddUpdategig />} />
          <Route path='/gig-detail' element={<GigDetail />} />
          <Route index path='/' element={<Home setBuyer={setBuyer} buyer={buyer} />} />
          <Route path='/edit-profile' element={<CreateUpdateProfile />} />
          <Route index path='/login' element={<Login />} />
        </>
      ) : (
        <>
          <Route index path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/buyer' element={<Buyer />} />
        </>
      )}
    </Routes>
  );
};

export default Router;
