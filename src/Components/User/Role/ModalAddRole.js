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

    const [listRole, setListRole] = useState([])

    const handleSave = async () => {
        console.log('id nguoi dung: ', id, 'Them:', themPhong, 'Xoa:', xoaPhong, 'Sua: ', suaPhong, idSuaPhong, idThemPhong, idXoaPhong);
        let res = await axios.post('/admin/add-role', { themPhong, suaPhong, xoaPhong, ma_nhan_vien: id, idSuaPhong, idThemPhong, idXoaPhong })
        console.log(res);
        handleChange()
        handleClose()
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
                            {/* <select type="text" className="form-select"
                                value={id}
                                onChange={(event) => setID(event.target.value)}
                            >
                                <option ></option>
                                {
                                    // console.log(list)
                                    list.map((item, index) => {
                                        return (
                                            <option value={item.id}>{item.email}</option>
                                        )
                                    })
                                }

                            </select> */}
                        </div>
                        <label className="form-label">Chọn quyền: </label>
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