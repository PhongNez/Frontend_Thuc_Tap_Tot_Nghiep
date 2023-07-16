import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logoCoffee from '../../assets/images/logo-coffee.jpg'
import { NavLink } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../context/UserContext';
const HeaderUser = (props) => {
    const { logout, isLogin } = useContext(UserContext)

    const handleLogout = () => {
        logout()
    }
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">
                    <img
                        src={logoCoffee}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />
                    Phong Trọ
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">

                        <NavLink to="/" className='nav-link'>Home</NavLink>
                        <NavLink to="/order-room" className='nav-link'>Thuê phòng</NavLink>
                        {/* <NavLink to="/user" className='nav-link'>Tài khoản</NavLink>
                        <NavLink to="/room" className='nav-link'>Phòng thuê</NavLink> */}
                    </Nav>
                    <Nav>
                        <NavDropdown title="Setting" id="basic-nav-dropdown">
                            {isLogin === false ? <NavDropdown.Item href="/login">Login</NavDropdown.Item> :
                                <NavDropdown.Item href="#action/3.2"
                                    onClick={handleLogout}>
                                    Logout
                                </NavDropdown.Item>}

                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default HeaderUser