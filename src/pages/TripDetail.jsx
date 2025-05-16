// src/pages/TripDetail.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { TripParticipants } from "../components/TripParticipants";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

export const TripDetail = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useUser();

  const [trip, setTrip] = useState(null);
  const [hasJoined, setHasJoined] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8088/trips/${tripId}?_expand=match&_expand=user`)
      .then((res) => res.json())
      .then(setTrip);

    fetch(
      `http://localhost:8088/participants?tripId=${tripId}&userId=${currentUser.id}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) setHasJoined(true);
      });
  }, [tripId, currentUser.id]);

  const handleJoinTrip = () => {
    fetch("http://localhost:8088/participants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tripId: parseInt(tripId),
        userId: currentUser.id,
        status: "pending",
      }),
    }).then(() => setHasJoined(true));
  };

  if (!trip) {
    return <Container className="mt-4">Loading trip details...</Container>;
  }

  const isOrganizer = trip.userId === currentUser.id;

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <div className="position-relative">
            <Button
              variant="outline-secondary"
              size="sm"
              className="position-absolute top-0 end-0 m-2"
              onClick={() => navigate(`/edit-trip/${trip.id}`)}
            >
              ✏️ Edit
            </Button>

            <div>
              <Card.Title>{trip.name}</Card.Title>
              <Card.Subtitle className="mb-3 text-muted">
                Organized by: {trip.user?.name}
              </Card.Subtitle>
            </div>
          </div>

          <Card.Text>{trip.description}</Card.Text>

          <hr />

          <h5>Match Info</h5>
          <p>
            {trip.match?.team1} vs {trip.match?.team2}
            <br />
            {trip.match?.date} @ {trip.match?.stadium}, {trip.match?.city}
          </p>

          <div className="mt-4">
            {isOrganizer ? (
              <p className="text-success">You organized this trip.</p>
            ) : hasJoined ? (
              <p className="text-info">You’ve already joined this trip.</p>
            ) : (
              <Button variant="primary" onClick={handleJoinTrip}>
                Join Trip
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>

      <TripParticipants
        tripId={trip.id}
        organizerId={trip.userId}
        currentUserId={currentUser.id}
        canEdit={isOrganizer}
      />
    </Container>
  );
};
