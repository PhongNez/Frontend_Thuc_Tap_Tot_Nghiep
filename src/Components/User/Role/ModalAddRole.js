import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import axios from '../../../services/Customize-axios';

const ModalAddRole = (props) => {
    const { show, handleClose, title, handleChange, listUser, oneUser } = props

    const [list, setList] = useState([])
    const [id, setID] = useState('')
    const [themPhong, setThemPhong] = useState("")
    const [xoaPhong, setXoaPhong] = useState("")
    const [suaPhong, setSuaPhong] = useState('')
    const [idThemPhong, setIDThemPhong] = useState('')
    const [idSuaPhong, setIDSuaPhong] = useState('')
    const [idXoaPhong, setIDXoaPhong] = useState('')
    const [xemLichSuThuePhong, setXemLichSuThuePhong] = useState('')
    const [idXemLichSuThuePhong, setIDXemLichSuThuePhong] = useState('')

    //Tài khoản
    const [xemTaiKhoan, setXemTaiKhoan] = useState('')
    const [idXemTaiKhoan, setIDXemTaiKhoan] = useState('')

    //Thu tiền
    const [xemThuTien, setXemThuTien] = useState('')
    const [idXemThuTien, setIDXemThuTien] = useState('')

    //Thu tiền điện
    const [xemThuTienDien, setXemThuTienDien] = useState('')
    const [idXemThuTienDien, setIDXemThuTienDien] = useState('')

    //Xem doanh thu
    const [xemDoanhThu, setXemDoanhThu] = useState('')
    const [idXemDoanhThu, setIDXemDoanhThu] = useState('')

    //Quản lí danh mục
    const [themDanhMuc, setThemDanhMuc] = useState("")
    const [xoaDanhMuc, setXoaDanhMuc] = useState("")
    const [suaDanhMuc, setSuaDanhMuc] = useState('')
    const [idThemDanhMuc, setIDThemDanhMuc] = useState('')
    const [idSuaDanhMuc, setIDSuaDanhMuc] = useState('')
    const [idXoaDanhMuc, setIDXoaDanhMuc] = useState('')

    //Quản lí người dùng
    const [idSuaUser, setIDSuaUser] = useState('')
    const [suaUser, setSuaUser] = useState('')

    const [listRole, setListRole] = useState([])



    const handleSave = async () => {
        console.log('id nguoi dung: ', id, 'Them:', themPhong, 'Xoa:', xoaPhong, 'Sua: ', suaPhong, idSuaPhong, idThemPhong, idXoaPhong);
        let res = await axios.post('/admin/add-role',
            {
                themPhong, suaPhong, xoaPhong, ma_nhan_vien: id, idSuaPhong, idThemPhong, idXoaPhong,
                idXemTaiKhoan, xemTaiKhoan,
                idXemLichSuThuePhong, xemLichSuThuePhong,
                idXemThuTien, xemThuTien,
                idXemThuTienDien, xemThuTienDien,
                idXemDoanhThu, xemDoanhThu,
                themDanhMuc, suaDanhMuc, xoaDanhMuc, idSuaDanhMuc, idThemDanhMuc, idXoaDanhMuc,
                idSuaUser, suaUser
            })
        console.log(res);
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
    }
    const Lop = [
        { id: 1, ten: 'Công nghệ thông tin' },
        { id: 2, ten: 'An toàn thông tin' },
        { id: 3, ten: 'Viễn thông' },
    ]
    useEffect(() => {
        setList(listUser)
    }, [listUser])

    useEffect(() => {
        getRole(oneUser)
    }, [oneUser])
    const getRole = async (item) => {
        let res = await axios.get(`/admin/get-role?id=${item.id}`)
        setID(item.id)
        setListRole(res.dataRole)
        console.log('data get role:', res);
        setThemPhong('')
        setSuaPhong('')
        setXoaPhong('')
        setIDThemPhong('')
        setIDSuaPhong('')
        setIDXoaPhong('')
        setIDXemLichSuThuePhong('')
        setIDXemThuTien('')
        setIDXemThuTienDien('')
        setIDXemDoanhThu('')
        setThemDanhMuc('')
        setSuaDanhMuc('')
        setXoaDanhMuc('')
        setIDThemDanhMuc('')
        setIDSuaDanhMuc('')
        setIDXoaDanhMuc('')
        setIDXemTaiKhoan('')
        setXemTaiKhoan('')
        setIDSuaUser('')
        setSuaUser('')
        res.dataRole.map((item, index) => {
            console.log('item', item.ma_quyen);
            if (item.ma_quyen == '2') {
                setThemPhong(2)
                setIDThemPhong(item.id_phan_quyen)
            }
            else if (item.ma_quyen == '4') {
                setXoaPhong(4)
                setIDXoaPhong(item.id_phan_quyen)
            }
            else if (item.ma_quyen == '3') {
                setSuaPhong(3)
                setIDSuaPhong(item.id_phan_quyen)
            } else if (item.ma_quyen == '5') {
                setXemTaiKhoan(5)
                setIDXemTaiKhoan(item.id_phan_quyen)
            } else if (item.ma_quyen == '6') {
                setXemLichSuThuePhong(6)
                setIDXemLichSuThuePhong(item.id_phan_quyen)
            }
            else if (item.ma_quyen == '7') {
                setXemThuTien(7)
                setIDXemThuTien(item.id_phan_quyen)
            }
            else if (item.ma_quyen == '8') {
                setXemThuTienDien(8)
                setIDXemThuTienDien(item.id_phan_quyen)
            }
            else if (item.ma_quyen == '9') {
                setXemDoanhThu(9)
                setIDXemDoanhThu(item.id_phan_quyen)
            }
            if (item.ma_quyen == '10') {
                setThemDanhMuc(10)
                setIDThemDanhMuc(item.id_phan_quyen)
            }
            else if (item.ma_quyen == '11') {
                setXoaDanhMuc(11)
                setIDXoaDanhMuc(item.id_phan_quyen)
            }
            else if (item.ma_quyen == '12') {
                setSuaDanhMuc(12)
                setIDSuaDanhMuc(item.id_phan_quyen)
            } else if (item.ma_quyen == '13') {
                setSuaUser(13)
                setIDSuaUser(item.id_phan_quyen)
            }
        })
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
                            <label className="form-label">Nhân viên: {oneUser.email}</label>

                        </div>
                        <label className="form-label">Chọn quyền quản lí phòng: </label>
                        <div className="mb-3">

                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox"
                                    checked={themPhong === 2} onChange={() => setThemPhong(themPhong === 2 ? '' : 2)} />
                                <label class="form-check-label" >Thêm phòng</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox"
                                    checked={xoaPhong === 4} onChange={() => setXoaPhong(xoaPhong === 4 ? '' : 4)} />
                                <label class="form-check-label" >Xóa phòng</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox"
                                    checked={suaPhong === 3} onChange={() => setSuaPhong(suaPhong === 3 ? '' : 3)} />
                                <label class="form-check-label" >Cập nhật phòng</label>
                            </div>

                        </div>

                        <label className="form-label">Chọn quyền quản lí danh mục: </label>
                        <div className="mb-3">

                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox"
                                    checked={themDanhMuc === 10} onChange={() => setThemDanhMuc(themDanhMuc === 10 ? '' : 10)} />
                                <label class="form-check-label" >Thêm danh mục</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox"
                                    checked={xoaDanhMuc === 11} onChange={() => setXoaDanhMuc(xoaDanhMuc === 11 ? '' : 11)} />
                                <label class="form-check-label" >Xóa danh mục</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox"
                                    checked={suaDanhMuc === 12} onChange={() => setSuaDanhMuc(suaDanhMuc === 12 ? '' : 12)} />
                                <label class="form-check-label" >Cập nhật danh mục</label>
                            </div>
                        </div>
                        <label className="form-label">Chọn quyền quản lí người dùng: </label>
                        <div className="mb-3">

                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox"
                                    checked={suaUser === 13} onChange={() => setSuaUser(suaUser === 13 ? '' : 13)} />
                                <label class="form-check-label" >Cập nhật thông tin</label>
                            </div>
                        </div>
                        <label className="form-label">Chọn quyền xem: </label>
                        <div className="mb-3">
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox"
                                    checked={xemTaiKhoan === 5} onChange={() => setXemTaiKhoan(xemTaiKhoan === 5 ? '' : 5)} />
                                <label class="form-check-label" >Xem danh sách khách hàng</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox"
                                    checked={xemLichSuThuePhong === 6} onChange={() => setXemLichSuThuePhong(xemLichSuThuePhong === 6 ? '' : 6)} />
                                <label class="form-check-label" >Xem lịch sử thuê phòng</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox"
                                    checked={xemThuTien === 7} onChange={() => setXemThuTien(xemThuTien === 7 ? '' : 7)} />
                                <label class="form-check-label" >Xem Lịch sử thu tiền</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox"
                                    checked={xemThuTienDien === 8} onChange={() => setXemThuTienDien(xemThuTienDien === 8 ? '' : 8)} />
                                <label class="form-check-label" >Xem lịch sử thu tiền điện</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox"
                                    checked={xemDoanhThu === 9} onChange={() => setXemDoanhThu(xemDoanhThu === 9 ? '' : 9)} />
                                <label class="form-check-label" >Xem doanh thu</label>
                            </div>
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

export default ModalAddRole