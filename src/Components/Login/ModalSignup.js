import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import axios from '../../services/Customize-axios'

const ModalSignup = (props) => {
    const { show, handleClose, title, } = props
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const handleSave = async (email, password, password2) => {
        console.log(email, password, password2);
        console.log(checkEmail(email));
        if (checkEmail(email) == false) {
            toast.error('Email không hợp lệ')
            return
        }
        let res = await axios.post('/auth/signup', { data: { email, password, password2 } })
        if (res && res.errCode === 0) {
            // handleChange()
            setEmail('')
            setPassword('')
            setPassword2('')
            handleClose()
            toast.success(res.message)
        }
        else if (res && res.errCode === 1) {
            toast.error(res.message)
        }
        else if (res && res.errCode === 2) {
            toast.error(res.message)
        }
    }

    //Bắt email
    const checkEmail = (email) => {
        const trimmedEmail = email.trim().toLowerCase();

        // Kiểm tra xem địa chỉ email kết thúc bằng '@gmail.com' hay không
        if (trimmedEmail.endsWith("@gmail.com")) {
            return true
        } else {
            return false
        }
    };
    const handleInputChangeEmail = (event) => {
        // Lọc và loại bỏ dấu phẩy và dấu cách khi nhập vào
        const filteredValue = event.target.value.replace(/[, ]/g, "");
        setEmail(filteredValue)
    };
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Nhập Email:</label>
                            <input type="text" className="form-control"
                                value={email}
                                onChange={(event) => handleInputChangeEmail(event)}
                            />

                        </div>
                        <div className="mb-3">
                            <label className="form-label">Nhập mật khẩu:</label>
                            <input type="password" className="form-control"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Nhập lại mật khẩu:</label>
                            <input type="password" className="form-control"
                                value={password2}
                                onChange={(event) => setPassword2(event.target.value)}
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    {/* <Button variant="primary" onClick={() => handleSaveNewUser()}> */}
                    <Button variant="primary" onClick={() => handleSave(email, password, password2)}>
                        Lưu thay đổi
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalSignup