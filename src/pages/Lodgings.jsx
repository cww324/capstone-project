// src/pages/Lodgings.jsx
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { getAllLodgings } from '../services/dataAccess.js';
import { useEffect, useState } from 'react';

export const Lodgings = () => {
  const [lodgings, setLodgings] = useState([]);

  useEffect(() => {
    getAllLodgings().then((lodgings) => {
      setLodgings(lodgings);
    });
  }, []);

  return (
    <Container className="mt-4">
      {lodgings.map((lodging) => (
        <Card
          key={lodging.id}
          className="mb-4"
          style={{ maxWidth: '500px', margin: 'auto' }}
        >
          <Card.Header>{lodging.name}</Card.Header>
          <Card.Body>
            <Card.Title>{lodging.location}</Card.Title>
            <Card.Text>${lodging.price_per_night} per night</Card.Text>
            <Button variant="primary">Book Now</Button>
          </Card.Body>
          <Card.Footer>Available: {lodging.availableDates}</Card.Footer>
        </Card>
      ))}
    </Container>
  );
};
