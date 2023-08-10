import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import axios from '../../../services/Customize-axios'
import { useEffect } from 'react';
import { UserContext } from '../../../context/UserContext';
import { useContext } from 'react';


const ModalDaHoanThanh = (props) => {
    const { show, handleClose, title, handleChange, oneRoom } = props
    const [id_day, setIdDay] = useState('')
    const [listRoom, setListRoom] = useState([])
    const { user } = useContext(UserContext)

    const handleSave = async () => {

        let res = await axios.put(`/admin/dahoanthanh?id=${oneRoom.id}`)
        await handleDeleteDonChuaDong(oneRoom)
        console.log(res);
        // console.log(res);
        if (res && res.errCode === 0) {
            handleChange()
            handleClose()
            toast.success(res.message)
        }
        else if (res && res.errCode === 1) {
            toast.error(res.message)
        }
        // else if (res && res.errCode === 2) {
        //     toast.error(res.message)
        // }
        // else if (res && res.errCode === 3) {
        //     toast.error(res.message)
        // }
    }

    const handleDeleteDonChuaDong = async (item) => {
        let res = await axios.delete(`/admin/xoa-don-chua-dong?id=${item.id_tai_khoan}`)
    }
    useEffect(() => {
        getRoom()
    }, [user])

    const getRoom = async () => {
        let res = await axios.get('/order-room/get')
        console.log(res);
        setListRoom(res.dataRoom)
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
                            <label className="form-label">Bạn có chắc phòng {oneRoom && oneRoom.ten_phong} đã hoàn thành  </label>
                            {/* <input type="text" className="form-control"
                                value={ten}
                                onChange={(event) => setTen(event.target.value)}
                            /> */}

                        </div>

                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    {/* <Button variant="primary" onClick={() => handleSaveNewUser()}> */}
                    <Button variant="primary" onClick={() => handleSave()}>
                        Đồng ý
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalDaHoanThanh