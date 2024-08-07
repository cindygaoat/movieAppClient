import React, { useState, useEffect, useContext } from 'react';
import MovieCard from '../components/MovieCard';
import { Col, Row } from 'react-bootstrap';

import UserContext from '../hooks/UserContext';

export default function Movies() {

    const {user} = useContext(UserContext);

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
    	let fetchUrl = "https://movieappapi-h11v.onrender.com/movies/getMovies"

    	fetch(fetchUrl, {
    		headers: {
    			Authorization: `Bearer ${localStorage.getItem('token')}`
    		}
    	})
    	.then(res => res.json())
    	.then(data => {
    		console.log(data);

    		if(data.message === "Error in finding movies: "){
    			setMovies([])
    		} else {
    			setMovies(data.movies);
    		}
    	})

    }
 
    return(
       
    	<Row className='justify-content-center'>
            {
                movies.map(movie => {
                    return (
                        <Col lg={10} key={movie._id}>
                            <MovieCard movieProp={movie} />
                        </Col>
                    )
                })
            }
        </Row>
    )
}