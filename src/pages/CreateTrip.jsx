import { useEffect, useState } from "react";
import {
  getAllMatches,
  getAllLodgings,
  addNewTrip,
} from "../services/dataAccess";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const CreateTrip = () => {
  const [matches, setMatches] = useState([]);
  const [lodgings, setLodgings] = useState([]);
  const [tripData, setTripData] = useState({
    name: "",
    description: "",
    matchId: "",
    lodgingId: "",
  });

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const navigate = useNavigate();

  useEffect(() => {
    getAllMatches().then(setMatches);
    getAllLodgings().then(setLodgings);
  }, []);

  const handleChange = (e) => {
    setTripData({ ...tripData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTrip = {
      name: tripData.name,
      description: tripData.description,
      matchId: parseInt(tripData.matchId),
      lodgingId: parseInt(tripData.lodgingId),
      userId: user.id,
      createdAt: new Date().toISOString(),
    };

    addNewTrip(newTrip).then(() => navigate("/trips"));
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Create a New Trip</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="tripName">
          <Form.Label>Trip Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={tripData.name}
            onChange={handleChange}
            placeholder="Enter trip name"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="tripDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={tripData.description}
            onChange={handleChange}
            placeholder="Trip description"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="matchSelect">
          <Form.Label>Select Match</Form.Label>
          <Form.Select
            name="matchId"
            value={tripData.matchId}
            onChange={handleChange}
            required
          >
            <option value="">Choose a match...</option>
            {matches.map((match) => (
              <option key={match.id} value={match.id}>
                {match.team1} vs {match.team2} – {match.city}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-4" controlId="lodgingSelect">
          <Form.Label>Select Lodging</Form.Label>
          <Form.Select
            name="lodgingId"
            value={tripData.lodgingId}
            onChange={handleChange}
            required
          >
            <option value="">Choose lodging...</option>
            {lodgings.map((lodging) => (
              <option key={lodging.id} value={lodging.id}>
                {lodging.name} – {lodging.city}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button variant="success" type="submit">
          Create Trip
        </Button>
      </Form>
    </Container>
  );
};
