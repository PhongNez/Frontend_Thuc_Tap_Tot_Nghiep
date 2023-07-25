import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from '../../services/Customize-axios'

const ModalForgot = (props) => {
    const { show, handleClose, title } = props
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [code, setCode] = useState("")

    const btnSendCode = async () => {
        let res = await axios.post('/forgot-password', { email })
        console.log('Hello', res);
    }
    const handleSave = async () => {
        let res = await axios.put('/auth/new-password-forgot', { email })
        console.log(res);
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
                            <input type="text" className="form-control"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {/* <Button variant="primary" onClick={() => handleSaveNewUser()}> */}
                    <Button variant="primary" onClick={() => handleSave(email, password)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalForgot