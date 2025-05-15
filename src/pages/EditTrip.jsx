import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAllTrips, updateTrip } from "../services/dataAccess";
import { useUser } from "../hooks/useUser";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";

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

  const handleUpdate = (e) => {
    e.preventDefault();
    updateTrip(trip.id, { ...trip, name, description }).then(() => {
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
    <Container className="mt-4">
      <h2 className="mb-4">Edit Trip</h2>
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
      </Form>
    </Container>
  );
};
