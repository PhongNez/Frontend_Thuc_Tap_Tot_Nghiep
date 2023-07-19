import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import axios from '../../../services/Customize-axios'
import { useEffect } from 'react';
import { UserContext } from '../../../context/UserContext';
import { useContext } from 'react';


const ModalChangeOrderRoom = (props) => {
    const { show, handleClose, title, handleChange, oneRoom } = props
    const [id_day, setIdDay] = useState('')
    const [listRoom, setListRoom] = useState([])
    const { user } = useContext(UserContext)
    const handleSave = async () => {
        console.log('id_thue_phòng:', oneRoom.id, 'id_tai_khoan: ', user[0].id, 'Sl_giuong:', oneRoom.sl_giuong, 'phong moi:', oneRoom.ten);
        console.log(oneRoom);
        let res = await axios.put('/chuyenphong', { id_phong: oneRoom.id, id_tai_khoan: user[0].id, sl_giuong: oneRoom.sl_giuong, phong_moi: oneRoom.ten })
        console.log(res);
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
                            <label className="form-label">Bạn muốn chuyển qua phòng {oneRoom.ten}<h3> </h3> </label>
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

export default ModalChangeOrderRoom