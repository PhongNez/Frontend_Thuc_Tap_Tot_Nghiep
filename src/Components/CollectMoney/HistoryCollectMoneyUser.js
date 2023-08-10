
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';

import axios from '../../services/Customize-axios'
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import handleFormatDate from '../configs/format-date';


const HistoryCollectMoneyUser = (props) => {

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

    useEffect(() => {
        getAllHistory()
    }, [user])


    const getAllHistory = async () => {
        console.log(user);
        if (user && user[0] && user[0].id) {
            let res = await axios.get(`/history-collect-money?id=${user[0].id}`)
            setListHistory(res.dataThuTien)
            console.log('>>> Check api: ', res);
        }

    }

    const handleCollect = (item) => {
        setIsShowModal(true)
        setTaiKhoan(item)
        setTienPhaiDong(item.gia * item.so_thang)
        console.log(item.gia * item.so_thang);
    }

    const handleFormatPrice = (price) => {
        const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
        return formattedPrice
    }

    return (
        <><div className='text-center my-4'>
            <h4>Lịch sử đóng tiền của bạn</h4>

        </div>
            <Table striped bordered hover responsive>
                <thead>
                    <tr className="text-center">
                        <th>Id</th>
                        <th>Hạn đóng</th>
                        <th>Tiền phải đóng</th>



                        <th>Tiền đã đóng</th>
                        <th>Ngày đóng</th>
                        <th>Còn nợ</th>

                        <th>Trạng thái</th>
                        <th>Ghi chú</th>
                    </tr>
                </thead>
                <tbody>
                    {listHistory && listHistory.length > 0 && listHistory.map((item, index) => {
                        return (
                            <tr key={index} className="text-center">
                                <td>{item.id}</td>
                                <td>{item.thang && handleFormatDate(item.thang)}</td>
                                <td>{item.tien_phai_dong && handleFormatPrice(item.tien_phai_dong)}</td>


                                <td>{item.da_thu && handleFormatPrice(item.da_thu)}</td>
                                <td>{item.ngay_thu && handleFormatDate(item.ngay_thu)}</td>
                                <td>{item.con_no && handleFormatPrice(item.con_no)}</td>

                                <td>{item.trang_thai == 1 ? 'Chưa đóng' : 'Đã đóng'}</td>
                                <td>{item.ghi_chu}</td>
                            </tr>
                        )
                    })}

                </tbody>
            </Table>


        </>
    )
}

export default HistoryCollectMoneyUser