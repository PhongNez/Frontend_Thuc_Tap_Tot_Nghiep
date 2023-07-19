
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';

import axios from '../../../services/Customize-axios'
import { useParams } from 'react-router-dom';
import moment from 'moment'
import handleFormatDate from '../../configs/format-datetime';

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
        <><div className='text-center my-4'>
            <h4>Lịch sử  thay đổi của đơn số {id}</h4>
        </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        {/* <th>Phòng</th> */}
                        <th>Phòng cũ</th>
                        <th>Chuyển qua phòng</th>

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
                                <td>{item.phong_xua}</td>
                                <td>{item.phong_moi}</td>

                                {/* <td>{item.so_thang}</td> */}
                                <td>{item.trang_thai === 1 ? 'Chờ xác nhận' : (item.trang_thai === 2 ? 'Đã xác nhận' : (item.trang_thai === 3 ? 'Đã hủy' : (item.trang_thai === 4 ? 'Đã hoàn thành' : 'Chuyển phòng')))}</td>
                                {/* <td>{item.trang_thai_lich_su}</td> */}
                                <td>{handleFormatDate(item.ngay_thay_doi)}</td>

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