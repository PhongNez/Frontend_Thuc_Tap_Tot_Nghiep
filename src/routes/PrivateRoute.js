import { useContext } from "react";
import { UserContext } from "../context/UserContext";



const PrivateRoute = (props) => {
    const { user, logout, verifiToken, isLogin, role } = useContext(UserContext);
    if (isLogin === false) {
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

export default PrivateRoute