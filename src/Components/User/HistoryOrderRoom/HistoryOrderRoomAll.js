
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';

import axios from '../../../services/Customize-axios'
import { useContext } from 'react';
import { UserContext } from '../../../context/UserContext';

const HistoryOrderRoomAll = (props) => {

    const [isShowModalAddRole, setIsShowModalAddRole] = useState(false)

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
        let res = await axios.put(`/admin/xacnhan?id=${item.id}`)
        console.log(res);
    }

    const handleHuy = async (item) => {
        console.log(item);
        let res = await axios.put(`/admin/huy?id=${item.id}`)
        console.log(res);
    }


    return (
        <><div className='my-3 add-new'>
            <span><b>Danh sách người dùng:</b></span>
            <div>

                <button className='btn btn-success' onClick={() => setIsShowModalAdd(true)}>Thêm thông tin</button></div>
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
                                    {item.trang_thai === 1 ? <button className='btn btn-primary' onClick={() => handleXacNhan(item)}>Xác nhận</button> : (item.trang_thai === 2 ? <button className='btn btn-primary mx-3'>Đã hoàn thành</button> : '')}
                                    {item.trang_thai === 1 ? <button className='btn btn-danger mx-3' onClick={() => handleHuy(item)}>Hủy</button> : ''}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>


        </>
    )
}

export default HistoryOrderRoomAll