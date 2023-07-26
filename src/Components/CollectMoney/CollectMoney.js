
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';

import axios from '../../services/Customize-axios'
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import handleFormatDate from '../configs/format-datetime';
import ModalCollectMoney from './ModalCollectMoney';

const CollectMoney = (props) => {

    const [isShowModalAddRole, setIsShowModalAddRole] = useState(false)

    const [listHistory, setListHistory] = useState([])
    const [isShowModal, setIsShowModal] = useState(false)
    const [isShowModalEdit, setIsShowModalEdit] = useState(false)
    const [isShowModalDelete, setIsShowModalDelete] = useState(false)
    const [change, setChange] = useState(false)

    const [listEdit, setListEdit] = useState([])
    const [oneUser, setOneUser] = useState([])
    const [taikhoan, setTaiKhoan] = useState('')
    const [tienPhaiDong, setTienPhaiDong] = useState('')
    const { user } = useContext(UserContext)
    const handleChange = () => {
        setChange(!change)
        console.log(change);
    }

    const handleClose = () => {
        setIsShowModal(false)
    }

    useEffect(() => {
        getAllHistory()
    }, [change])

    const getAllHistory = async () => {
        // console.log(user);
        let res = await axios.get(`/hitory-collect-money/get`)
        setListHistory(res.history)
        console.log('>>> Check api: ', res);

    }

    const handleCollect = (item) => {
        setIsShowModal(true)
        setTaiKhoan(item)
        setTienPhaiDong(item.gia * item.so_thang)
        console.log(item.gia * item.so_thang);
    }

    return (
        <><div className='text-center my-4'>
            <h4>Đơn khách hàng đã thuê</h4>

        </div>
            <Table striped bordered hover responsive>
                <thead>
                    <tr className="text-center">
                        <th>Id</th>
                        <th>Người thuê</th>
                        <th>Email</th>
                        <th>Phòng</th>
                        <th>Giá phòng</th>
                        <th>Ngày đăng ký</th>
                        <th>Ngày hết hạn</th>

                        <th>Số tháng</th>
                        <th>Trạng thái</th>

                        <th >Hành động</th>
                        <th >Chi tiết</th>
                    </tr>
                </thead>
                <tbody>
                    {listHistory && listHistory.length > 0 && listHistory.map((item, index) => {
                        return (
                            <tr key={index} className="text-center">
                                <td>{item.id}</td>
                                <td>{item.ten_tai_khoan}</td>
                                <td>{item.email}</td>
                                <td>{item.ten_phong}</td>
                                <td>{item.gia}</td>
                                <td>{handleFormatDate(item.ngay_dk_thue)}</td>
                                <td>{item.ngay_het_han}</td>

                                <td>{item.so_thang}</td>
                                <td>{item.trang_thai === 1 ? 'Chờ xác nhận' :
                                    (item.trang_thai === 2 ? 'Đã xác nhận' :
                                        (item.trang_thai === 5 ? 'Trả phòng' : 'Đã hoàn thành'))}</td>

                                <td><button className='btn btn-danger mx-3' onClick={() => handleCollect(item)}>Thu tiền</button></td>

                                <td><a href={`/history-order-room/detail/${item.id}`}>Xem chi tiết</a></td>
                            </tr>
                        )
                    })}

                </tbody>
            </Table>
            <ModalCollectMoney
                show={isShowModal}
                handleClose={handleClose}
                title={'Thu tiền'}
                taikhoan={taikhoan}
                tienPhaiDong={tienPhaiDong}
                handleChange={handleChange}
            />

        </>
    )
}

export default CollectMoney