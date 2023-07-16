import React from 'react';
import { useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import axios from '../../../services/Customize-axios'
import { useState } from 'react';
import { link } from "../../configs/config-Image"
import './OrderRoom.scss'

const OrderRoom = () => {

    const [listRoom, setListRoom] = useState([])
    useEffect(() => {
        getRoom()
    }, [])

    const getRoom = async () => {
        let res = await axios.get('/order-room/get')
        console.log(res);
        setListRoom(res.dataRoom)
    }


    const cardStyle = {
        width: '400px', // Đặt kích thước chiều rộng của Card
        // Đặt kích thước chiều cao của Card
    };

    return (
        <Container>
            <h1>Product List</h1>
            <Row>
                {listRoom.map((item) => (
                    <Col key={item.id} md={4} className="mb-4">
                        <Card style={cardStyle}>
                            <Card.Body>
                                <Card.Title>Phòng: {item.ten}</Card.Title>
                                <Card.Img src={`${link}${item.anh}`} height={360} width={270}></Card.Img>
                                <Card.Text className='myText'>Số giường: {item.sl_giuong}</Card.Text>
                                <Card.Text className='myText'>Giá thuê: {item.gia} VNĐ/người</Card.Text>
                                <Card.Text className='myText'>Mô tả: {item.mo_ta}</Card.Text>


                                <Card.Text className='myText'>Danh mục: {item.ten_danh_muc}</Card.Text>
                                <Card.Text className='myText'>Dãy: {item.ten_day}</Card.Text>
                                <Card.Text className='myText'>Đã thuê: 6 người</Card.Text>
                                <Card.Text className='myText'>Còn lại: 0 người</Card.Text>
                                <button className='btn btn-danger'> Thuê phòng</button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default OrderRoom;