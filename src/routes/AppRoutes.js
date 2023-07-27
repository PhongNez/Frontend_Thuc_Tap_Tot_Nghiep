import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
    BrowserRouter,
    Routes
} from "react-router-dom";

import TableCategory from "../Components/Category/Category"
import Home from "../Components/Home"
import Login from "../Components/Login/Login"
import DetailHistoryPrice from "../Components/Room/HistoryPrice/DetailHistoryPrice"
import HistoryPrice from "../Components/Room/HistoryPrice/HistoryPrice"
import TableRoom from "../Components/Room/TableRoom"
import ChangePassword from "../Components/User/ChangePassword/ChangePassword"
import DetailHistoryOrderRoom from "../Components/User/HistoryOrderRoom/DetailHistoryOrderRoom"
import HistoryOrderRoom from "../Components/User/HistoryOrderRoom/HistoryOrderRoom"
import HistoryOrderRoomAll from "../Components/User/HistoryOrderRoom/HistoryOrderRoomAll"
import Info from "../Components/User/Info/Info"
import OrderRoom from "../Components/User/OrderRoom/OrderRoom"
import TableUser from "../Components/User/TableUser"

import PrivateRoute from "./PrivateRoute";
import CollectMoney from "../Components/CollectMoney/CollectMoney";
import HistoryCollectMoneyUser from "../Components/CollectMoney/HistoryCollectMoneyUser";
import CollectElec from "../Components/CollectElec/CollectElec";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user" element={<TableUser />} />
            <Route path="/category" element={<TableCategory />} />
            <Route path="/room" element={<TableRoom />} />
            <Route path="/login" element={<Login />} />
            <Route path="/order-room" element={<OrderRoom />} />




            <Route path="/history-order-room"
                element={<PrivateRoute>
                    <HistoryOrderRoom />
                </PrivateRoute>} />
            {/* <Route path="/history-order-room" element={<HistoryOrderRoom />} /> */}


            <Route path="/history-order-room/all" element={<HistoryOrderRoomAll />} />
            <Route path="/history-order-room/detail/:id" element={<DetailHistoryOrderRoom />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/history-price" element={<HistoryPrice />} />
            <Route path="/history-price/detail/:id" element={<DetailHistoryPrice />} />
            <Route path="/info" element={<Info />} />
            <Route path="/collect-money" element={<CollectMoney />} />
            <Route path="/history-collect-money" element={<HistoryCollectMoneyUser />} />
            <Route path="/collect-elec" element={<CollectElec />} />
        </Routes>)
}

export default AppRoutes