
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';

import axios from '../../../services/Customize-axios'
import { useContext } from 'react';
import { UserContext } from '../../../context/UserContext';
import './History.scss'
import handleFormatDate from '../../configs/format-datetime';
import ModalDaHoanThanh from './ModalDaHoanThanh';

const HistoryOrderRoomAll = (props) => {

    const [isShowModal, setIsShowModal] = useState(false)
    const [oneRoom, setOneRoom] = useState([])
    const [listHistory, setListHistory] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [totalUsers, setTotalUsers] = useState(0)
    const [isShowModalAdd, setIsShowModalAdd] = useState(false)
    const [isShowModalEdit, setIsShowModalEdit] = useState(false)
    const [isShowModalDelete, setIsShowModalDelete] = useState(false)
    const [change, setChange] = useState(false)

    const [listEdit, setListEdit] = useState([])
    const [oneUser, setOneUser] = useState([])

    const { user } = useContext(UserContext)

    const handleClose = () => {
        setIsShowModal(false)
    }

    const handleChange = () => {
        setChange(!change)
        console.log(change);
    }

    useEffect(() => {
        getAllHistory()
    }, [change])

    const getAllHistory = async () => {
        // console.log(user);
        let res = await axios.get(`/history/get`)
        setListHistory(res.history)
        console.log('>>> Check api: ', res);

    }
    const handleXacNhan = async (item) => {
        console.log(item);
        console.log('tien_phai_dong', item.gia);//1 tháng
        console.log('tien_da_dong', 0);// bỏ
        console.log('con_no', item.gia);//
        console.log('da_thu', 0);
        console.log('id_nguoi_thue', 0);

        let res = await axios.put(`/admin/xacnhan?id=${item.id}`,
            { tien_phai_dong: item.gia, con_no: item.gia, da_thu: 0, id_nguoi_thue: item.id_tai_khoan })
        console.log(res);
        handleChange()
    }

    const handleHuy = async (item) => {
        console.log(item);
        let res = await axios.put(`/admin/huy?id=${item.id}`)
        console.log(res);
        handleChange()
    }

    const handleDaHoanThanh = async (item) => {
        setIsShowModal(true)
        setOneRoom(item)
        console.log(item);
    }

    const handleHuyTraPhong = async (item) => {
        console.log(item);
        let res = await axios.put(`/huy-tra?id=${item.id}`)
        console.log(res);
        handleChange()
    }

    const handleFormatPrice = (price) => {
        const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
        return formattedPrice
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
                                <td>{item.gia && handleFormatPrice(item.gia)}</td>
                                <td>{item.ngay_dk_thue && handleFormatDate(item.ngay_dk_thue)}</td>
                                <td>{item.ngay_het_han && handleFormatDate(item.ngay_het_han)}</td>

                                <td>{item.so_thang}</td>
                                <td>{item.trang_thai === 1 ? 'Chờ xác nhận' :
                                    (item.trang_thai === 2 ? 'Đã xác nhận' :
                                        (item.trang_thai === 5 ? 'Trả phòng' : 'Đã hoàn thành'))}</td>


                                <td>
                                    {/* <button className='btn btn-warning mx-3' disabled={item.ten ? false : true} onClick={() => handleEditUser(item)}>Cập nhật</button> */}
                                    {/* <button className='btn btn-danger' onClick={() => setIsShowModalDelete(true)}>Update</button> */}
                                    {/* <button className='btn btn-danger' onClick={() => handleAddRole(item)}>Cấp quyền</button> */}
                                    {item.trang_thai === 1 ? <button className='btn btn-primary' onClick={() => handleXacNhan(item)}>Xác nhận</button> :
                                        (item.trang_thai === 2 ? <button className='btn btn-primary mx-3' onClick={() => handleDaHoanThanh(item)}>Đã hoàn thành</button> :
                                            (item.trang_thai === 5 ? <button className='btn btn-primary mx-3' onClick={() => handleDaHoanThanh(item)}>Xác nhận</button> : ''))}
                                    {item.trang_thai === 1 ? <button className='btn btn-danger mx-3' onClick={() => handleHuy(item)}>Hủy</button> : ''}
                                </td>
                                <td><a href={`/history-order-room/detail/${item.id}`}>Xem chi tiết</a></td>
                            </tr>
                        )
                    })}

                </tbody>
            </Table>
            <ModalDaHoanThanh
                show={isShowModal}
                handleClose={handleClose}
                oneRoom={oneRoom}
                handleChange={handleChange}
                title={'Người thuê đã hoàn thành việc thuê phòng'}
            />

        </>
    )
}

export default HistoryOrderRoomAll