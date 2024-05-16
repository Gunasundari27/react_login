import React from 'react';
import axios from 'axios';
import logo from '../logo.svg';
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class Dashboard extends React.Component {
    state = {
        image: []
    }

    componentDidMount() {
        axios.get(`https://dog.ceo/api/breeds/image/random`)
            .then(res => {
                this.setState({ image: res.data.message });
            })
    }

    render() {
        return (
            <>
                <Navbar bg="dark" data-bs-theme="dark" className="navbar-bg" expand="lg">
                    <Navbar.Brand>
                        <img src={logo} className="App-logo" alt="logo"></img>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse >
                        <Nav className="ml-auto">
                            <Nav.Link as={Link} to="/dashboard" className="nav-link">
                                Dashboard
                            </Nav.Link>
                            <Nav.Link as={Link} to="/" className="nav-link position-absolute top-50 end-0 translate-middle-y">
                                Logout
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <div className=" mt-4">
                    <h3 className='text-center'>Welcome to dashboard</h3>
                    <div className="text-center">
                        <img src={this.state.image} alt="new" className="dashboardImg img-thumbnail" />
                    </div>
                </div>
            </>
        )
    }
}