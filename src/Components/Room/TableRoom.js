import { useEffect } from "react"
import { useState } from "react"
import { Table } from "react-bootstrap"
import axios from '../../services/Customize-axios'
import ModalCreateRoom from "./ModalCreateRoom"
import ModalEditRoom from "./ModalEditRoom"
const TableRoom = () => {
    const [isShowModalCreate, setIsShowModalCreate] = useState(false)
    const [isShowModalEdit, setIsShowModalEdit] = useState(false)
    const [isShowModalDelete, setIsShowModalDelete] = useState(false)
    const [list, setList] = useState([])
    const [listEdit, setListEdit] = useState([])
    const [change, setChange] = useState(false)
    useEffect(() => {
        getAllRoom()
    }, [change])

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

    let DanhMuc = [
        { id: 1, name: "Dịch vụ" },
        { id: 2, name: "Dịch vụ chất lượng cao" },
        { id: 3, name: "Bình thường" }
    ];

    let Day = [
        { id: 1, name: "J" },
        { id: 2, name: "I" },
        { id: 3, name: "M" }
    ];
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
    return (
        <><div className='my-3 add-new'>
            <span><b>Danh sách phòng:</b></span>
            <button className='btn btn-success' onClick={() => setIsShowModalCreate(true)}>Thêm phòng</button>
        </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Tên phòng</th>
                        <th>Ảnh</th>
                        <th>Dãy</th>
                        <th>Danh mục</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {list && list.length > 0 && list.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.id_phong}</td>
                                <td>{item.ten_phong}</td>
                                <td>{item.anh}</td>
                                <td>{item.ten_day}</td>
                                <td>{item.ten_danh_muc}</td>
                                {TrangThai.map((item2, index) => {
                                    if (item2.id == item.trang_thai) {
                                        return (<td>{item2.name}</td>)
                                    }
                                })}

                                <td>
                                    <button className='btn btn-warning mx-3' onClick={() => handleEdit(item)}>Sửa</button>
                                    <button className='btn btn-danger' onClick={() => setIsShowModalDelete(true)}>Update</button>
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
                title={'Modal edit new user'}
                DanhMuc={DanhMuc}
                Day={Day}
                TrangThai={TrangThai}
                handleSave={() => { }}
                listEdit={listEdit}
                handleChange={handleChange}
            />
        </>
    )
}

export default TableRoom