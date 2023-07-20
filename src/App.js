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
import OrderRoom from './Components/User/OrderRoom/OrderRoom';
import HistoryOrderRoom from './Components/User/HistoryOrderRoom/HistoryOrderRoom';
import HistoryOrderRoomAll from './Components/User/HistoryOrderRoom/HistoryOrderRoomAll';
import DetailHistoryOrderRoom from './Components/User/HistoryOrderRoom/DetailHistoryOrderRoom';
import TableCategory from './Components/Category/Category';


function App() {
  const { user, logout, verifiToken, isLogin, role } = useContext(UserContext);

  const [flag, setFlag] = useState(false)
  const checkToken = async () => {
    let veri = await verifiToken()
    // if (veri && veri.lenght > 0) {
    //   setFlag(true)
    // }
    if (flag) {
      console.log('Flag', flag);
    }
    console.log('vefi:', veri, user.auth);
  }
  useEffect(() => {
    checkToken()
  }, [])

  console.log('Flag: ', isLogin);
  return (
    <>
      <div className='app-container'>
        <Container>
          {role > 0 ? <Header /> : <HeaderUser />}

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user" element={<TableUser />} />
            <Route path="/category" element={<TableCategory />} />
            <Route path="/room" element={<TableRoom />} />
            <Route path="/login" element={<Login />} />
            <Route path="/order-room" element={<OrderRoom />} />
            <Route path="/history-order-room" element={<HistoryOrderRoom />} />
            <Route path="/history-order-room/all" element={<HistoryOrderRoomAll />} />
            <Route path="/history-order-room/detail/:id" element={<DetailHistoryOrderRoom />} />
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
