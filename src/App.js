import { useEffect, useState } from 'react';
import './App.scss';
import Header from './Components/Header';
// import TableUser from './Components/TableUser';
import TableRoom from './Components/Room/TableRoom';
import TableUser from './Components/User/TableUser';
import { Container } from 'react-bootstrap';
import ModalAddNewUser from './Components/ModalAddNew';
import Home from './Components/Home';
import HeaderUser from './Components/User/HeaderUser/HeaderUser';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  BrowserRouter,
  Routes
} from "react-router-dom";
import Login from './Components/Login/Login';

import { UserContext } from './context/UserContext';
import { useContext } from 'react';
import AppRoutes from './routes/AppRoutes';


function App() {
  const { user, logout, verifiToken, isLogin, role } = useContext(UserContext);
  const checkToken = async () => {
    let veri = await verifiToken()
    console.log('vefi:', veri, user);
  }
  useEffect(() => {
    checkToken()
  }, [])

  console.log('Flag: ', isLogin);
  return (
    <>
      <div className='app-container'>
        <Container>
          {console.log('Role: ', role)}
          {role > 0 ? <Header /> : <HeaderUser />}
          <AppRoutes />
        </Container>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </>

  );
}

export default App;
