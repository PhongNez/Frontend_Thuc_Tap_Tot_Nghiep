import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from '../../services/Customize-axios'
import { toast } from 'react-toastify';

const ModalCollectElec = (props) => {
    const { show, handleClose, title, taikhoan, tienPhaiDong, handleChange } = props
    const [id_room, setIDRoom] = useState("")
    const [so_luong, setSoLuong] = useState("")
    const [chi_so_cu, setChiSoCu] = useState("")
    const [chi_so_moi, setChiSoMoi] = useState("")
    const [don_gia, setDonGia] = useState('')
    const [thang, setThang] = useState(0)
    const [ghiChu, setGhiChu] = useState('')
    const [dataThuTien, setDataThuTien] = useState('')
    const [listRoom, setListRoom] = useState([])
    const [listPerson, setListPerson] = useState([])

    useEffect(() => {

        getRoom()

    }, [])
    const getRoom = async () => {
        let res = await axios.get('/order-room/get')
        console.log(res);
        setListRoom(res.dataRoom)
        setListPerson(res.listCountPerson)
    }
    const handleChiSoCu = (event) => {
        const value = event.target.value;

        // Kiểm tra nếu giá trị không phải là số thì không cập nhật giá trị
        if (isNaN(value) || value.includes('.') || value.includes(' ')) {
            return;
        }

        setChiSoCu(value);
    };
    const handleChiSoMoi = (event) => {
        const value = event.target.value;

        // Kiểm tra nếu giá trị không phải là số thì không cập nhật giá trị
        if (isNaN(value) || value.includes('.') || value.includes(' ')) {
            return;
        }

        setChiSoMoi(value);
    };
    const handleDonGia = (event) => {
        const value = event.target.value;

        // Kiểm tra nếu giá trị không phải là số thì không cập nhật giá trị
        if (isNaN(value) || value.includes('.') || value.includes(' ')) {
            return;
        }

        setDonGia(value);
    };

    const handleThang = (event) => {
        const value = event.target.value;

        // Kiểm tra nếu giá trị không phải là số thì không cập nhật giá trị
        if (isNaN(value) || value.includes('.') || value.includes(' ')) {
            return;
        }
        if (Number(value) > 12) {
            return;
        }

        setThang(value);
    };
    const countListPerson = (itemRoom) => {
        let dem = 0

        if (itemRoom) {
            listPerson.map((item, index) => {
                if (item.id_phong == itemRoom.id) {
                    dem += 1
                }
            })
        }
        return dem
    }

    const handleSave = async () => {
        console.log(id_room, so_luong, chi_so_cu, chi_so_moi, don_gia, thang);

        if (listRoom && listRoom.length > 0) {
            const foundService = listRoom.find((item) =>
                item.id == id_room
            );


            console.log(foundService);
            console.log('Phong: ', countListPerson(foundService));
            let res = await axios.post('/admin/collect-elec',
                { id_phong: id_room, so_luong, chi_so_cu, chi_so_moi, don_gia, thang, so_luong: countListPerson(foundService) })
            console.log(res);
            // console.log(res);
            if (res && res.errCode === 0) {

                handleClose()
                handleChange()
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
                            <label className="form-label">Nhập tháng:</label>
                            <input type="text" className="form-control"
                                value={thang}
                                onChange={(event) => handleThang(event)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Chọn phòng:{ }</label>
                            <select type="text" className="form-select"
                                value={id_room}
                                onChange={(event) => setIDRoom(event.target.value)}

                            >
                                <option ></option>
                                {
                                    listRoom && listRoom.map((item, index) => {

                                        return (

                                            <option value={item.id}>{item.ten}</option>
                                        )

                                    })
                                }

                            </select>

                        </div>
                        <div className="mb-3">
                            <label className="form-label">Nhập chỉ số củ:</label>
                            <input type="text" className="form-control"
                                value={chi_so_cu}
                                onChange={(event) => handleChiSoCu(event)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Nhập chỉ số mới:</label>
                            <input type="text" className="form-control"
                                value={chi_so_moi}
                                onChange={(event) => handleChiSoMoi(event)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Nhập đơn giá: </label>
                            <input type="text" className="form-control"
                                value={don_gia}
                                onChange={(event) => handleDonGia(event)}
                            />
                        </div>

                        <div className="mb-3">
                            {/* <label className="form-label">Ghi chú:</label>
                            <input type="text" className="form-control"
                                value={ghiChu}
                                onChange={(event) => setGhiChu(event.target.value)}
                            /> */}
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {/* <Button variant="primary" onClick={() => handleSaveNewUser()}> */}
                    <Button variant="primary" onClick={() => handleSave()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalCollectElec