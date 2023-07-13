import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import axios from '../../../services/Customize-axios'

const ModalUpdatePrice = (props) => {
    const { show, handleClose, title, handleChange, list, listEditPrice } = props

    const [id_ctpt, setIdCTPT] = useState("")
    const [gia, setGia] = useState(0)
    const [id_loai_phong, setIdLoaiPhong] = useState(null)
    const [listRoom, setListRoom] = useState([])

    let { LoaiPhong } = props

    const handleSave = async () => {
        console.log(gia, id_loai_phong);
        let res = await axios.put('/chi-tiet-phong/update', { id: id_ctpt, gia, id_loai_phong })
        console.log(res);
        if (res && res.errCode === 0) {
            handleChange()
            handleClose()
        } else if (res && res.errCode === 1) {
            toast.error(res.message)
        }
    }
    useEffect(() => {
        setIdCTPT(listEditPrice.id_ctpt)

        setGia(listEditPrice.gia)
        setIdLoaiPhong(listEditPrice.id_loai_phong)
    }, [listEditPrice])
    return (
        <>
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Phòng: <h3>{listEditPrice.ten}</h3></label>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Nhập giá:</label>
                            <input type="text" className="form-control"
                                value={gia}
                                onChange={(event) => setGia(event.target.value)}
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

export default ModalUpdatePrice