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
    const [id_room, setIDRoom] = useState('')
    const { user } = useContext(UserContext)
    const [oneRoomModal, setOneRoomModal] = useState('')

    const handleSave = async () => {

        console.log('Chuyển phòng: ', oneRoomModal);
        console.log('Id phong: ', id_room, 'id tai khoan: ', user[0].id, 'Phong moi: ', oneRoom.ten, 'sl_giuong: ', oneRoomModal.sl_giuong, oneRoomModal);

        console.log(oneRoomModal.gia * oneRoom.so_thang);
        // tien_phai_dong: item.gia * item.so_thang, tien_da_dong: 0, con_no: item.gia * item.so_thang, da_thu: 0
        // id_phong, id_tai_khoan, sl_giuong, phong_moi
        if (!id_room) {
            toast.error('Bạn chưa chọn phòng né!')
            return
        }
        let res = await axios.put(`/chuyenphong`,
            { id_phong: id_room, id_tai_khoan: user[0].id, sl_giuong: oneRoomModal.sl_giuong, phong_moi: oneRoomModal.ten, tien_phai_dong: oneRoomModal.gia })
        console.log(res);
        // // console.log(res);
        if (res && res.errCode === 0) {
            handleChange()
            handleClose()
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

    useEffect(() => {
        getRoom()
    }, [user])

    useEffect(() => {
        listRoom && listRoom.map((item, index) => {
            if (id_room == item.id) {
                setOneRoomModal(item)
                console.log(item);
                return
            }
        })
    }, [id_room])

    const getRoom = async () => {
        let res = await axios.get('/order-room/get')
        console.log(res);
        setListRoom(res.dataRoom)
        console.log('Rôm one:', oneRoom);
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
                            <label className="form-label">Chọn phòng để chuyển:</label>
                            <select type="text" className="form-select"
                                value={id_room}
                                onChange={(event) => setIDRoom(event.target.value)}

                            >
                                <option ></option>
                                {
                                    // console.log(oneRoom)
                                    listRoom && listRoom.map((item, index) => {
                                        if (oneRoom.id_phong != item.id) {
                                            return (

                                                <option value={item.id}>{item.ten}</option>
                                            )
                                        }
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
                        Đồng ý
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalChangeOrderRoom