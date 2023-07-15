import { IoIosArrowBack } from "react-icons/io";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useState } from "react";
import { createUser } from "../../services/UserService";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { setAuthToken } from "../../services/VerifyToken";
import ModalSignup from './ModalSignup'
import ModalForgot from "./ModalForgot";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";


const Login = () => {
    const [eye, setEye] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [isShowModalSignup, setIsShowModalSignup] = useState(false)
    const [isShowModalForgot, setIsShowModalForgot] = useState(false)
    const navigate = useNavigate();

    const { login } = useContext(UserContext)

    useEffect(() => {
        let token = localStorage.getItem('token')
        if (token) {
            setAuthToken(token)
            // navigate('/')
        }
    }, [])

    const handleCloseSignup = () => {
        setIsShowModalSignup(false)
    }
    const handleCloseForgot = () => {
        setIsShowModalForgot(false)
    }
    const handleLogin = async () => {
        // console.log(email, password);
        let res = await createUser(email, password)

        console.log(res);
        if (res && res.message) {
            toast.success(res.message)
        }
        if (res && res.data) {
            let role = await login(res.data)
            console.log(role[0]);
            navigate('/')
        }

        navigate('/')
    }
    console.log('Eye: ', eye);
    return (
        <div className="login-container col-12 col-sm-4">
            <div className="title">Đăng nhập</div>
            <div className="text">Email của bạn</div>
            <input type="text" placeholder="Enter email or phone..." onChange={(e) => setEmail(e.target.value)} />
            <div className="input-2">
                <input type={eye === true ? "password" : "text"} placeholder="Enter password..." onChange={(e) => setPassword(e.target.value)} />
                {eye === true ? <AiFillEyeInvisible onClick={() => setEye(!eye)} /> : <AiFillEye onClick={() => setEye(!eye)} />}
            </div>
            <div className="quen-mk"><a href="#" class="text-qmk" onClick={() => setIsShowModalForgot(true)}>Quên mật khẩu?</a></div>
            <button
                disabled={email && password ? false : true}
                className={email && password ? 'active' : ''}
                onClick={handleLogin}
            >Log in</button>
            {/* <div className="go-back"><IoIosArrowBack /><span className="text-go-back">Go back</span></div> */}
            <div className="sign-up">Bạn không có tài khoản? <a href="#" class="text-dk" onClick={() => setIsShowModalSignup(true)}>Đăng ký</a></div>
            <ModalSignup
                show={isShowModalSignup}
                handleClose={handleCloseSignup}
                title={'Đăng ký'}
            />
            <ModalForgot
                show={isShowModalForgot}
                handleClose={handleCloseForgot}
                title={'Quên mật khẩu'}
            />
        </div>
    )
}

export default Login