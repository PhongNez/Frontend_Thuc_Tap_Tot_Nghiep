import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import axios from '../../services/Customize-axios'
import { useEffect } from 'react';

const ModalEditCategory = (props) => {
    const { show, handleClose, title, handleChange, listEdit } = props

    const [id, setID] = useState("")
    const [ten, setTen] = useState("")

    useEffect(() => {
        setTen(listEdit.ten)
        setID(listEdit.id)
    }, [listEdit])

    const handleSave = async () => {
        console.log(ten, id);
        let res = await axios.put('/room/category/update', { id, ten })
        console.log(res);
        if (res && res.errCode === 0) {
            handleChange()
            handleClose()
        } else if (res && res.errCode === 1) {
            toast.error(res.message)
        } else if (res && res.errCode === 2) {
            toast.error(res.message)
        }

    }

    return (
        <>
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Nhập tên danh mục:</label>
                            <input type="text" className="form-control"
                                value={ten}
                                onChange={(event) => setTen(event.target.value)}
                            />

                        </div>

                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    {/* <Button variant="primary" onClick={() => handleSaveNewUser()}> */}
                    <Button variant="primary" onClick={() => handleSave()}>
                        Lưu thay đổi
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalEditCategory