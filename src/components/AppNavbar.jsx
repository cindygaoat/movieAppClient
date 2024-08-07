import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {  Link, NavLink } from 'react-router-dom';
import UserContext from '../hooks/UserContext';
import '../index.css';


export default function AppNavbar(){

  const { user } = useContext(UserContext);


	return (
		
			<Navbar expand="lg" className="bg-danger">
          	<Container>
            <Navbar.Brand className="fw-bold text-light" as={Link} to="/">Movie App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto text color">
                <Nav.Link className='text-light'as={NavLink} to="/" exact="true">Home</Nav.Link>
                <Nav.Link className='text-light'as={NavLink} to="/movies" exact="true">Movies</Nav.Link>
                {(user.id !== null && user.id !== undefined) ? 
                        user.isAdmin 
                        ?
                        <>
                            <Nav.Link className='text-light'as={NavLink} to="/moviesAdmin" exact="true">Dashboard</Nav.Link>
                            <Nav.Link className='text-light'as={NavLink} to="/logout">Logout</Nav.Link>
                        </>
                        :
                        <>
                            <Nav.Link className='text-light'as={NavLink} to="/logout" exact="true">Logout</Nav.Link>
                        </>
                    :
                    <>
                        <Nav.Link className='text-light'as={NavLink} to="/login" exact="true">Login</Nav.Link>
                        <Nav.Link className='text-light'as={NavLink} to="/register" exact="true">Register</Nav.Link>
                    </>
                }
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
	
	)
}