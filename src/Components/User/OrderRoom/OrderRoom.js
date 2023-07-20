import React, { useContext } from 'react';
import { useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import axios from '../../../services/Customize-axios'
import { useState } from 'react';
import { link } from "../../configs/config-Image"
import './OrderRoom.scss'
import ModalOrderRoom from './ModalOrderRoom';
import { UserContext } from '../../../context/UserContext';
import ModalChangeOrderRoom from './ModalChangeOrderRoom';
import { useNavigate } from 'react-router-dom';

const OrderRoom = () => {
    const [isShowModal, setIsShowModal] = useState(false)
    const [isShowModalChange, setIsShowModalChange] = useState(false)
    const [change, setChange] = useState(false)

    const [listRoom, setListRoom] = useState([])
    const [oneRoom, setOneRoom] = useState([])
    const [listPerson, setListPerson] = useState([])
    const [checkChange, setCheckChange] = useState([])
    const { user } = useContext(UserContext)
    const navigate = useNavigate();
    useEffect(() => {
        getRoom()

    }, [change])

    useEffect(() => {
        checkHistory()
    }, [user])
    const getRoom = async () => {

        let res = await axios.get('/order-room/get')
        console.log(res);
        setListRoom(res.dataRoom)
        setListPerson(res.listCountPerson)
    }

    const checkHistory = async () => {
        if (user && user[0] && user[0].id) {
            let res = await axios.get(`/check-history/get?id=${user[0].id}`)
            setCheckChange(res.history)
            console.log('>>> Check api: ', res);
        }
    }
    const handleClose = () => {
        setIsShowModal(false)
    }

    const handleCloseChange = () => {
        setIsShowModalChange(false)
    }
    const handleChange = () => {
        setChange(!change)
        console.log(change);
    }
    const handleOrderRoom = (item) => {
        console.log(item);
        if (user && user[0] && user[0].id) {
            setOneRoom(item)
            setIsShowModal(true)
        } else {
            navigate('/login')
        }
    }

    const cardStyle = {
        width: '400px', // Đặt kích thước chiều rộng của Card
        // Đặt kích thước chiều cao của Card
    };
    console.log('list person: ', listPerson);

    const countListPerson = (itemRoom) => {
        let dem = 0
        listPerson.map((item, index) => {
            if (item.id_phong == itemRoom.id) {
                dem += 1
            }
        })
        return dem
    }

    const handleChangOrderRoom = (item) => {
        console.log(item.id);
        setOneRoom(item)
        setIsShowModalChange(true)
    }

    console.log('Check change:', checkChange);
    return (
        <Container>
            <h4 className='text-center my-4'>Danh sách phòng thuê</h4>
            <Row>
                {listRoom.map((item) => (
                    <Col key={item.id} md={4} className="mb-4">
                        <Card style={cardStyle}>
                            <Card.Body>
                                <Card.Title>Phòng: {item.ten}</Card.Title>
                                <Card.Img src={`${link}${item.anh}`} height={360} width={270}></Card.Img>

                                <Card.Text className='myText'>Giá thuê: {item.gia} VNĐ/người</Card.Text>
                                <Card.Text className='myText'>Mô tả: {item.mo_ta}</Card.Text>


                                <Card.Text className='myText'>Danh mục: {item.ten_danh_muc}</Card.Text>
                                <Card.Text className='myText'>Dãy: {item.ten_day}</Card.Text>
                                <Card.Text className='myText'>Số giường: {item.sl_giuong}</Card.Text>
                                <Card.Text className='myText'>Đã thuê: {countListPerson(item)} người</Card.Text>
                                <Card.Text className='myText'>Còn lại: {item.sl_giuong - countListPerson(item)} người</Card.Text>

                                {checkChange.length > 0 ? <button className='btn btn-warning' onClick={() => handleChangOrderRoom(item)}>Chuyển phòng</button> : <button className='btn btn-danger' onClick={() => handleOrderRoom(item)}> Thuê phòng</button>}
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <ModalOrderRoom
                show={isShowModal}
                handleClose={handleClose}
                oneRoom={oneRoom}
                handleChange={handleChange}
                title={'Thuê phòng'} />
            <ModalChangeOrderRoom
                show={isShowModalChange}
                oneRoom={oneRoom}
                handleChange={handleChange}
                handleClose={handleCloseChange}
                title={'Chuyển phòng'}
            />
        </Container>
    );
};

export default OrderRoom;