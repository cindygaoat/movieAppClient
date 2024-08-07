import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Form, Button, ListGroup, Container, Alert } from 'react-bootstrap';
import UserContext from '../hooks/UserContext';

const ViewMovieDetails = () => {

    const {user} = useContext(UserContext);
    const { movieId } = useParams();

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetch(`https://movieappapi-h11v.onrender.com/movies/getComments/${movieId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
            .then(response => response.json())
            .then(data => {
                setComments(data.comments) 
                console.log("result from fetch comments ", data)
                console.log("array fetch comments ", data.comments)
                console.log("fetchedComments ", comments)
    })
            .catch(err => console.error('Error fetching comments:', err));
    }, [comments]);

    const handleAddComment = (e) => {
        e.preventDefault();
        fetch(`https://movieappapi-h11v.onrender.com/movies/addComment/${movieId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ comment: newComment })
        })
            .then(response => response.json())
            .then(data => {
                setComments([...comments, data]);
                setNewComment('');
                setSuccess('Comment added successfully!');
                setError('');
            })
            .catch(err => {
                setError('Failed to add comment.');
                setSuccess('');
                console.error('Error adding comment:', err);
            });
    };

    return (
        <Container className="my-4">
            <h2 className="mb-3">Comments</h2>
            {success && <Alert variant="success">{success}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            <ListGroup className="mb-4">
            {/* {(comments.length === 0 && user.isAdmin) ? */}
                <h5 className='my-5'>No comments on this post.</h5>
                {/* : */}
                {/* <h5 className='my-5'>Be the first to comment.</h5> */}
            {/* } */}
                {comments.map(comment => (
                    <ListGroup.Item key={comment._id}>
                        {comment.comment}
                    </ListGroup.Item>
                ))}
            </ListGroup>
           
            <Form onSubmit={handleAddComment}>
                 { (!user.isAdmin && user) &&
                <>
                <Form.Group controlId="commentForm">
                        <Form.Label>Add a Comment</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Write your comment here..."
                            required />
                    </Form.Group><Button variant="primary" type="submit" className="mt-2 me-4">
                            Submit
                        </Button>
                        </>
                }
                <Link className="btn btn-primary mt-2" to={`/`}>Back</Link>
            </Form>

        </Container>
    );
};

export default ViewMovieDetails;
