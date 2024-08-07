import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../hooks/UserContext';
import { Table, Button } from 'react-bootstrap';

import AddMovie from '../components/AddMovie';
import UpdateMovie from '../components/UpdateMovie';
import DeleteMovie from '../components/DeleteMovie';

export default function MoviesAdmin() {

	const {user} = useContext(UserContext);

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetchData();
    }, [user]);

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

	return (
		<>
			<Table striped bordered hover className="text-center">
	      	<thead>
	        <tr>
	          <th>Title</th>
	          <th>Director</th>
	          <th>Year</th>
	          <th>Description</th>
	          <th>Genre</th>
	          <th>Action</th>
	        </tr>
	     	</thead>
	        <tbody>
	          	{movies.map(movie => (
	            <tr key={movie._id}>
		              	<td>{movie.title}</td>
		              	<td>{movie.director}</td>
		              	<td>{movie.year}</td>
		              	<td>{movie.description}</td>
		              	<td>{movie.genre}</td>
		              
		              	<td className="text-center d-flex justify-content-end">
							<div className="mx-1">
								<UpdateMovie movie={movie} fetchData={fetchData} />
							</div>
							<div className="mx-1"> 
							<DeleteMovie movie={movie} fetchData={fetchData} />
							</div>
						</td>
	            </tr>
	          	))}
	        </tbody>
	    </Table>
	    <AddMovie fetchData={fetchData} />
		</>
  )
}