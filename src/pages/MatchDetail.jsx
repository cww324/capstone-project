import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { TripCard } from "../components/TripCard";

export const MatchDetail = () => {
  const { matchId } = useParams();
  const [match, setMatch] = useState(null);
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8088/matches/${matchId}`)
      .then((res) => res.json())
      .then(setMatch);

    fetch(
      `http://localhost:8088/trips?matchId=${matchId}&_expand=lodging&_expand=user`
    )
      .then((res) => res.json())
      .then(setTrips);
  }, [matchId]);

  if (!match) return <div className="p-4">Loading match details...</div>;

  return (
    <Container className="mt-4">
      <h2 className="mb-3">
        Match #{match.matchNumber}: {match.team1} vs {match.team2}
      </h2>
      <p>
        <strong>Group:</strong> {match.group}
      </p>
      <p>
        <strong>Location:</strong> {match.city} – {match.stadium}
      </p>
      <p>
        <strong>Date:</strong>{" "}
        {new Date(match.date).toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        })}
      </p>

      <Button
        variant="primary"
        className="my-4"
        onClick={() => navigate(`/create-trip?matchId=${match.id}`)}
      >
        Create Group Trip
      </Button>

      <h4 className="mb-3">Available Group Trips</h4>
      <Row>
        {trips.length > 0 ? (
          trips.map((trip) => (
            <Col key={trip.id} xs={12} sm={6} md={4} lg={3}>
              <TripCard trip={trip} />
            </Col>
          ))
        ) : (
          <p>No group trips yet for this match.</p>
        )}
      </Row>
    </Container>
  );
};
