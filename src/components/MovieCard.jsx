import { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function MovieCard(props) {
    console.log(props.movieProp);
    const { _id, title, director, year, description, genre } = props.movieProp;

    return (
        <Card className="my-4">
            <Card.Body>
                <Card.Title className='mb-3 fw-bold'>{title}</Card.Title>
                <Card.Subtitle>Director:</Card.Subtitle>
                <Card.Text>{director}</Card.Text>
                <Card.Subtitle>Year:</Card.Subtitle>
                <Card.Text>{year}</Card.Text>
                <Card.Subtitle>Description:</Card.Subtitle>
                <Card.Text>{description}</Card.Text>
                <Card.Subtitle>Genre:</Card.Subtitle>
                <Card.Text>{genre}</Card.Text>
                <Link className="btn btn-primary" to={`/movies/${_id}`}>Details</Link>
            </Card.Body>
        </Card>
    )
}

