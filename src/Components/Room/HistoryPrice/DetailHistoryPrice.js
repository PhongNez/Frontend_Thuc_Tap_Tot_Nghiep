
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';

import axios from '../../../services/Customize-axios'
import { useParams } from 'react-router-dom';
import moment from 'moment'
import handleFormatDate from '../../configs/format-datetime';

const DetailHistoryPrice = (props) => {

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
        let res = await axios.get(`/history-price/detail?id=${id}`)
        setListHistory(res.history)
        console.log('>>> Check api: ', res);

    }

    const handleFormatPrice = (price) => {
        const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
        return formattedPrice
    }

    return (
        <><div className='text-center my-4'>
            <h4 className='title-user'>Lịch sử giá của phòng {listHistory && listHistory[0] && listHistory[0].ten_phong}</h4>
        </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Phòng</th>
                        <th>Giá phòng</th>
                        <th>Hiệu lực từ</th>
                        <th>Hiệu lực đến</th>
                        <th>Loại phòng</th>
                        <th>Danh mục</th>

                    </tr>
                </thead>
                <tbody>
                    {listHistory && listHistory.length > 0 && listHistory.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.ten_phong}</td>
                                <td>{item.gia && handleFormatPrice(item.gia)}</td>
                                <td>{item.hieu_luc_tu && handleFormatDate(item.hieu_luc_tu)}</td>
                                <td>{item.hieu_luc_den && handleFormatDate(item.hieu_luc_den)}</td>

                                <td>{item.sl_giuong}</td>
                                <td>{item.ten_danh_muc}</td>
                                {/* <td>{item.trang_thai_lich_su}</td> */}


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

export default DetailHistoryPrice