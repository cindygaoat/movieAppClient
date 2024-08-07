import { useState, useEffect } from 'react';
import {Container} from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { UserProvider } from './hooks/UserContext';
import AppNavbar from './components/AppNavbar';

import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';
import Movies from './pages/Movies';
import MoviesAdmin from './pages/MoviesAdmin';
import ViewMovieDetails from './pages/ViewMovieDetails';

function App() {

  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  });

  function unsetUser(){
    localStorage.clear();
  };

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch('https://movieappapi-h11v.onrender.com/users/details', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      console.log(typeof data !== undefined)
      if(typeof data !== undefined){
        setUser({
          id: data.user._id,
          isAdmin: data.user.isAdmin
        });
        console.log(user);
      } else {
        setUser({
          id: null,
          isAdmin: null
        });
      }
    })
  }, [token])

  useEffect(() => {
    console.log(user);
    console.log(localStorage);
  }, [user]);

  return (
    <>
      <UserProvider value={{ user, setUser, unsetUser }}>
        <Router>
          <AppNavbar />
          <Container>
            <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/login" element={<Login />}/>
              <Route path="/register" element={<Register />}/>
                <Route path="/moviesAdmin" element={<MoviesAdmin />}/>        
                <Route path="/movies" element={<Movies />}/>             
              <Route path="/movies/:movieId" element={<ViewMovieDetails />}/>
              <Route path="/logout" element={<Logout />}/>
            </Routes>
          </Container>
        </Router>
      </UserProvider>
    </>
  )
}

export default App
