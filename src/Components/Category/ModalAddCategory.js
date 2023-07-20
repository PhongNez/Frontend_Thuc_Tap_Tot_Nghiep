import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import axios from '../../services/Customize-axios'

const ModalAddCategory = (props) => {
    const { show, handleClose, title, handleChange, listUser } = props

    const [list, setList] = useState([])
    const [id, setID] = useState("")
    const [ten, setTen] = useState("")

    let { LoaiPhong } = props

    const handleSave = async () => {
        console.log(id, ten);
        // /room/category/create
        let res = await axios.post('/room/category/create', { id, ten })
        console.log(res);
        if (res && res.errCode === 0) {
            handleChange()
            setTen('')
            setID('')
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

    useEffect(() => {
    }, [])
    return (
        <>
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Nhập id danh mục:</label>
                            <input type="text" className="form-control"
                                value={id}
                                onChange={(event) => setID(event.target.value)}
                            />
                        </div>
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

export default ModalAddCategory