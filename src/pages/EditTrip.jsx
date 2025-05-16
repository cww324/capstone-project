import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAllTrips, updateTrip } from "../services/dataAccess";
import { useUser } from "../hooks/useUser";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import { TripParticipants } from "../components/TripParticipants";
import Card from "react-bootstrap/Card";

export const EditTrip = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useUser();

  const [trip, setTrip] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getAllTrips().then((trips) => {
      const foundTrip = trips.find((t) => t.id === parseInt(tripId));
      if (!foundTrip) {
        setError("Trip not found");
      } else if (foundTrip.userId !== currentUser.id) {
        setError("You are not authorized to edit this trip.");
      } else {
        setTrip(foundTrip);
        setName(foundTrip.name);
        setDescription(foundTrip.description);
      }
    });
  }, []);
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this trip?")) {
      fetch(`http://localhost:8088/trips/${trip.id}`, {
        method: "DELETE",
      }).then(() => {
        // Also delete associated participants if needed
        fetch(`http://localhost:8088/participants?tripId=${trip.id}`)
          .then((res) => res.json())
          .then((participants) => {
            const deletePromises = participants.map((p) =>
              fetch(`http://localhost:8088/participants/${p.id}`, {
                method: "DELETE",
              })
            );
            return Promise.all(deletePromises);
          })
          .then(() => navigate("/my-trips"));
      });
    }
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    updateTrip(trip.id, {
      name,
      description,
      matchId: trip.match?.id || trip.matchId,
      lodgingId: trip.lodging?.id || trip.lodgingId,
      userId: trip.user?.id || trip.userId,
      createdAt: trip.createdAt,
    }).then(() => {
      navigate("/my-trips");
    });
  };

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!trip) {
    return (
      <Container className="mt-4">
        <p>Loading trip...</p>
      </Container>
    );
  }

  return (
    <>
      <Container className="mt-4">
        <h2 className="mb-4">Edit Trip</h2>

        <Card className="mt-4">
          <Card.Body>
            <Card.Title>
              {trip.match?.team1} vs {trip.match?.team2}
            </Card.Title>
            <Card.Text>
              {trip.match?.date} @ {trip.match?.stadium}, {trip.match?.city}
            </Card.Text>
            <Card.Footer className="text-muted">
              Organized by: {trip.user?.name}
            </Card.Footer>
          </Card.Body>
        </Card>

        <Form onSubmit={handleUpdate}>
          <Form.Group className="mb-3" controlId="tripName">
            <Form.Label>Trip Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="tripDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Save Changes
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete Trip
          </Button>
        </Form>
      </Container>
      <div>
        <TripParticipants
          tripId={trip.id}
          organizerId={trip.userId}
          currentuserId={currentUser.id}
          canEdit={trip.userId === currentUser.id}
        />
      </div>
    </>
  );
};
