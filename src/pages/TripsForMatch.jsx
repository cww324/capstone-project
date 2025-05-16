// src/pages/TripsForMatch.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getAllTrips,
  getAllLodgings,
  getAllMatches,
} from "../services/dataAccess";
import { TripCard } from "../components/TripCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export const TripsForMatch = () => {
  const { matchId } = useParams();
  const navigate = useNavigate();

  const [trips, setTrips] = useState([]);
  const [lodgings, setLodgings] = useState([]);
  const [match, setMatch] = useState(null);

  useEffect(() => {
    getAllTrips().then((allTrips) => {
      const filtered = allTrips.filter(
        (trip) => trip.matchId === parseInt(matchId)
      );
      setTrips(filtered);
    });

    getAllLodgings().then(setLodgings);

    getAllMatches().then((matches) => {
      const selected = matches.find((m) => m.id === parseInt(matchId));
      setMatch(selected || null);
    });
  }, [matchId]);

  const getLodgingName = (lodgingId) => {
    const lodging = lodgings.find((l) => l.id === lodgingId);
    return lodging ? `${lodging.name} – ${lodging.city}` : "Loading...";
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">
          Trips for Match:&nbsp;
          {match ? (
            <>
              <span className="text-primary fw-bold">
                {match.team1} vs {match.team2}
              </span>{" "}
              <small className="text-muted">
                ({match.city} @ {match.stadium})
              </small>
            </>
          ) : (
            `#${matchId}`
          )}
        </h2>
        <Button
          variant="primary"
          onClick={() => navigate(`/trips/create?matchId=${matchId}`)}
        >
          Create New Trip
        </Button>
      </div>

      {trips.length === 0 ? (
        <p>No trips found for this match. Be the first to create one!</p>
      ) : (
        <Row>
          {trips.map((trip) => (
            <Col key={trip.id} xs={12} sm={6} md={4} lg={3}>
              <TripCard trip={trip} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};
