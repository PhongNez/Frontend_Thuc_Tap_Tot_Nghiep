import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from '../../services/Customize-axios'
import { toast } from 'react-toastify';
import handleFormatDate from '../configs/format-date';

const ModalCollectMoney = (props) => {
    const { show, handleClose, title, taikhoan, tienPhaiDong, handleChange } = props
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [code, setCode] = useState("")
    const [ten, setTen] = useState('')
    const [tienThu, setTienThu] = useState(0)
    const [ghiChu, setGhiChu] = useState('')
    const [dataThuTien, setDataThuTien] = useState('')
    const [listMonth, setListMonth] = useState([[]])
    const [month, setMonth] = useState('')
    const [oneMonth, setOneMonth] = useState('')
    useEffect(() => {
        setTen(taikhoan.ten_tai_khoan)
        if (taikhoan) {
            getHistoryCollect()
            handleMonthCollect()
        }

    }, [taikhoan])
    console.log(taikhoan);

    const getHistoryCollect = async () => {
        let res = await axios.get(`/admin/get-collect-money?id=${taikhoan.id_tai_khoan}`)
        console.log(res);
        // setDataThuTien(res.dataThuTien)
    }

    useEffect(() => {
        listMonth && listMonth.map((item, index) => {
            if (month == item.id) {
                setOneMonth(item)
                console.log('hello phong: ', item);
                return
            }
        })
    }, [month])

    const handleSave = async () => {
        // console.log('id_nguoi_thue', dataThuTien[0].tien_phai_dong, dataThuTien[0].tien_da_dong, dataThuTien[0].con_no, tienThu);

        let res = await axios.post('/admin/collect-money',
            { tien_phai_dong: oneMonth.tien_phai_dong, tien_da_dong: oneMonth.tien_da_dong, con_no: oneMonth.con_no, da_thu: oneMonth, id_nguoi_thue: taikhoan.id_tai_khoan, month, ghi_chu: ghiChu })
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

    const handleCloseNew = (event) => {
        handleClose()
        setOneMonth([])
        setMonth('')
    };

    const handleMonthCollect = async () => {
        // if (user && user[0] && user[0].id) {
        let res = await axios.get(`/history-collect-money-new?id=${taikhoan.id_tai_khoan}`)
        setListMonth(res.dataThuTien)
        console.log('>>> Check api thu tiền: ', res);
        // }
    }
    console.log();

    const handleFormatPrice = (price) => {
        const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
        return formattedPrice
    }

    let check = dataThuTien && dataThuTien[0]
    return (
        <>
            <Modal show={show} onHide={handleCloseNew}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Người thuê: {ten}</label>


                        </div>
                        <div className="mb-3">
                            <label className="form-label">Tiền phải đóng: {oneMonth && oneMonth.tien_phai_dong && handleFormatPrice(oneMonth.tien_phai_dong)}</label>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Tiền đã đóng: {oneMonth && (oneMonth.tien_phai_dong - oneMonth.con_no) ? handleFormatPrice(oneMonth.tien_phai_dong - oneMonth.con_no) : 0}</label>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Tiền còn nợ: {oneMonth && oneMonth.con_no && handleFormatPrice(oneMonth.con_no)}</label>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Trạng thái: {oneMonth && oneMonth.trang_thai == 1 ? 'Chưa thu' : (oneMonth.trang_thai == 2 ? 'Đã thu' : '')}</label>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Chọn tháng cần thanh toán:</label>
                            <select type="text" className="form-select"
                                value={month}
                                onChange={(event) => setMonth(event.target.value)}
                            >
                                <option ></option>
                                {
                                    // console.log(list)
                                    listMonth.map((item, index) => {
                                        return (
                                            <option value={item.id}>{item.thang && handleFormatDate(item.thang)}</option>
                                        )
                                    })
                                }

                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label"><h5>Tiền cần thanh toán:</h5> {oneMonth && oneMonth.con_no && handleFormatPrice(oneMonth.con_no)}</label>
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
                    <Button variant="secondary" onClick={handleCloseNew}>
                        Đóng
                    </Button>
                    {/* <Button variant="primary" onClick={() => handleSaveNewUser()}> */}
                    <Button variant="primary" onClick={() => handleSave()}>
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalCollectMoney