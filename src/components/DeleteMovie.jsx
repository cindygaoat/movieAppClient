import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

const DeleteMovie = ({movie, fetchData}) => {

	const handleDelete = (e) => {
		fetch(`https://movieappapi-h11v.onrender.com/movies/deleteMovie/${movie._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            
            console.log("data", data)
            if (data.message === 'Movie deleted successfully') {
            	Swal.fire('Success!', 'Movie deleted successfully', 'success');
                fetchData(); // Refresh the product list
                
            } else {
                Swal.fire('Error!', 'Error in deleting movie', 'error');
            }
        })
        .catch(error => {
        	console.log("error",error)
            Swal.fire('Error!', 'Network error. Please try again later.', 'error');
            console.error('Error:', error);
        });
	}

    return(
        <Button variant="danger" size="sm" onClick={handleDelete}>Delete</Button>
    )
}

export default DeleteMovie;