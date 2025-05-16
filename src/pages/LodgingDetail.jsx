import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const LodgingDetail = () => {
  const { lodgingId } = useParams();
  const navigate = useNavigate();

  const [lodging, setLodging] = useState(null);
  const [matches, setMatches] = useState([]);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    // Get lodging details
    fetch(`http://localhost:8088/lodgings/${lodgingId}`)
      .then((res) => res.json())
      .then(setLodging);

    // Get all matches
    fetch(`http://localhost:8088/matches`)
      .then((res) => res.json())
      .then(setMatches);

    // Get all trips
    fetch(`http://localhost:8088/trips`)
      .then((res) => res.json())
      .then(setTrips);
  }, [lodgingId]);

  if (!lodging) return <div className="p-4">Loading lodging...</div>;

  const matchesInSameCity = matches.filter(
    (match) => match.city === lodging.city
  );

  const isLodgingBookedForMatch = (matchId) =>
    trips.some(
      (trip) =>
        trip.matchId === matchId && trip.lodgingId === parseInt(lodgingId)
    );

  return (
    <Container className="mt-4">
      <Card className="mb-4 shadow-sm">
        <Card.Img
          variant="top"
          src={lodging.imageUrl}
          alt={lodging.name}
          style={{ height: "250px", objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title>{lodging.name}</Card.Title>
          <Card.Text>
            <strong>City:</strong> {lodging.city}
            <br />
            <strong>Price:</strong> ${lodging.pricePerNight}/night
          </Card.Text>
        </Card.Body>
      </Card>

      <h4 className="mb-3">Matches in {lodging.city}</h4>
      <Row>
        {matchesInSameCity.map((match) => {
          const alreadyBooked = isLodgingBookedForMatch(match.id);

          return (
            <Col key={match.id} xs={12} md={6} lg={4} className="mb-3">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>
                    Match #{match.matchNumber}: {match.team1} vs {match.team2}
                  </Card.Title>
                  <Card.Text>
                    {match.stadium} —{" "}
                    {new Date(match.date).toLocaleDateString()}
                  </Card.Text>
                  <Button
                    variant={alreadyBooked ? "secondary" : "primary"}
                    disabled={alreadyBooked}
                    onClick={() =>
                      navigate(
                        `/trips/create?matchId=${match.id}&lodgingId=${lodging.id}`
                      )
                    }
                  >
                    {alreadyBooked ? "Booked" : "Create Trip with This Lodging"}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};
