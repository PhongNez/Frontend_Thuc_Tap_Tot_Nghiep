import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { createUser } from '../services/UserService';
import { ToastContainer, toast } from 'react-toastify';

const ModalConfirmDelete = (props) => {
    const { show, handleClose, title } = props
    const [name, setName] = useState("")
    const [job, setJob] = useState("")

    const handleDelte = () => {
        console.log('Delete thành công');
    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div>Bạn có chắc chắn muốn xóa người dùng này không?</div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {/* <Button variant="primary" onClick={() => handleSaveNewUser()}> */}
                    <Button variant="primary" onClick={() => handleDelte()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalConfirmDelete