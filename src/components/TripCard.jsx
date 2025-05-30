// src/components/TripCard.jsx
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Flag from "react-world-flags";
import { useNavigate } from "react-router-dom";
import { countryCodes } from "../services/countryCodes.js";

const getFlagCode = (countryName) => countryCodes[countryName] || "UN";

export const TripCard = ({ trip, currentUser }) => {
  const navigate = useNavigate();
  const match = trip.match;
  const lodging = trip.lodging;
  const isCreator = trip.userId === currentUser?.id;

  return (
    <Card className="mb-4 shadow-sm border-0">
      <Card.Body>
        {/* Header */}
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <Card.Title className="mb-0">{trip.groupName}</Card.Title>
            <small className="text-muted">
              Organized by {isCreator ? "You" : trip.user?.name || "Unknown"}
            </small>
          </div>

          {isCreator && (
            <Badge bg="primary" className="ms-2">
              Organizer
            </Badge>
          )}
        </div>

        {/* Match Info */}
        {match && (
          <div className="mt-3">
            <div className="fw-semibold d-flex align-items-center gap-2 flex-wrap">
              <span>⚽ Match {match.matchNumber}:</span>
              <Flag code={getFlagCode(match.team1)} style={{ width: "24px" }} />
              <span>{match.team1}</span>
              <span className="mx-1">vs</span>
              <Flag code={getFlagCode(match.team2)} style={{ width: "24px" }} />
              <span>{match.team2}</span>
            </div>
            <div className="text-muted">{match.stadium}</div>
            <div>
              <small className="text-secondary">
                {new Date(match.date).toLocaleDateString(undefined, {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </small>
            </div>
          </div>
        )}

        {/* Lodging Info */}
        {lodging && (
          <div className="mt-3">
            <div className="fw-semibold">{lodging.name}</div>
            <small className="text-muted">${lodging.pricePerNight}/night</small>
          </div>
        )}

        {/* Actions */}
        <Stack direction="horizontal" gap={2} className="mt-4">
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => navigate(`/trips/${trip.id}`)}
          >
            View Details
          </Button>
        </Stack>
      </Card.Body>
    </Card>
  );
};
