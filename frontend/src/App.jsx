import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import Navbar from "./componenets/Navbar.jsx";
import SignUpPage from './pages/SignUpPage.jsx';
import LoginPage from "./pages/LoginPage.jsx";
import EmailVerificationPage from './pages/EmailVerificationPage.jsx';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { LoaderCircle } from 'lucide-react';
import { checkAuth } from './redux/user/userSlice.js';
import ProfilePage from './pages/ProfilePage.jsx';
import "./App.css";
import MainPage from './pages/MainPage.jsx';

function App() {
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const { currentUser, isCheckingAuth } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  if (isCheckingAuth && !currentUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoaderCircle className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={!currentUser ? <HomePage /> : <Navigate to="/main" />} />
        <Route path='/signup' element={!currentUser ? <SignUpPage /> : <Navigate to="/verify-email" />} />
        <Route path='/login' element={!currentUser ? <LoginPage /> : <Navigate to="/main" />} />
        <Route path='/verify-email' element={<EmailVerificationPage />} />
        <Route path='/profile' element={currentUser ? <ProfilePage /> : <Navigate to={"/login"} />} />
        <Route path='/main' element={currentUser ? <MainPage /> : <Navigate to={"/login"} />} />

      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
