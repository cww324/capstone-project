import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import {
  getAllMatches,
  getAllLodgings,
  addNewTrip,
} from "../services/dataAccess";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

export const CreateTrip = () => {
  const { currentUser } = useUser();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preselectedMatchId = searchParams.get("matchId");
  const preselectedLodgingId = searchParams.get("lodgingId");

  const [matches, setMatches] = useState([]);
  const [lodgings, setLodgings] = useState([]);
  const [filteredLodgings, setFilteredLodgings] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    matchId: preselectedMatchId || "",
    lodgingId: preselectedLodgingId || "",
  });

  useEffect(() => {
    getAllMatches().then(setMatches);
    getAllLodgings().then(setLodgings);
  }, []);

  // Filter lodgings based on selected match
  useEffect(() => {
    if (!formData.matchId) {
      setFilteredLodgings([]);
      return;
    }

    const match = matches.find((m) => m.id === parseInt(formData.matchId));

    if (match) {
      const city = match.city;
      const lodgingsInCity = lodgings.filter((l) => l.city === city);
      setFilteredLodgings(lodgingsInCity);
    }
  }, [formData.matchId, matches, lodgings]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTrip = {
      name: formData.name,
      description: formData.description,
      matchId: parseInt(formData.matchId),
      lodgingId: parseInt(formData.lodgingId),
      userId: currentUser.id,
      createdAt: new Date().toISOString(),
    };

    addNewTrip(newTrip).then((createdTrip) => {
      fetch("http://localhost:8088/participants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tripId: createdTrip.id,
          userId: currentUser.id,
          status: "approved",
        }),
      }).then(() => {
        navigate(`/trips/${createdTrip.id}`);
      });
    });
  };

  return (
    <Container className="mt-4">
      <h2>Create a New Trip</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="tripName">
          <Form.Label>Trip Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="tripDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="tripMatch">
          <Form.Label>Select Match</Form.Label>
          <Form.Select
            name="matchId"
            value={formData.matchId}
            onChange={handleChange}
            required
          >
            <option value="">-- Select a Match --</option>
            {matches.map((match) => (
              <option key={match.id} value={match.id}>
                {match.team1} vs {match.team2} — {match.city}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="tripLodging">
          <Form.Label>Select Lodging</Form.Label>
          <Form.Select
            name="lodgingId"
            value={formData.lodgingId}
            onChange={handleChange}
            required
            disabled={!formData.matchId}
          >
            <option value="">-- Select Lodging --</option>
            {filteredLodgings.map((lodging) => (
              <option key={lodging.id} value={lodging.id}>
                {lodging.name} – {lodging.city} - ${lodging.pricePerNight}/night
              </option>
            ))}
          </Form.Select>
          {!formData.matchId && (
            <Form.Text className="text-muted">
              Please select a match first.
            </Form.Text>
          )}
        </Form.Group>

        <Button variant="success" type="submit">
          Create Trip
        </Button>
      </Form>
    </Container>
  );
};
