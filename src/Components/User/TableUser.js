import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
// import ReactPaginate from 'react-paginate';
// import { fetchApiUser } from '../services/UserService';
// import ModalEditUser from './ModalAddNew';
// import ModalConfirmDelete from './ModalConfirmDelete';
import ModalAddUser from './ModalAddUser'
import ModalEditUser from './ModalEditUser';
import ModalAddRole from './Role/ModalAddRole';
import axios from '../../services/Customize-axios'
import './TableUser.scss'

const TableUser = (props) => {

    const [isShowModalAddRole, setIsShowModalAddRole] = useState(false)

    const [listUser, setListUser] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [totalUsers, setTotalUsers] = useState(0)
    const [isShowModalAdd, setIsShowModalAdd] = useState(false)
    const [isShowModalEdit, setIsShowModalEdit] = useState(false)
    const [isShowModalDelete, setIsShowModalDelete] = useState(false)
    const [change, setChange] = useState(false)

    const [listEdit, setListEdit] = useState([])
    const [oneUser, setOneUser] = useState([])

    const handleCloseAdd = () => {
        setIsShowModalAdd(false)
    }
    const handleCloseEdit = () => {
        setIsShowModalEdit(false)
        setListEdit([])
    }

    const handleCloseAddRole = () => {
        setIsShowModalAddRole(false)
    }
    const handleEditUser = (item) => {
        console.log("hello Edit", item);
        setIsShowModalEdit(true)
        setListEdit(item)
    }

    const handleAddRole = (item) => {
        console.log(item);
        setOneUser(item)
        setIsShowModalAddRole(true)
    }

    const handleChange = () => {
        setChange(!change)
        console.log(change);
    }

    useEffect(() => {
        getAllUser()
    }, [change])

    const getAllUser = async () => {
        let res = await axios.get('/admin/get-user')
        setListUser(res.dataUser)
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
            {/* <div><button className='btn btn-success' onClick={() => setIsShowModalAdd(true)}>Thêm thông tin</button></div> */}
        </div>
            <Table striped bordered hover responsive>
                <thead>
                    <tr className="text-center">
                        <th>Id</th>
                        <th>Tên</th>
                        <th>Email</th>
                        <th>Mã số SV</th>

                        <th>SĐT</th>
                        <th>Lớp</th>
                        <th>Địa chỉ</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {listUser && listUser.length > 0 && listUser.map((item, index) => {
                        return (
                            <tr key={index} className="text-center">
                                <td>{item.id}</td>
                                <td>{item.ten}</td>
                                <td>{item.email}</td>
                                <td>{item.mssv}</td>

                                <td>{item.sdt}</td>
                                <td>{item.ten_lop}</td>
                                <td>{item.dia_chi}</td>
                                <td>{item.trang_thai}</td>

                                <td>
                                    <button className='btn btn-warning mx-3' onClick={() => handleEditUser(item)}>Cập nhật</button>
                                    {/* <button className='btn btn-danger' onClick={() => setIsShowModalDelete(true)}>Update</button> */}
                                    <button className='btn btn-danger' onClick={() => handleAddRole(item)}>Cấp quyền</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <ModalAddUser
                show={isShowModalAdd}
                handleClose={handleCloseAdd}
                listUser={listUser}
                title={'Thêm thông tin người dùng'}
            />

            <ModalEditUser
                show={isShowModalEdit}
                handleClose={handleCloseEdit}
                title={'Modal edit new user'}
                listUser={listUser}
                listEdit={listEdit}
                handleChange={handleChange}
            />
            <ModalAddRole
                show={isShowModalAddRole}
                handleClose={handleCloseAddRole}
                listUser={listUser}
                oneUser={oneUser}
                title={'Cấp quyền'}
                handleChange={handleChange}
            />
            {/*<ModalConfirmDelete
                show={isShowModalDelete}
                handleClose={handleClose}
                title={'Modal Confirm'}
                handleSave={(name, job) => handleEdit(name, job)}
            />
            <ReactPaginate
                nextLabel="next >"
                onPageChange={(event) => handlePageClick(event)}
                pageRangeDisplayed={1}
                marginPagesDisplayed={3}
                pageCount={totalPages}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
            /> */}
        </>
    )
}

export default TableUser