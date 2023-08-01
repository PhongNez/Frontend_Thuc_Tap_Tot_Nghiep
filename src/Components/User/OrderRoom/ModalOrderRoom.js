import { useContext } from 'react';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import { UserContext } from '../../../context/UserContext';
import axios from '../../../services/Customize-axios'
import { useNavigate } from 'react-router-dom';


const ModalOrderRoom = (props) => {
    const { show, handleClose, title, handleChange, listUser, oneRoom } = props

    const [list, setList] = useState([])
    const [id, setID] = useState("")
    const [ten, setTen] = useState("")
    const [selectedOption, setSelectedOption] = useState('');

    const [month, setMonth] = useState("")
    const [year, setYear] = useState("")
    const navigate = useNavigate();
    const { user } = useContext(UserContext)


    const handleOptionChange = (event) => {
        setMonth('')
        setSelectedOption(event.target.value);
    };

    const handleInputMonthYear = (event, date) => {
        const value = event.target.value;

        // Kiểm tra nếu giá trị không phải là số thì không cập nhật giá trị
        if (isNaN(value) || value.includes('.') || value.includes(' ')) {
            return;
        }
        if (date == 'month' && Number(value) > 48) {
            return;
        }
        if (date == 'year' && Number(value) > 4) {
            return;
        }
        setMonth(value);
    };

    const handleSave = async () => {
        let id_tai_khoan = user[0].id
        let id_phong = oneRoom.id
        let so_thang = Number(month)
        let checkMonthYear = selectedOption
        const expirationDate = calculateExpirationDate(so_thang);

        let so_luong_giuong = oneRoom.sl_giuong
        const formattedDate = formatDate(expirationDate);
        console.log(formattedDate);

        console.log('số ngày:', expirationDate);
        console.log('User been room:', user);
        console.log(user[0].id, oneRoom.id, selectedOption, month, so_luong_giuong);
        console.log(user[0].ten, user[0].mssv, user[0].sdt);
        if (!user[0].ten || !user[0].mssv || !user[0].sdt) {
            toast.error('Vui lòng cập nhật thông tin cá nhân để tiếp tục thuê')
            return
        }
        let res = await axios.post('/order-room/create', { id_tai_khoan, id_phong, so_thang, checkMonthYear, sl_giuong: so_luong_giuong })
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
        setList(oneRoom)
    }, [oneRoom])

    const calculateExpirationDate = (months) => {
        const currentDate = new Date();
        console.log('Năm hiện tịa', currentDate);
        const expirationDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + months, currentDate.getDate());
        return expirationDate;
    };

    const formatDate = (date) => {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };


    return (
        <>
            <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>

                        <div className="mb-3">
                            <label className="form-label">Phòng thuê: {list && list.ten}</label>
                            {/* <input type="text" className="form-control"
                                value={ten}
                                onChange={(event) => setTen(event.target.value)}
                            /> */}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Lựa chọn tháng hoặc năm:</label>
                        </div>

                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio"
                                value={'month'} checked={selectedOption === 'month'}
                                onChange={handleOptionChange}

                            />
                            <label className="form-check-label">
                                Chọn tháng
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio"
                                value={'year'} checked={selectedOption === 'year'}
                                onChange={handleOptionChange}
                            />
                            <label className="form-check-label" >
                                Chọn năm
                            </label>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">{selectedOption === 'month' ? 'Nhập số tháng muốn thuê:' : 'Nhập số năm muốn thuê:'}</label>
                            <input type="text" className="form-control"
                                value={month}
                                onChange={(event) => handleInputMonthYear(event, selectedOption)}
                                placeholder={selectedOption === 'month' ? 'Nhập tối đa 48 tháng' : 'Nhập tối đa 4 năm'}
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
                        Xác Nhận Thuê
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalOrderRoom