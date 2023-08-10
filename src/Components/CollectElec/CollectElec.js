
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';

import axios from '../../services/Customize-axios'
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import handleFormatDate from '../configs/format-datetime';
import ModalCollectElec from './ModalCollectElec';
import moment from 'moment'
import ModalConfirm from './ModalConfirm';

const CollectElec = (props) => {

    const [isShowModalAddRole, setIsShowModalAddRole] = useState(false)

    const [listHistory, setListHistory] = useState([])
    const [isShowModal, setIsShowModal] = useState(false)
    const [isShowModalConfirm, setIsShowModalConfirm] = useState(false)
    const [isShowModalDelete, setIsShowModalDelete] = useState(false)
    const [oneRoom, setOneRoom] = useState('')
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
    const handleCloseConfirm = () => {
        setIsShowModalConfirm(false)
    }
    useEffect(() => {
        getAllHistory()
    }, [change])

    const getAllHistory = async () => {
        // console.log(user);
        let res = await axios.get(`/history-collect-elec`)
        setListHistory(res.history)
        console.log('>>> Check api: ', res);

    }

    const handleConfirm = (item) => {
        setIsShowModalConfirm(true)
        setOneRoom(item)
        console.log(item);
    }



    const handleFormatDate = (date) => {
        const formattedDate = moment(date).format('MM/YYYY');
        return formattedDate
    }

    const handleFormatPrice = (price) => {
        const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
        return formattedPrice
    }

    return (
        <><div className='my-3 add-new'>
            <span><b>Thu tiền điện:</b></span>
            <div>

                <button className='btn btn-success' onClick={() => setIsShowModal(true)}>Thêm HĐ điện</button></div>
        </div>
            <Table striped bordered hover responsive>
                <thead>
                    <tr className="text-center">
                        <th>Id</th>
                        <th>Phòng</th>
                        <th>Số SV</th>
                        <th>Chỉ số củ</th>
                        <th>Chỉ số mới</th>
                        <th>Tiêu thụ</th>
                        <th>Số KW định mức</th>
                        <th>Số KW vượt định mức</th>

                        <th>Đơn giá 1 KW</th>
                        <th>Thành Tiền</th>
                        <th>Tháng</th>
                        <th >Trạng thái</th>
                        <th >Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {listHistory && listHistory.length > 0 && listHistory.map((item, index) => {
                        return (
                            <tr key={index} className="text-center">
                                <td>{item.id}</td>
                                <td>{item.ten_phong}</td>
                                <td>{item.so_luong}</td>
                                <td>{item.chi_so_cu}</td>
                                <td>{item.chi_so_moi}</td>
                                <td>{item.tieu_thu}</td>
                                <td>{item.so_kw_dinh_muc}</td>
                                <td>{item.so_kw_vuot_dinh_muc}</td>
                                <td>{item.don_gia_1_kw && handleFormatPrice(item.don_gia_1_kw)}</td>
                                <td>{item.thanh_tien && handleFormatPrice(item.thanh_tien)}</td>
                                <td>{item.ngay && handleFormatDate(item.ngay)}</td>
                                <td>{item.trang_thai === 1 ? 'Chưa đóng' :
                                    'Đã đóng'}</td>

                                {item.trang_thai === 1 && <td><button className='btn btn-primary mx-3' onClick={() => handleConfirm(item)}>Đã thu</button></td>}


                            </tr>
                        )
                    })}

                </tbody>
            </Table>
            <ModalCollectElec
                show={isShowModal}
                handleClose={handleClose}
                title={'Thu tiền điện'}
                taikhoan={taikhoan}
                tienPhaiDong={tienPhaiDong}
                handleChange={handleChange}
            />
            <ModalConfirm
                show={isShowModalConfirm}
                handleClose={handleCloseConfirm}
                oneRoom={oneRoom}
                title={'Xác nhận thu tiền'}
                handleChange={handleChange}
            />

        </>
    )
}

export default CollectElec