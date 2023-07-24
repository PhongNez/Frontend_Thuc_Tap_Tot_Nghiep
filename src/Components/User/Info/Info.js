import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import axios from '../../../services/Customize-axios';
import { useContext } from 'react';
import { UserContext } from '../../../context/UserContext';

const Info = () => {
    const [change, setChange] = useState(false)
    const [list, setList] = useState([])
    const [id, setID] = useState("")
    const [email, setEmail] = useState("")
    const [ten, setTen] = useState("")
    const [mssv, setMSSV] = useState('')
    const [sdt, setSDT] = useState("")
    const [id_lop, setIDLop] = useState('')
    const [dia_chi, setDiaChi] = useState('')
    const { user, logout, verifiToken, isLogin, role } = useContext(UserContext);

    const handleSave = async () => {
        console.log(id, ten, mssv, sdt, id_lop, dia_chi);
        let res = await axios.put(`/auth/update-user?id=${id}`, {
            ten, mssv, sdt, id_lop, dia_chi
        })
        console.log(res);
        if (res && res.errCode === 0) {
            toast.success(res.message)
        } else if (res && res.errCode === 1) {
            toast.error(res.message)
        }
    }
    const Lop = [
        { id: 1, ten: 'Công nghệ thông tin' },
        { id: 2, ten: 'An toàn thông tin' },
        { id: 3, ten: 'Viễn thông' },
    ]

    const handleChange = () => {
        setChange(!change)
        console.log(change);
    }

    useEffect(() => {
        getInfo()
        // setList(list)

    }, [user])

    const getInfo = async () => {
        if (user && user[0] && user[0].id) {
            // let res = await axios.get(`/admin/get-user?id=${user[0].id}`)
            // console.log(res);

            // if (res && res.dataUser) {
            //     setList(res.dataUser)

            // }
            setID(user[0].id)
            setEmail(user[0].email)
            setTen(user[0].ten)
            setMSSV(user[0].mssv)
            setSDT(user[0].sdt)
            setIDLop(user[0].id_lop)
            setDiaChi(user[0].dia_chi)

        }
    }

    return (
        <>

            <div className="login-container col-12 col-sm-4">
                <div>
                    <label className="form-label">Email sinh viên: {email}</label>

                </div>
                <div >
                    <label className="form-label">Nhập tên:</label>
                    <input type="text" className="form-control"
                        value={ten}
                        onChange={(event) => setTen(event.target.value)}
                    />
                </div>
                <div>
                    <label className="form-label">Nhập mã số sinh viên:</label>
                    <input type="text" className="form-control"
                        value={mssv}
                        onChange={(event) => setMSSV(event.target.value)}
                    />
                </div>
                <div >
                    <label className="form-label">Nhập số điện thoại:</label>
                    <input type="text" className="form-control"
                        value={sdt}
                        onChange={(event) => setSDT(event.target.value)}
                    />
                </div>
                <div >
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
                <button className='btn btn-primary' onClick={() => handleSave()}>Lưu thông tin</button></div>

        </>
    )
}

export default Info