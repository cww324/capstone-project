// src/components/LodgingCard.jsx
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import "../css/LodgingCard.css";

export const LodgingCard = ({ lodging }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/lodgings/${lodging.id}`);
  };

  return (
    <Card
      className="h-100 shadow-sm lodging-card"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <Card.Img
        variant="top"
        src={lodging.imageUrl}
        alt={lodging.name}
        style={{ height: "180px", objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          <Card.Title className="text-truncate">{lodging.name}</Card.Title>
          <Card.Text className="text-muted">{lodging.city}</Card.Text>
        </div>
        <Card.Text className="fw-bold mt-2">
          ${lodging.pricePerNight}/night
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
