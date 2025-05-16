import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

export const TripParticipants = ({
  tripId,
  canEdit = false,
  organizerId,
  currentUserId,
}) => {
  const [participants, setParticipants] = useState([]);

  const loadParticipants = () => {
    fetch(`http://localhost:8088/participants?tripId=${tripId}&_expand=user`)
      .then((res) => res.json())
      .then(setParticipants);
  };

  useEffect(() => {
    if (tripId) {
      loadParticipants();
    }
  }, [tripId]);

  const handleStatusUpdate = (participantId, newStatus) => {
    fetch(`http://localhost:8088/participants/${participantId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    }).then(() => loadParticipants());
  };

  return (
    <div className="mt-4">
      <h4>Participants</h4>
      {participants.length === 0 ? (
        <p>No participants yet.</p>
      ) : (
        <ul className="list-group">
          {participants.map((p) => {
            const isOrganizer = p.userId === organizerId;
            const isCurrentUser = p.userId === currentUserId;
            const showStatus = p.status && !isOrganizer;

            return (
              <li
                key={p.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  {p.user?.name || "Unknown User"}
                  {isOrganizer && " (organizer)"}
                  {!isOrganizer && isCurrentUser && " (you)"}
                  {showStatus && (
                    <Badge
                      bg={
                        p.status === "approved"
                          ? "success"
                          : p.status === "pending"
                          ? "warning"
                          : "secondary"
                      }
                      className="ms-2"
                    >
                      {p.status}
                    </Badge>
                  )}
                </div>

                {/* Only organizer sees action buttons for pending users (not for self or organizer) */}
                {canEdit &&
                  !isOrganizer &&
                  !isCurrentUser &&
                  p.status === "pending" && (
                    <div className="d-flex gap-1">
                      <Button
                        variant="outline-success"
                        size="sm"
                        onClick={() => handleStatusUpdate(p.id, "approved")}
                      >
                        ✔️
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleStatusUpdate(p.id, "rejected")}
                      >
                        🚫
                      </Button>
                    </div>
                  )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
