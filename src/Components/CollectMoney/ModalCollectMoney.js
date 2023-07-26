import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from '../../services/Customize-axios'
import { toast } from 'react-toastify';

const ModalCollectMoney = (props) => {
    const { show, handleClose, title, taikhoan, tienPhaiDong, handleChange } = props
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [code, setCode] = useState("")
    const [ten, setTen] = useState('')
    const [tienThu, setTienThu] = useState(0)
    const [ghiChu, setGhiChu] = useState('')
    const [dataThuTien, setDataThuTien] = useState('')
    useEffect(() => {
        setTen(taikhoan.ten_tai_khoan)
        if (taikhoan) {
            getHistoryCollect()
        }

    }, [taikhoan])
    console.log(taikhoan);

    const getHistoryCollect = async () => {
        let res = await axios.get(`/admin/get-collect-money?id=${taikhoan.id_tai_khoan}`)
        console.log(res);
        setDataThuTien(res.dataThuTien)
    }

    const handleSave = async () => {
        console.log('id_nguoi_thue', dataThuTien[0].tien_phai_dong, dataThuTien[0].tien_da_dong, dataThuTien[0].con_no, tienThu);

        let res = await axios.post('/admin/collect-money',
            { tien_phai_dong: dataThuTien[0].tien_phai_dong, tien_da_dong: dataThuTien[0].tien_da_dong, con_no: dataThuTien[0].con_no, da_thu: tienThu, id_nguoi_thue: taikhoan.id_tai_khoan, ghi_chu: ghiChu })
        console.log(res);
        if (res && res.errCode === 0) {
            setTienThu('')
            setGhiChu('')
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
    }

    let check = dataThuTien && dataThuTien[0]
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Người thuê:{ten}</label>


                        </div>
                        <div className="mb-3">
                            <label className="form-label">Tiền phải đóng: {check && dataThuTien[0].tien_phai_dong}</label>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Tiền đã đóng: {check && dataThuTien[0].tien_da_dong}</label>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Tiền còn nợ: {check && dataThuTien[0].con_no}</label>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Nhập tiền thu:</label>
                            <input type="text" className="form-control"
                                value={tienThu}
                                onChange={(event) => setTienThu(event.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Ghi chú:</label>
                            <input type="text" className="form-control"
                                value={ghiChu}
                                onChange={(event) => setGhiChu(event.target.value)}
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

export default ModalCollectMoney