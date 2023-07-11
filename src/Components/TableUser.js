import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import ReactPaginate from 'react-paginate';
import { fetchApiUser } from '../services/UserService';
import ModalEditUser from './ModalAddNew';
import ModalConfirmDelete from './ModalConfirmDelete';
import ModalAddNewUser from './ModalAddNew';

const TableUser = (props) => {

    const [list, setList] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [totalUsers, setTotalUsers] = useState(0)
    const [isShowModalAdd, setIsShowModalAdd] = useState(false)
    const [isShowModalEdit, setIsShowModalEdit] = useState(false)
    const [isShowModalDelete, setIsShowModalDelete] = useState(false)
    const handleAddnew = (name, job) => {
        console.log('Hello Phong Add new công việc: ', job);
    }
    const handleCloseAdd = () => {
        setIsShowModalAdd(false)
    }
    const handleCloseEdit = () => {
        setIsShowModalEdit(false)
    }
    const handleClose = () => {
        setIsShowModalDelete(false)
    }
    const handleEdit = (name, job) => {
        console.log("hello Edit", name, job);
    }

    useEffect(() => {
        getAllUser(1)
    }, [])

    const getAllUser = async (page) => {
        let res = await fetchApiUser(page)
        console.log('>>> Check api: ', res);
        if (res && res.data) {
            setList(res.data)
            setTotalPages(res.total_pages)
            setTotalUsers(res.total)
        }
    }

    console.log(totalPages);
    const handlePageClick = (event) => {
        console.log('>>>Check event: ', event.selected);
        getAllUser(event.selected + 1)
    }
    return (
        <><div className='my-3 add-new'>
            <span><b>List User:</b></span>
            <button className='btn btn-success' onClick={() => setIsShowModalAdd(true)}>Add New User</button>
        </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {list && list.length > 0 && list.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.email}</td>
                                <td>{item.first_name}</td>
                                <td>{item.last_name}</td>
                                <td>
                                    <button className='btn btn-warning mx-3' onClick={() => setIsShowModalEdit(true)}>Edit</button>
                                    <button className='btn btn-danger' onClick={() => setIsShowModalDelete(true)}>Update</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <ModalAddNewUser
                show={isShowModalAdd}
                handleClose={handleCloseAdd}
                title={'Modal add new user'}
            />

            <ModalEditUser
                show={isShowModalEdit}
                handleClose={handleCloseEdit}
                title={'Modal edit new user'}
                handleSave={(name, job) => handleEdit(name, job)}
            />
            <ModalConfirmDelete
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
            />
        </>
    )
}

export default TableUser