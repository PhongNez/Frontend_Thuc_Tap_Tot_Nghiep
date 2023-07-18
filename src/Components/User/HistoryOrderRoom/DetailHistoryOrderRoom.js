
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';

import axios from '../../../services/Customize-axios'
import { useParams } from 'react-router-dom';

const DetailHistoryOrderRoom = (props) => {

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


    const handleChange = () => {
        setChange(!change)
        console.log(change);
    }
    let { id } = useParams();

    useEffect(() => {
        getAllHistory()
    }, [change])

    const getAllHistory = async () => {
        console.log('Id thue phong:', id);
        let res = await axios.get(`/hitory-order-room/detail?id=${id}`)
        setListHistory(res.history)
        console.log('>>> Check api: ', res);

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
                        {/* <th>Phòng</th> */}
                        {/* <th>Ngày đăng ký</th>
                        <th>Ngày hết hạn</th> */}

                        {/* <th>Số tháng</th> */}
                        <th>Trạng thái</th>
                        {/* <th>Trạng thái lịch sử</th> */}
                        <th>Ngày cập nhật</th>
                        {/* <th>Hành động</th> */}
                    </tr>
                </thead>
                <tbody>
                    {listHistory && listHistory.length > 0 && listHistory.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.id}</td>
                                {/* <td>{item.ten_phong}</td> */}
                                {/* <td>{item.ngay_dk_thue}</td> */}
                                {/* <td>{item.ngay_het_han}</td> */}

                                {/* <td>{item.so_thang}</td> */}
                                <td>{item.trang_thai === 1 ? 'Chờ xác nhận' : (item.trang_thai === 2 ? 'Đã xác nhận' : (item.trang_thai === 3 ? 'Đã hủy' : 'Đã hoàn thành'))}</td>
                                {/* <td>{item.trang_thai_lich_su}</td> */}
                                <td>{item.ngay_thay_doi}</td>

                                {/* <td> */}
                                {/* <button className='btn btn-warning mx-3' disabled={item.ten ? false : true} onClick={() => handleEditUser(item)}>Cập nhật</button> */}
                                {/* <button className='btn btn-danger' onClick={() => setIsShowModalDelete(true)}>Update</button> */}
                                {/* <button className='btn btn-danger' onClick={() => handleAddRole(item)}>Cấp quyền</button> */}
                                {/* </td> */}
                            </tr>
                        )
                    })}
                </tbody>
            </Table>


        </>
    )
}

export default DetailHistoryOrderRoom