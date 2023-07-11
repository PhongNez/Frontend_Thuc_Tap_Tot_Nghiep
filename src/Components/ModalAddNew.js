import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { createUser } from '../services/UserService';
import { ToastContainer, toast } from 'react-toastify';

const ModalAddNewUser = (props) => {
    const { show, handleClose, title, handleSave } = props
    const [name, setName] = useState("")
    const [job, setJob] = useState("")

    // const handleSaveNewUser = async () => {
    //     console.log(">>>Check: ", "name: ", name, "job: ", job);
    //     let res = await createUser(name, job)
    //     console.log(res);
    //     if (res && res.id) {
    //         //success
    //         handleClose()
    //         setName('')
    //         setJob('')
    //         toast.success('Thành công')
    //     }
    //     else {
    //         //err
    //     }
    // }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Name:</label>
                            <input type="text" className="form-control"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />

                        </div>
                        <div className="mb-3">
                            <label className="form-label">Job:</label>
                            <input type="text" className="form-control"
                                value={job}
                                onChange={(event) => setJob(event.target.value)}
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {/* <Button variant="primary" onClick={() => handleSaveNewUser()}> */}
                    <Button variant="primary" onClick={() => handleSave(name, job)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalAddNewUser