import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from '../../services/Customize-axios'
import { toast } from 'react-toastify';

const ModalForgot = (props) => {
    const { show, handleClose, title } = props
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [code, setCode] = useState("")

    const btnSendCode = async () => {
        let res = await axios.post('/forgot-password', { email })
        console.log('Hello', res);
        if (res && res.errCode === 0) {
            toast.success(res.message)
        }
        else if (res && res.errCode === 1) {
            toast.error(res.message)
        }
        else if (res && res.errCode === 2) {
            toast.error(res.message)
        }

    }
    const handleSave = async () => {
        let res = await axios.put('/auth/new-password-forgot', { code, email, mat_khau_moi: password })
        console.log(res);
        if (res && res.errCode === 0) {
            setEmail('')
            setCode('')
            setPassword('')
            handleClose()
            toast.success(res.message)
        }
        else if (res && res.errCode === 1) {
            toast.error(res.message)
        }
        else if (res && res.errCode === 2) {
            toast.error(res.message)
        } else {
            toast.error(res.message)
        }
    }
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
                                onChange={(event) => setEmail(event.target.value)}
                            />

                        </div>
                        <div className="mb-3">
                            <label className="form-label">Nhập mã code:</label>
                            <div className="input-group">
                                <input type="text" className="form-control"
                                    value={code}
                                    onChange={(event) => setCode(event.target.value)}
                                />
                                <button className='btn btn-primary' type="button" onClick={() => btnSendCode()}>Gửi mã</button>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Nhập mật khẩu:</label>
                            <input type="password" className="form-control"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    {/* <Button variant="primary" onClick={() => handleSaveNewUser()}> */}
                    <Button variant="primary" onClick={() => handleSave(email, password)}>
                        Lưu thay đổi
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalForgot