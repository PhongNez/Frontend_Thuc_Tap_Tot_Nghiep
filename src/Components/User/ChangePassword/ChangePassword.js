import { useState } from "react"
import axios from '../../../services/Customize-axios'
import { useEffect } from "react"
import { useContext } from "react"
import { UserContext } from "../../../context/UserContext"
import { toast } from "react-toastify"

const ChangePassword = () => {


    const [password, setPassword] = useState("")
    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")
    const [id, setID] = useState('')

    const { user } = useContext(UserContext)
    useEffect(() => {
        if (user && user[0] && user[0].id) {
            setID(user[0].id)
        }
    }, [user])

    const handleSave = async () => {
        console.log(password, password1, password2, id);
        let res = await axios.put('/auth/change-password', { oldPassword: password, currentPassword: password1, newPassword: password2 })
        console.log(res);
        if (res && res.errCode === 0) {
            toast.success(res.message)
        }
        else if (res && res.errCode === 1) {
            toast.error(res.message)
        }
        else if (res && res.errCode === 2) {
            toast.error(res.message)
        }
        else if (res && res.errCode === 3) {
            toast.error(res.message)
        }
    }
    return (

        <>
            <div className="login-container col-12 col-sm-4">
                <div className="title my-3">Đổi mật khẩu</div>
                <div className="text">Mật khẩu hiện tại</div>
                <input type="password" onChange={(e) => setPassword(e.target.value)} />
                <div className="text">Mật khẩu mới</div>
                <input type={"password"} onChange={(e) => setPassword1(e.target.value)} />
                <div className="text">Nhập lại mật khẩu mới</div>
                <input type={"password"} onChange={(e) => setPassword2(e.target.value)} />
                {/* {eye === true ? <AiFillEyeInvisible onClick={() => setEye(!eye)} /> : <AiFillEye onClick={() => setEye(!eye)} />} */}

                {/* <div className="quen-mk"><a href="#" class="text-qmk" onClick={() => setIsShowModalForgot(true)}>Quên mật khẩu?</a></div> */}
                <button
                    // disabled={email && password ? false : true}
                    className={'active'}
                    onClick={handleSave}
                >Lưu thay đổi</button>
                {/* <div className="go-back"><IoIosArrowBack /><span className="text-go-back">Go back</span></div> */}
                {/* <div className="sign-up">Bạn không có tài khoản? <a href="#" class="text-dk" onClick={() => setIsShowModalSignup(true)}>Đăng ký</a></div> */}

            </div>
        </>)
}

export default ChangePassword