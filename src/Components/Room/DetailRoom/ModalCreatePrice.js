import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import axios from '../../../services/Customize-axios'

const ModalCreatePrice = (props) => {
    const { show, handleClose, title, handleChange, list } = props

    const [id_phong, setIdPhong] = useState("")
    const [gia, setGia] = useState(0)
    const [id_loai_phong, setIdLoaiPhong] = useState("")
    const [listRoom, setListRoom] = useState([])

    let { LoaiPhong } = props

    const handleCreatePrice = (event) => {
        const value = event.target.value;

        // Kiểm tra nếu giá trị không phải là số thì không cập nhật giá trị
        if (isNaN(value) || value.includes('.') || value.includes(' ')) {
            return;
        }

        setGia(value);
    };

    const handleSave = async () => {
        console.log(id_phong, gia, id_loai_phong);
        let res = await axios.post('/chi-tiet-phong/create', {
            id_phong, gia, id_loai_phong
        })
        console.log(res);
        if (res && res.errCode === 0) {
            handleChange()
            setIdPhong('')
            setGia(0)
            setIdLoaiPhong('')
            handleClose()
            toast.error(res.message)
        }
        else if (res && res.errCode === 1) {
            toast.error(res.message)
        }
        else {
            toast.error(res.message)
        }
    }

    useEffect(() => {
        setListRoom(list)
    }, [list])
    return (
        <>
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Chọn phòng:</label>
                            <select type="text" className="form-select"
                                value={id_phong}
                                onChange={(event) => setIdPhong(event.target.value)}
                            >
                                <option ></option>
                                {
                                    listRoom.map((item, index) => {
                                        return (
                                            <option value={item.id}>{item.ten}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Nhập giá:</label>
                            <input type="text" className="form-control"
                                value={gia}
                                onChange={(event) => handleCreatePrice(event)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Chọn loại phòng:</label>
                            <select type="text" className="form-select"
                                value={id_loai_phong}
                                onChange={(event) => setIdLoaiPhong(event.target.value)}
                            >
                                <option ></option>
                                {
                                    // console.log(listRoom)
                                    LoaiPhong.map((item, index) => {
                                        return (
                                            <option value={item.id}>{item.sl_giuong} người</option>
                                        )
                                    })
                                }

                            </select>
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

export default ModalCreatePrice