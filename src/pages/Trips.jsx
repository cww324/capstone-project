import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { getAllTrips } from '../services/dataAccess.js';

export const Trips = () => {
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllTrips().then(setTrips);
  }, []);

  return (
    <div className="trips-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>All Group Trips</h2>
        <Button onClick={() => navigate('/trips/create')} variant="primary">
          Create New Trip
        </Button>
      </div>
      {trips.length === 0 ? (
        <p>No trips created yet. Be the first to make one!</p>
      ) : (
        trips.map((trip) => (
          <Card key={trip.id} className="mb-3">
            <Card.Body>
              <Card.Title>{trip.name}</Card.Title>
              <Card.Text>
                Match: {trip.match?.team1} vs {trip.match?.team2}
                <br />
                Location: {trip.match?.city} – {trip.match?.stadium}
                <br />
                Organized by: {trip.user?.name}
                <br />
                {trip.description}
              </Card.Text>
              <Button onClick={() => navigate(`/trips/${trip.id}`)}>
                View Details
              </Button>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};
