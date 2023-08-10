
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';

import axios from '../../../services/Customize-axios'
import { useContext } from 'react';
import { UserContext } from '../../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import handleFormatDate from '../../configs/format-datetime'


const HistoryPrice = (props) => {

    const [isShowModalAddRole, setIsShowModalAddRole] = useState(false)

    const [listHistory, setListHistory] = useState([])
    const [isShowModal, setIsShowModal] = useState(false)

    const [change, setChange] = useState(false)

    const [listEdit, setListEdit] = useState([])
    const [oneRoom, setOneRoom] = useState([])
    const navigate = useNavigate();
    const { user } = useContext(UserContext)

    const [isShowModalChange, setIsShowModalChange] = useState(false)

    const handleChange = () => {
        setChange(!change)
        console.log(change);
    }

    useEffect(() => {
        getAllHistory()
    }, [user])

    useEffect(() => {
        getAllHistory()
    }, [change])
    const getAllHistory = async () => {
        // console.log(user);
        // if (user && user[0] && user[0].id) {
        //     let res = await axios.get(`/history/get?id=${user[0].id}`)
        //     setListHistory(res.history)
        //     console.log('>>> Check api: ', res);
        // }getHistoryPriceRoom
        let res = await axios.get(`/history-price`)
        console.log(res);
        setListHistory(res.history)
    }

    const handleFormatPrice = (price) => {
        const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
        return formattedPrice
    }

    return (
        <><div className='text-center my-4'>
            <h4>Bảng giá phòng</h4>
            {/* <div>

                <button className='btn btn-success'>Thêm thông tin</button></div> */}
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
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {listHistory && listHistory.length > 0 && listHistory.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.ten}</td>
                                <td>{item.gia && handleFormatPrice(item.gia)}</td>
                                <td>{item.hieu_luc_tu && handleFormatDate(item.hieu_luc_tu)}</td>
                                <td>{item.hieu_luc_den && handleFormatDate(item.hieu_luc_den)}</td>
                                <td>{item.sl_giuong} giường</td>
                                <td>{item.ten_danh_muc}</td>


                                <td>
                                    <a href={`/history-price/detail/${item.id}`}>Xem chi tiết</a></td>

                            </tr>
                        )
                    })}
                </tbody>
            </Table>

        </>
    )
}

export default HistoryPrice