import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../reducers/userReducer";
import logo from '../static/logo.png';

const TopBar = () => {

    // redux states
    const user = useSelector(({user}) => user)
    const dispatch = useDispatch()

    // handle log out
    const handleLogout = () => {
        dispatch(userLogout())
    }

    return (
        <Navbar bg="#F9F9F9" style={{ width : '100%' }}>
                <img src={logo} width="25" alt="logo" />
                <Navbar.Brand href="/">Boston Main Streets</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav>
                        <Nav.Link href="/">Map</Nav.Link>
                        
                        {
                            user
                                ? (
                                    <>
                                    <Nav.Link href="/upload">Upload</Nav.Link>
                                    <NavDropdown alignRight title={`Hi, ${user.email}`} className="mr-auto" style={{ marginLeft : 'auto', marginRight : 20 }}>
                                        <NavDropdown.Item onClick={() => handleLogout()}>
                                            Log Out
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                    </>
                                )
                                : <Nav.Link href="/login">Log In</Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>
        </Navbar>
    )
}

export default TopBar