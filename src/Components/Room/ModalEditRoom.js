import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import axios from '../../services/Customize-axios'
import { useEffect } from 'react';
import { setAuthToken } from '../../services/VerifyToken';

const ModalEditRoom = (props) => {
    const { show, handleClose, title, handleChange, listEdit } = props

    const [id_phong, setIdPhong] = useState("")
    const [ten, setTen] = useState("")
    const [anh, setAnh] = useState('')
    const [selectedImage, setSelectedImage] = useState(null);
    const [mo_ta, setMoTa] = useState("")
    const [id_day, setIdDay] = useState('')
    const [id_danh_muc, setIdDanhMuc] = useState('')
    const [trang_thai, setTrangThai] = useState('')
    let { DanhMuc, Day, TrangThai } = props
    useEffect(() => {
        setIdPhong(listEdit.id)
        setTen(listEdit.ten)
        setAnh(null)
        setMoTa(listEdit.mo_ta)
        setIdDay(listEdit.id_day)
        setIdDanhMuc(listEdit.id_danh_muc)
        setTrangThai(listEdit.trang_thai)
    }, [listEdit])

    useEffect(() => {
    }, [DanhMuc])

    const handleSave = async () => {
        console.log(ten, anh, mo_ta, id_day, id_danh_muc, trang_thai, id_phong);

        const formData = new FormData();
        formData.append("id", id_phong);
        formData.append("ten", ten);
        formData.append("anh", anh);
        formData.append("mo_ta", mo_ta);
        formData.append("id_day", id_day);
        formData.append("id_danh_muc", id_danh_muc);
        formData.append("trang_thai", trang_thai);
        let token = localStorage.getItem('token')
        console.log(token);
        setAuthToken(token)
        let res = await axios.put('/room/update', formData, { headers: { "Content-Type": "multipart/form-data" } })
        console.log(res);
        if (res && res.errCode === 0) {
            handleChange()
            setSelectedImage(null)
            handleClose()
        } else if (res && res.errCode === 1) {
            toast.error(res.message)
        } else if (res && res.errCode === 2) {
            toast.error(res.message)
        } else {
            toast.error(res.message)
        }

    }
    const handleOnChangeImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAnh(file);
            setSelectedImage(URL.createObjectURL(file));
        } else {
            setAnh(null);
            setSelectedImage(null);
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Tên phòng:</label>
                            <input type="text" className="form-control"
                                value={ten}
                                onChange={(event) => setTen(event.target.value)}
                            />

                        </div>
                        <div className="mb-3">
                            <label className="form-label">Ảnh:</label>
                            <input type="file" className="form-control"
                                onChange={(event) => handleOnChangeImage(event)}
                            />
                            {selectedImage && (
                                <div>
                                    <h6>Ảnh phòng thuê:</h6>
                                    <img src={selectedImage} alt="Selected Image" height={170} width={170} />
                                </div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Mô tả:</label>
                            <input type="text" className="form-control"
                                value={mo_ta}
                                onChange={(event) => setMoTa(event.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Dãy:</label>
                            <select type="text" className="form-select"
                                value={id_day}
                                onChange={(event) => setIdDay(event.target.value)}
                            >
                                <option ></option>
                                {Day.map((item, index) => {
                                    return (
                                        <option value={item.id}>{item.ten}</option>
                                    )
                                })
                                }
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Danh mục:</label>
                            <select type="text" className="form-select"
                                value={id_danh_muc}
                                onChange={(event) => setIdDanhMuc(event.target.value)}
                            >
                                <option ></option>
                                {DanhMuc.map((item, index) => {
                                    return (
                                        <option value={item.id}>{item.ten}</option>
                                    )
                                })
                                }
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Trạng thái:</label>
                            <select type="text" className="form-select"
                                value={trang_thai}
                                onChange={(event) => setTrangThai(event.target.value)}
                            >
                                <option></option>
                                {TrangThai.map((item, index) => {
                                    return (
                                        <option value={item.id}>{item.name}</option>
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

export default ModalEditRoom