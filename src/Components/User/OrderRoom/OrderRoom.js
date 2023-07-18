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

const OrderRoom = () => {
    const [isShowModal, setIsShowModal] = useState(false)
    const [isShowModalChange, setIsShowModalChange] = useState(false)

    const [listRoom, setListRoom] = useState([])
    const [oneRoom, setOneRoom] = useState([])
    const [listPerson, setListPerson] = useState([])
    const [checkChange, setCheckChange] = useState([])
    const { user } = useContext(UserContext)
    useEffect(() => {
        getRoom()
        checkHistory()
    }, [])

    const getRoom = async () => {
        let change = await axios.get('/')
        let res = await axios.get('/order-room/get')
        console.log(res);
        setListRoom(res.dataRoom)
        setListPerson(res.listCountPerson)
    }

    const checkHistory = async () => {
        // console.log(user);
        if (user && user[0] && user[0].id) {
            let res = await axios.get(`/history/get?id=${user[0].id}`)
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

    const handleOrderRoom = (item) => {
        console.log(item);
        setOneRoom(item)
        setIsShowModal(true)
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


    return (
        <Container>
            <h1>Danh sách phòng thuê</h1>
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
                                <button className='btn btn-danger' onClick={() => handleOrderRoom(item)}> Thuê phòng</button>
                                {checkChange.length > 0 ? <button className='btn btn-warning mx-3' onClick={() => handleChangOrderRoom(item)}>Chuyển phòng</button> : ''}
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <ModalOrderRoom
                show={isShowModal}
                handleClose={handleClose}
                oneRoom={oneRoom}
                title={'Thuê phòng'} />
            <ModalChangeOrderRoom
                show={isShowModalChange}
                oneRoom={oneRoom}
                handleClose={handleCloseChange}
                title={'Chuyển phòng'}
            />
        </Container>
    );
};

export default OrderRoom;