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
import ChonNam from "../Components/DoanhThu/DoanhThu";
import {
    PrivateRouteUserLogin,
    PrivateRouteAdminLogin,
    PrivateRouteRead,
    PrivateRouteReadCollectMoney,
    PrivateRouteReadCollectElec,
    PrivateRouteReadDoanhThu,
    PrivateRouteReadAccount
} from "./PrivateRouteRead";
import DetailHistoryCollectMoney from "../Components/CollectMoney/DetailHistoryCollectMoney";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/order-room" element={<OrderRoom />} />
            <Route path="/history-price/detail/:id" element={<DetailHistoryPrice />} />

            <Route path="/user" element={
                <PrivateRouteReadAccount><TableUser /></PrivateRouteReadAccount>} />
            <Route path="/category" element={<PrivateRouteAdminLogin><TableCategory /></PrivateRouteAdminLogin>} />

            <Route path="/room" element={<PrivateRouteAdminLogin><TableRoom /></PrivateRouteAdminLogin>} />





            <Route path="/history-order-room" element={<PrivateRoute><HistoryOrderRoom /></PrivateRoute>} />
            {/* <Route path="/history-order-room" element={<HistoryOrderRoom />} /> */}


            <Route path="/history-order-room/all" element={<PrivateRouteRead><HistoryOrderRoomAll /></PrivateRouteRead>} />

            <Route path="/history-order-room/detail/:id" element={<PrivateRouteUserLogin><DetailHistoryOrderRoom /></PrivateRouteUserLogin>} />
            <Route path="/change-password" element={<PrivateRouteUserLogin><ChangePassword /></PrivateRouteUserLogin>} />

            <Route path="/info" element={<PrivateRouteUserLogin><Info /></PrivateRouteUserLogin>} />
            <Route path="/collect-money" element={<PrivateRouteReadCollectMoney><CollectMoney /></PrivateRouteReadCollectMoney>} />

            <Route path="/history-collect-money" element={<PrivateRouteUserLogin><HistoryCollectMoneyUser /></PrivateRouteUserLogin>} />
            <Route path="/history-collect-money/detail/:id" element={<PrivateRouteUserLogin><DetailHistoryCollectMoney /></PrivateRouteUserLogin>} />
            <Route path="/collect-elec" element={
                <PrivateRouteReadCollectElec>
                    <CollectElec /></PrivateRouteReadCollectElec>} />

            <Route path="/doanh-thu" element={<PrivateRouteReadDoanhThu><ChonNam /></PrivateRouteReadDoanhThu>} />
        </Routes>)
}

export default AppRoutes