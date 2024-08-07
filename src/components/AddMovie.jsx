import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

const AddMovie = ({ fetchData }) => {
    const [showEdit, setShowEdit] = useState(false);
    const [title, setTitle] = useState("")
    const [director, setDirector] = useState("")
    const [year, setYear] = useState(0)
    const [description, setDescription] = useState("")
    const [genre, setGenre] = useState("");
    const [isActive, setIsActive] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if((title !== "" && director !== "" && description !== "" && genre !== "" && year !== 0)){

            setIsActive(true)

        } else {

            setIsActive(false)

        }
    }, [title, director, year, description, genre])

    const openEdit = () => {
        setShowEdit(true);
    };

    const closeEdit = () => {
        setShowEdit(false);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        setLoading(true);

        fetch(`https://movieappapi-h11v.onrender.com/movies/addMovie`, {
            method: 'POST',
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
            if (data.error === 'Failed to save the movie') {
                Swal.fire('Error!', 'Failed to update movie', 'error');
            } else {
                Swal.fire('Success!', 'Movie add successfully', 'success');
                fetchData(); // Refresh the product list
                closeEdit(); // Close the modal
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
            <Button variant="success" size="sm" onClick={openEdit}>Add Movie</Button>

            <Modal show={showEdit} onHide={closeEdit}>
                <Form onSubmit={handleUpdate}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Product</Modal.Title>
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
                            {loading ? 'Adding...' : 'Add'}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default AddMovie;
