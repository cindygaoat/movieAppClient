import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

const UpdateMovie = ({ movie, fetchData }) => {
    const [showEdit, setShowEdit] = useState(false);
    const [title, setTitle] = useState(movie.title)
    const [director, setDirector] = useState(movie.director)
    const [year, setYear] = useState(movie.year)
    const [description, setDescription] = useState(movie.description)
    const [genre, setGenre] = useState(movie.genre);

    const [loading, setLoading] = useState(false);

    const openEdit = () => {
        setShowEdit(true);
    };

    const closeEdit = () => {
        setShowEdit(false);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        setLoading(true);

        fetch(`https://movieappapi-h11v.onrender.com/movies/updateMovie/${movie._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ 
                title: title, 
                director: director, 
                year: year, 
                description: description, 
                genre: genre  
            })
        })
        .then(res => res.json())
        .then(data => {
            setLoading(false);
            console.log("data", data)
            if (data.message === 'Movie updated successfully') {
                Swal.fire('Success!', 'Movie updated successfully', 'success');
                fetchData(); // Refresh the product list
                closeEdit(); // Close the modal
            } else {
                Swal.fire('Error!', 'Failed to update movie', 'error');
            }
        })
        .catch(error => {
        	console.log("error",error)
            setLoading(false);
            Swal.fire('Error!', 'Network error. Please try again later.', 'error');
            console.error('Error:', error);
        });
    };

    return (
        <>
            <Button variant="primary" size="sm" onClick={openEdit}>Update</Button>

            <Modal show={showEdit} onHide={closeEdit}>
                <Form onSubmit={handleUpdate}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Movie</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="movieTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control 
                                type="text"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="movieDirector">
                            <Form.Label>Director</Form.Label>
                            <Form.Control 
                                type="text"
                                required
                                value={director}
                                onChange={(e) => setDirector(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="movieYear">
                            <Form.Label>Year</Form.Label>
                            <Form.Control 
                                type="number"
                                step="1"
                                required
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="movieYear">
                            <Form.Label>Year</Form.Label>
                            <Form.Control 
                                type="number"
                                step="1"
                                required
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="movieDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control 
                                type="text"
                                required
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="movieGenre">
                            <Form.Label>Genre</Form.Label>
                            <Form.Control 
                                type="text"
                                required
                                value={genre}
                                onChange={(e) => setGenre(e.target.value)}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeEdit}>Close</Button>
                        <Button variant="success" type="submit" disabled={loading}>
                            {loading ? 'Updating...' : 'Update'}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default UpdateMovie;
