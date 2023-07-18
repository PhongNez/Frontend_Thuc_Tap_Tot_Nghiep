
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';

import axios from '../../../services/Customize-axios'
import { useContext } from 'react';
import { UserContext } from '../../../context/UserContext';
import ModalChangeOrderRoom from '../OrderRoom/ModalChangeOrderRoom';

const HistoryOrderRoom = (props) => {

    const [isShowModalAddRole, setIsShowModalAddRole] = useState(false)

    const [listHistory, setListHistory] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [totalUsers, setTotalUsers] = useState(0)
    const [isShowModal, setIsShowModal] = useState(false)

    const [change, setChange] = useState(false)

    const [listEdit, setListEdit] = useState([])
    const [oneRoom, setOneRoom] = useState([])

    const { user } = useContext(UserContext)
    const handleChange = () => {
        setChange(!change)
        console.log(change);
    }

    useEffect(() => {
        getAllHistory()
    }, [user])

    const getAllHistory = async () => {
        // console.log(user);
        if (user && user[0] && user[0].id) {
            let res = await axios.get(`/history/get?id=${user[0].id}`)
            setListHistory(res.history)
            console.log('>>> Check api: ', res);
        }
    }

    const handleXoa = async (item) => {
        console.log(item);
        let res = await axios.delete(`/xoa?id=${item.id}`)
        console.log(res);
    }

    const handleClose = () => {
        setIsShowModal(false)
    }

    const handleChangOrderRoom = (item) => {
        console.log(item);
        setOneRoom(item)
        setIsShowModal(true)
    }

    return (
        <><div className='my-3 add-new'>
            <span><b>Danh sách người dùng:</b></span>
            <div>

                <button className='btn btn-success'>Thêm thông tin</button></div>
        </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Phòng</th>
                        <th>Ngày đăng ký</th>
                        <th>Ngày hết hạn</th>

                        <th>Số tháng</th>
                        <th>Trạng thái</th>

                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {listHistory && listHistory.length > 0 && listHistory.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.ten_phong}</td>
                                <td>{item.ngay_dk_thue}</td>
                                <td>{item.ngay_het_han}</td>

                                <td>{item.so_thang}</td>
                                <td>{item.trang_thai === 1 ? 'Chờ xác nhận' : (item.trang_thai === 2 ? 'Đã xác nhận' : 'Đã hoàn thành')}</td>


                                <td>
                                    {/* <button className='btn btn-warning mx-3' disabled={item.ten ? false : true} onClick={() => handleEditUser(item)}>Cập nhật</button> */}
                                    {/* <button className='btn btn-danger' onClick={() => setIsShowModalDelete(true)}>Update</button> */}
                                    {/* <button className='btn btn-danger' onClick={() => handleAddRole(item)}>Cấp quyền</button> */}
                                    {item.trang_thai === 1 ? <button className='btn btn-danger mx-3' onClick={() => handleXoa(item)}>Xóa</button> : (item.trang_thai === 2 ? <button className='btn btn-warning mx-3' onClick={() => handleChangOrderRoom(item)}>Chuyển phòng</button> : '')}
                                </td>
                                <td>
                                    <a href={`/history-order-room/detail/${item.id}`}>Xem chi tiết</a></td>

                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <ModalChangeOrderRoom
                show={isShowModal}
                handleClose={handleClose}
                oneRoom={oneRoom}
                title={'Chuyển phòng'}
            />

        </>
    )
}

export default HistoryOrderRoom