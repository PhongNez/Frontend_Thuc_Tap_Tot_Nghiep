import { useContext } from "react";
import { UserContext } from "../context/UserContext";



const PrivateRouteRead = (props) => {
    const { user, logout, verifiToken, isLogin, role, arrRole } = useContext(UserContext);
    console.log('ARR role:', arrRole);
    const check = arrRole.find((item) => item.ma_quyen == 6 || item.ma_quyen == 1)
    console.log(check);

    if (!check) {
        return (
            <h1>Bạn không có quyền truy cập</h1>
        )
    }

    return (
        <>
            {props.children}
        </>
    )
}

const PrivateRouteReadCollectMoney = (props) => {
    const { user, logout, verifiToken, isLogin, role, arrRole } = useContext(UserContext);
    console.log('ARR role:', arrRole);
    const check = arrRole.find((item) => item.ma_quyen == 7 || item.ma_quyen == 1)
    console.log(check);

    if (!check) {
        return (
            <h1>Bạn không có quyền truy cập</h1>
        )
    }

    return (
        <>
            {props.children}
        </>
    )
}

const PrivateRouteReadCollectElec = (props) => {
    const { user, logout, verifiToken, isLogin, role, arrRole } = useContext(UserContext);
    console.log('ARR role:', arrRole);
    const check = arrRole.find((item) => item.ma_quyen == 8 || item.ma_quyen == 1)
    console.log(check);

    if (!check) {
        return (
            <h1>Bạn không có quyền truy cập</h1>
        )
    }

    return (
        <>
            {props.children}
        </>
    )
}

const PrivateRouteReadDoanhThu = (props) => {
    const { user, logout, verifiToken, isLogin, role, arrRole } = useContext(UserContext);
    console.log('ARR role:', arrRole);
    const check = arrRole.find((item) => item.ma_quyen == 9 || item.ma_quyen == 1)
    console.log(check);

    if (!check) {
        return (
            <h1>Bạn không có quyền truy cập</h1>
        )
    }

    return (
        <>
            {props.children}
        </>
    )
}


// export default PrivateRouteRead
export { PrivateRouteRead, PrivateRouteReadCollectMoney, PrivateRouteReadCollectElec, PrivateRouteReadDoanhThu }