// src/pages/Lodgings.jsx
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export const Lodgings = () => {
  return (
    <Container className="mt-4">
      <h1>Lodgings Page, Welcome</h1>
      <Card className="mb-4" style={{ maxWidth: '500px', margin: 'auto' }}>
        <Card.Header>Azteca Hostel</Card.Header>
        <Card.Body>
          <Card.Title>123 Stadium St, Mexico City</Card.Title>
          <Card.Text>$40 per night</Card.Text>
          <Button variant="primary">Book Now</Button>
        </Card.Body>
        <Card.Footer>Available: June 15 - June 25</Card.Footer>
      </Card>
    </Container>
  );
};
