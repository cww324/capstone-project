// src/pages/MyTrips.jsx
import { useEffect, useState } from 'react';
import { useUser } from '../hooks/useUser';
import { TripCard } from '../components/TripCard';
import { TripParticipants } from '../components/TripParticipants';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

export const MyTrips = () => {
  const { currentUser } = useUser();
  const [createdTrips, setCreatedTrips] = useState([]);
  const [joinedTrips, setJoinedTrips] = useState([]);

  useEffect(() => {
    // Fetch trips created by current user (with match, lodging, and user info)
    fetch(
      `http://localhost:8088/trips?_expand=match&_expand=lodging&_expand=user`
    )
      .then((res) => res.json())
      .then((trips) => {
        const userCreated = trips.filter(
          (trip) => trip.userId === currentUser.id
        );
        setCreatedTrips(userCreated);
      });

    // Fetch trips user has joined (via participants)
    fetch(
      `http://localhost:8088/participants?userId=${currentUser.id}&_expand=trip&_expand=trip.match&_expand=trip.lodging&_expand=trip.user`
    )
      .then((res) => res.json())
      .then((joins) => {
        const trips = joins
          .map((p) => p.trip)
          .filter((trip) => trip.userId !== currentUser.id); // Avoid showing as both creator + joiner
        setJoinedTrips(trips);
      });
  }, [currentUser.id]);

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">My Trips</h2>

      {/* Trips You Created */}
      {createdTrips.length > 0 && (
        <>
          <h4 className="mb-3">Trips You Created</h4>
          <Row className="mb-5">
            {createdTrips.map((trip) => (
              <Col key={trip.id} xs={12} md={6} lg={4} className="mb-4">
                <div className="shadow-sm h-100 border rounded p-3 bg-light">
                  <TripCard trip={trip} currentUser={currentUser} />
                  <hr />
                  <TripParticipants
                    tripId={trip.id}
                    organizerId={trip.userId}
                    currentUserId={currentUser.id}
                    canEdit={true}
                  />
                </div>
              </Col>
            ))}
          </Row>
        </>
      )}

      {/* Trips You Joined */}
      {joinedTrips.length > 0 && (
        <>
          <h4 className="mb-3">Trips You Joined</h4>
          <Row>
            {joinedTrips.map((trip) => (
              <Col key={trip.id} xs={12} md={6} lg={4} className="mb-4">
                <div className="shadow-sm h-100 border rounded p-3 bg-white">
                  <TripCard trip={trip} currentUser={currentUser} />
                </div>
              </Col>
            ))}
          </Row>
        </>
      )}

      {/* No Trips Message */}
      {createdTrips.length === 0 && joinedTrips.length === 0 && (
        <Alert variant="info" className="mt-4 text-center">
          You haven't joined or created any trips yet.
        </Alert>
      )}
    </Container>
  );
};
