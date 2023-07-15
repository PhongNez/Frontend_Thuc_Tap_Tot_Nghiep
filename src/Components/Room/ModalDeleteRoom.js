import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import axios from '../../services/Customize-axios'
import { useEffect } from 'react';
import { setAuthToken } from '../../services/VerifyToken';

const ModalDeleteRoom = (props) => {
    const { show, handleClose, title, handleChange, listDelete } = props

    const handleSave = async () => {
        console.log(listDelete.id);
        let token = localStorage.getItem('token')
        console.log(token);
        setAuthToken(token)
        try {
            let res = await axios.delete(`/room/delete?id=${listDelete.id}`)
            console.log(res);
            if (res && res.errCode === 0) {
                handleChange()
                handleClose()
                toast.success(res.message)
            } else if (res && res.errCode === 1) {
                toast.error(res.message)
            }
            else {
                toast.error(res.message)
            }

        } catch (error) {
            // toast.error('Không có quyền')
            console.log('phong');
        }




    }

    useEffect(() => {


    }, [listDelete])

    return (
        <>
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Bạn có muốn xóa phòng<h3> {listDelete.ten}</h3> </label>
                            {/* <input type="text" className="form-control"
                                value={ten}
                                onChange={(event) => setTen(event.target.value)}
                            /> */}

                        </div>

                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    {/* <Button variant="primary" onClick={() => handleSaveNewUser()}> */}
                    <Button variant="primary" onClick={() => handleSave()}>
                        Đồng ý
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalDeleteRoom