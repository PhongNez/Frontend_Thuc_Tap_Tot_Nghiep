import { useEffect, useState } from 'react';
import './App.scss';
import Header from './Components/Header';
// import TableUser from './Components/TableUser';
import TableRoom from './Components/Room/TableRoom';
import { Container } from 'react-bootstrap';
import ModalAddNewUser from './Components/ModalAddNew';
import Home from './Components/Home';

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
function App() {
  return (
    <>
      <div className='app-container'>


        <Container>
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/room" element={<TableRoom />} />
            <Route path="/login" element={<Login />} />
          </Routes>

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
