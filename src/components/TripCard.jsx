// src/components/TripCard.jsx
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import "../css/TripCard.css";

export const TripCard = ({ trip }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/trips/${trip.id}`);
  };

  return (
    <Card
      className="mb-3 shadow-sm"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <Card.Body>
        <Card.Title>{trip.name}</Card.Title>
        <Card.Text>{trip.description}</Card.Text>
        {/* You can add more trip info here if you want */}
      </Card.Body>
    </Card>
  );
};
