// src/pages/TripDetail.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { TripParticipants } from "../components/TripParticipants";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Stack from "react-bootstrap/Stack";
import Flag from "react-world-flags";
import { countryCodes } from "../services/countryCodes";

export const TripDetail = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useUser();

  const [trip, setTrip] = useState(null);
  const [hasJoined, setHasJoined] = useState(false);

  useEffect(() => {
    fetch(
      `http://localhost:8088/trips/${tripId}?_expand=match&_expand=user&_expand=lodging`
    )
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

  const getFlagCode = (country) => countryCodes[country] || "UN";

  return (
    <Container className="mt-4">
      <Card className="shadow-sm">
        <Card.Body>
          {/* Edit Button */}
          {isOrganizer && (
            <Button
              variant="outline-secondary"
              size="sm"
              className="position-absolute top-0 end-0 m-2"
              onClick={() => navigate(`/edit-trip/${trip.id}`)}
            >
              ✏️ Edit
            </Button>
          )}

          {/* Title & Organizer */}
          <h3 className="mb-1">{trip.name}</h3>
          <p className="text-muted mb-3">
            Organized by <strong>{trip.user?.name}</strong>
          </p>

          {/* Description */}
          {trip.description && <Card.Text>{trip.description}</Card.Text>}

          <hr />

          {/* Match Info */}
          <h5 className="mt-3">Match Info</h5>
          <Stack
            direction="horizontal"
            gap={2}
            className="align-items-center mb-2"
          >
            <Flag code={getFlagCode(trip.match?.team1)} style={{ width: 28 }} />
            <span className="fw-semibold">{trip.match?.team1}</span>
            <span className="mx-1">vs</span>
            <Flag code={getFlagCode(trip.match?.team2)} style={{ width: 28 }} />
            <span className="fw-semibold">{trip.match?.team2}</span>
          </Stack>
          <div className="text-muted">
            {trip.match?.stadium} — {trip.match?.city}
            <br />
            <small>
              {new Date(trip.match?.date).toLocaleDateString(undefined, {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </small>
          </div>

          {/* Lodging Info */}
          {trip.lodging && (
            <>
              <hr />
              <h5 className="mt-3">Lodging</h5>
              <div>
                <div className="fw-semibold">{trip.lodging.name}</div>
                <small className="text-muted">
                  ${trip.lodging.pricePerNight}/night
                </small>
              </div>
            </>
          )}

          {/* Join Info */}
          <div className="mt-4">
            {isOrganizer ? (
              <Alert variant="success">You organized this trip.</Alert>
            ) : hasJoined ? (
              <Alert variant="info">
                You’ve already requested to join this trip.
              </Alert>
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
