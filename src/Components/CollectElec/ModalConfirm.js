import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import axios from '../../services/Customize-axios'

const ModalConfirm = (props) => {
    const { show, handleClose, title, oneRoom, handleChange } = props


    const handleConfirm = async () => {
        console.log('Delete thành công');
        let res = await axios.put(`/admin/collect-elec/confirm?id=${oneRoom.id}`)
        console.log(res);
        // console.log(res);
        if (res && res.errCode === 0) {

            handleClose()
            handleChange()
            toast.success(res.message)
        }
        else if (res && res.errCode === 1) {
            toast.error(res.message)
        }
        else if (res && res.errCode === 2) {
            toast.error(res.message)
        }
        else if (res && res.errCode === 3) {
            toast.error(res.message)
        }
    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div>Bạn có chắc chắn đã thu tiền {oneRoom.ten_phong} này rồi?</div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {/* <Button variant="primary" onClick={() => handleSaveNewUser()}> */}
                    <Button variant="primary" onClick={() => handleConfirm()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalConfirm