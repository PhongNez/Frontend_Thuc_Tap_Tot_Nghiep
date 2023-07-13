import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';


const ModalAddUser = (props) => {
    const { show, handleClose, title, handleChange, listUser } = props

    const [list, setList] = useState([])
    const [id, setID] = useState("")
    const [ten, setTen] = useState("")
    const [mssv, setMSSV] = useState('')
    const [sdt, setSDT] = useState("")
    const [id_lop, setIDLop] = useState('')
    const [dia_chi, setDiaChi] = useState('')

    let { LoaiPhong } = props

    const handleSave = async () => {
        console.log(id, ten, mssv, sdt, id_lop, dia_chi);
    }
    const Lop = [
        { id: 1, ten: 'Công nghệ thông tin' },
        { id: 2, ten: 'An toàn thông tin' },
        { id: 3, ten: 'Viễn thông' },
    ]
    useEffect(() => {
        setList(listUser)
    }, [listUser])
    return (
        <>
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Chọn sinh viên cần thêm:</label>
                            <select type="text" className="form-select"
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

                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Nhập tên:</label>
                            <input type="text" className="form-control"
                                value={ten}
                                onChange={(event) => setTen(event.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Nhập mã số sinh viên:</label>
                            <input type="text" className="form-control"
                                value={mssv}
                                onChange={(event) => setMSSV(event.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Nhập số điện thoại:</label>
                            <input type="text" className="form-control"
                                value={sdt}
                                onChange={(event) => setSDT(event.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Chọn lớp:</label>
                            <select type="text" className="form-select"
                                value={id_lop}
                                onChange={(event) => setIDLop(event.target.value)}
                            >
                                <option ></option>
                                {
                                    // console.log(listRoom)
                                    Lop.map((item, index) => {
                                        return (
                                            <option value={item.id}>{item.ten}</option>
                                        )
                                    })
                                }

                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Nhập địa chỉ:</label>
                            <input type="text" className="form-control"
                                value={dia_chi}
                                onChange={(event) => setDiaChi(event.target.value)}
                            />
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

export default ModalAddUser