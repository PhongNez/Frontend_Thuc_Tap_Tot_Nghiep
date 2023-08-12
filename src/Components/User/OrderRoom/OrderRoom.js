import React, { useContext } from 'react';
import { useEffect } from 'react';
import { Container, Row, Col, Card, Nav, NavDropdown, Navbar } from 'react-bootstrap';
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
    const [listRoomMain, setListRoomMain] = useState([])
    const [oneRoom, setOneRoom] = useState([])
    const [listPerson, setListPerson] = useState([])
    const [checkChange, setCheckChange] = useState([])
    const { user } = useContext(UserContext)
    let [DanhMuc, setDanhMuc] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        getRoom()

    }, [change])

    useEffect(() => {
        checkHistory()
    }, [user, change])

    useEffect(() => {
        getAllCategory()
    }, [change])

    const getAllCategory = async () => {
        let res = await axios.get('/room/category/get')
        setDanhMuc(res.category)
        console.log('>>> Check api: ', res);

    }
    const getRoom = async () => {
        let res = await axios.get('/order-room/get')
        console.log(res);
        setListRoomMain(res.dataRoom)
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
        width: 'auto', // Đặt kích thước chiều rộng của Card
        // Đặt kích thước chiều cao của Card
        height: "auto",
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
        console.log('Change One Room: ', item);
        // setOneRoom(item)
        // setIsShowModalChange(true)
        navigate('/history-order-room')
    }

    console.log('Check change:', checkChange);

    const handleFormatPrice = (price) => {
        const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
        return formattedPrice
    }
    let Day = [
        { id: 1, ten: "J" },
        { id: 2, ten: "I" },
        { id: 3, ten: "M" }
    ];

    const handleSearchDay = (day) => {
        console.log(day);
        console.log(listRoom);
        // const result = listRoomMain.filter((item) =>
        //     item.ten_day.toLowerCase().includes(day.toLowerCase())
        // );
        const result = listRoomMain.filter((item) =>
            item.id_day === day
        );
        console.log(result);
        setListRoom(result)
    }

    const handleSearchDanhMuc = (danhmuc) => {
        console.log(danhmuc);
        console.log(listRoom);
        const result = listRoomMain.filter((item) =>
            item.id_danh_muc === danhmuc
        );
        console.log(result);
        setListRoom(result)
    }

    return (
        <Container>
            <h4 className='text-center my-4 title-user'>Danh sách phòng thuê</h4>

            <Nav className='flex-row-reverse text-color'>
                <NavDropdown title="Dãy" id="basic-nav-dropdown" className='text-success'>
                    {Day.map((item, index) => {

                        return (

                            <NavDropdown.Item onClick={() => handleSearchDay(item.id)}>{item.ten}</NavDropdown.Item>
                            // <td>{item.ten}</td>
                        )
                    })}
                    {/* <NavDropdown.Item >Đăng nhập</NavDropdown.Item>
                    <NavDropdown.Item
                    >
                        Đăng xuất
                    </NavDropdown.Item> */}

                </NavDropdown>
                <NavDropdown title="Danh mục" id="basic-nav-dropdown" >
                    {DanhMuc.map((item, index) => {

                        return (

                            <NavDropdown.Item onClick={() => handleSearchDanhMuc(item.id)}>{item.ten}</NavDropdown.Item>
                            // <td>{item.ten}</td>
                        )
                    })}
                    {/* <NavDropdown.Item >Đăng nhập</NavDropdown.Item>
                    <NavDropdown.Item
                    >
                        Đăng xuất
                    </NavDropdown.Item> */}

                </NavDropdown>

            </Nav>
            <div className='d-flex flex-row-reverse my-3'><button className='btn btn-primary ' onClick={() => setListRoom(listRoomMain)}>Bỏ lọc  </button></div>

            <Row>
                {listRoom && listRoom.map((item) => item.sl_giuong != countListPerson(item) && (
                    <Col key={item.id} md={4} className="mb-4">
                        <Card style={cardStyle}>
                            <Card.Body>
                                <Card.Title>Phòng: {item.ten}</Card.Title>
                                <Card.Img src={`${link}${item.anh}`} height={360} width={270}></Card.Img>

                                <Card.Text className='myText'>Giá thuê: {item.gia && handleFormatPrice(item.gia)} /người</Card.Text>
                                <Card.Text className='myText'>Mô tả: {item.mo_ta}</Card.Text>
                                <Card.Text className='myText'>Danh mục: {item.ten_danh_muc}</Card.Text>
                                <Card.Text className='myText'>Dãy: {item.ten_day}</Card.Text>
                                <Card.Text className='myText'>Số giường: {item.sl_giuong}</Card.Text>
                                <Card.Text className='myText'>Đã thuê: {countListPerson(item)} người</Card.Text>
                                <Card.Text className='myText'>Còn lại: {item.sl_giuong - countListPerson(item)} người</Card.Text>

                                {
                                    // console.log(checkChange[0].id_phong)
                                    checkChange.length > 0 && checkChange[0].id_phong == item.id
                                        ? <button className='btn btn-warning' onClick={() => handleChangOrderRoom(item)}>Chuyển phòng</button> : (checkChange.length > 0 ? <button className='btn text-white' disabled >s</button> : <button className='btn btn-danger' onClick={() => handleOrderRoom(item)}> Thuê phòng</button>)
                                }
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