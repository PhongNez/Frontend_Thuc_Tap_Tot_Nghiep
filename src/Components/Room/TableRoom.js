import { useEffect } from "react"
import { useState } from "react"
import { Table } from "react-bootstrap"
import axios from '../../services/Customize-axios'

import ModalCreateRoom from "./ModalCreateRoom"
import ModalEditRoom from "./ModalEditRoom"
import ModalDeleteRoom from "./ModalDeleteRoom"


import ModalCreatePrice from "./DetailRoom/ModalCreatePrice"
import ModalUpdatePrice from "./DetailRoom/ModalUpdatePrice"
import { link } from "../configs/config-Image"
import './TableRoom.scss'
import { setAuthToken } from "../../services/VerifyToken"


const TableRoom = () => {
    //Chi tiết
    const [isShowModalCreatePrice, setIsShowModalCreatePrice] = useState(false)
    const [isShowModalUpdatePrice, setIsShowModalUpdatePrice] = useState(false)

    const [isShowModalCreate, setIsShowModalCreate] = useState(false)
    const [isShowModalEdit, setIsShowModalEdit] = useState(false)
    const [isShowModalDelete, setIsShowModalDelete] = useState(false)
    const [list, setList] = useState([])
    const [listEdit, setListEdit] = useState([])
    const [listDelete, setListDelete] = useState([])

    const [listEditPrice, setListEditPrice] = useState([])
    const [change, setChange] = useState(false)

    let [DanhMuc, setDanhMuc] = useState([])
    console.log('phong', link);



    useEffect(() => {
        getAllRoom()
    }, [change])

    useEffect(() => {
        getAllCategory()
    }, [change])

    const getAllCategory = async () => {
        let res = await axios.get('/room/category/get')
        setDanhMuc(res.category)
        console.log('>>> Check api: ', res);

    }

    const getAllRoom = async () => {
        let res = await axios.get('/room/get')
        console.log(res);
        if (res && res.dataRoom) {
            setList(res.dataRoom)
        }
    }

    let TrangThai = [
        { id: 0, name: "Bảo trì" },
        { id: 1, name: "Hoạt động" },
    ];

    // let DanhMuc = [
    //     { id: 1, name: "Dịch vụ" },
    //     { id: 2, name: "Dịch vụ chất lượng cao" },
    //     { id: 3, name: "Bình thường" }
    // ];

    let Day = [
        { id: 1, ten: "J" },
        { id: 2, ten: "I" },
        { id: 3, ten: "M" }
    ];

    let LoaiPhong = [
        { id: 1, sl_giuong: 6 },
        { id: 2, sl_giuong: 8 },
        { id: 3, sl_giuong: 10 },
        { id: 4, sl_giuong: 12 }
    ];

    const handleCloseCreatePrice = () => {
        setIsShowModalCreatePrice(false)
    }

    const handleCloseUpdatePrice = () => {
        setIsShowModalUpdatePrice(false)
    }

    const handleCloseDelete = () => {
        setIsShowModalDelete(false)
    }
    const handleCloseCreate = () => {
        setIsShowModalCreate(false)
    }
    const handleCloseEdit = () => {
        setIsShowModalEdit(false)
    }
    const handleChange = () => {
        setChange(!change)
        console.log(change);
    }

    const handleEdit = (item) => {
        console.log(item);
        setListEdit(item)
        setIsShowModalEdit(true)
    }

    const handleDelete = (item) => {
        setListDelete(item)
        setIsShowModalDelete(true)
    }
    const handleEditPrice = (item) => {
        console.log(item);
        setListEditPrice(item)
        setIsShowModalUpdatePrice(true)
    }

    const handleFormatPrice = (price) => {
        const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
        return formattedPrice
    }

    return (
        <><div className='my-3 add-new'>
            <span><b>Danh sách phòng:</b></span>
            <div>

                {/* <button className='btn btn-success mx-2' onClick={() => setIsShowModalCreatePrice(true)}>Thêm giá mới</button> */}
                <button className='btn btn-success' onClick={() => setIsShowModalCreate(true)}>Thêm phòng</button></div>
        </div>
            <Table striped bordered hover size="sm" responsive   >
                <thead>
                    <tr className="text-center">
                        <th>Id</th>
                        <th>Tên phòng</th>
                        <th>Ảnh</th>
                        <th>Giá</th>
                        <th>Số giường</th>
                        <th>Dãy</th>
                        <th>Danh mục</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>

                    </tr>
                </thead>
                <tbody>
                    {list && list.length > 0 && list.map((item, index) => {
                        return (
                            <tr key={index} className="text-center">
                                <td>{item.id}</td>
                                <td>{item.ten}</td>
                                <img src={`${link}${item.anh}`} width={80} height={80} />
                                <td>{item.gia ? `${handleFormatPrice(item.gia)}` : 'Chưa'} </td>
                                <td>{item.sl_giuong ? `${item.sl_giuong}` : 'Chưa'}</td>
                                <td>{item.ten_day}</td>
                                <td>{item.ten_danh_muc}</td>
                                {TrangThai.map((item2, index) => {
                                    if (item2.id == item.trang_thai) {
                                        return (<td>{item2.name}</td>)
                                    }
                                })}

                                <td>
                                    <button className='btn btn-warning mx-3' onClick={() => handleEdit(item)}>Sửa</button>
                                    <button className='btn btn-danger' onClick={() => handleDelete(item)}>Xóa</button>
                                    <button className='btn btn-warning mx-3' onClick={() => handleEditPrice(item)}>Cập nhật giá</button>
                                </td>
                            </tr>
                        )
                    })}


                </tbody>
            </Table>
            <ModalCreateRoom
                show={isShowModalCreate}
                handleClose={handleCloseCreate}
                title={'Thêm phòng mới'}
                DanhMuc={DanhMuc}
                Day={Day}
                TrangThai={TrangThai}
                handleChange={handleChange}
            />

            <ModalEditRoom
                show={isShowModalEdit}
                handleClose={handleCloseEdit}
                title={'Cập nhật phòng'}
                DanhMuc={DanhMuc}
                Day={Day}
                TrangThai={TrangThai}
                handleSave={() => { }}
                listEdit={listEdit}
                handleChange={handleChange}
            />

            <ModalDeleteRoom

                show={isShowModalDelete}
                handleClose={handleCloseDelete}
                title={'Xóa phòng'}
                handleSave={() => { }}
                listDelete={listDelete}
                handleChange={handleChange}
            />
            <ModalCreatePrice
                show={isShowModalCreatePrice}
                handleClose={handleCloseCreatePrice}
                title={'Thêm giá mới'}
                LoaiPhong={LoaiPhong}
                handleChange={handleChange}
                list={list}
            />
            <ModalUpdatePrice
                show={isShowModalUpdatePrice}
                handleClose={handleCloseUpdatePrice}
                title={'Cập nhật chi tiết phòng'}
                LoaiPhong={LoaiPhong}
                handleChange={handleChange}
                listEditPrice={listEditPrice}
                list={list}
            />
        </>
    )
}

export default TableRoom