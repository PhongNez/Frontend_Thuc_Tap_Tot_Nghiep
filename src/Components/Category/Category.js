import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';


import axios from '../../services/Customize-axios'
import ModalAddCategory from './ModalAddCategory';
import ModalEditCategory from './ModalEditCategory';
import ModalDeleteCategory from './ModalDeleteCategory';

const TableCategory = (props) => {

    const [isShowModalAddRole, setIsShowModalAddRole] = useState(false)

    const [listCategory, setListCategory] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [totalUsers, setTotalUsers] = useState(0)
    const [isShowModalAdd, setIsShowModalAdd] = useState(false)
    const [isShowModalEdit, setIsShowModalEdit] = useState(false)
    const [isShowModalDelete, setIsShowModalDelete] = useState(false)
    const [change, setChange] = useState(false)

    const [listEdit, setListEdit] = useState([])
    const [listDelete, setListDelete] = useState([])

    const handleCloseAdd = () => {
        setIsShowModalAdd(false)
    }
    const handleCloseEdit = () => {
        setIsShowModalEdit(false)
    }

    const handleCloseDelete = () => {
        setIsShowModalDelete(false)
    }
    const handleEditCategory = (item) => {
        console.log("hello Edit", item);
        setIsShowModalEdit(true)
        setListEdit(item)
    }
    const handleDeleteCategory = (item) => {
        console.log("hello Edit", item);
        setIsShowModalDelete(true)
        setListDelete(item)
    }

    const handleChange = () => {
        setChange(!change)
        console.log(change);
    }

    useEffect(() => {
        getAllCategory()
    }, [change])

    const getAllCategory = async () => {
        let res = await axios.get('/room/category/get')
        setListCategory(res.category)
        console.log('>>> Check api: ', res);

    }

    console.log(totalPages);
    const handlePageClick = (event) => {
        console.log('>>>Check event: ', event.selected);
        // getAllUser(event.selected + 1)
    }
    return (
        <><div className='my-3 add-new'>
            <span><b>Danh sách người dùng:</b></span>
            <div>

                <button className='btn btn-success' onClick={() => setIsShowModalAdd(true)}>Thêm danh mục</button></div>
        </div>
            <Table striped bordered hover responsive>
                <thead>
                    <tr className="text-center">
                        <th>Id</th>
                        <th>Tên danh mục</th>

                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {listCategory && listCategory.length > 0 && listCategory.map((item, index) => {
                        return (
                            <tr key={index} className="text-center">
                                <td>{item.id}</td>
                                <td>{item.ten}</td>


                                <td>
                                    <button className='btn btn-warning mx-3' onClick={() => handleEditCategory(item)}>Cập nhật</button>
                                    <button className='btn btn-danger' onClick={() => handleDeleteCategory(item)}>Xóa</button>
                                    {/* <button className='btn btn-danger' onClick={() => handleAddRole(item)}>Cấp quyền</button> */}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <ModalAddCategory
                show={isShowModalAdd}
                handleClose={handleCloseAdd}
                listUser={listCategory}
                title={'Thêm danh mục'}
                handleChange={handleChange}
            />
            <ModalEditCategory
                show={isShowModalEdit}
                handleClose={handleCloseEdit}
                title={'Cập nhật phòng'}
                listEdit={listEdit}
                handleChange={handleChange}
            />
            <ModalDeleteCategory
                show={isShowModalDelete}
                handleClose={handleCloseDelete}
                title={'Xóa phòng'}
                handleSave={() => { }}
                listDelete={listDelete}
                handleChange={handleChange}
            />
        </>
    )
}

export default TableCategory