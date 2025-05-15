import { useEffect, useState } from "react";
import {
  getAllTrips,
  getAllParticipants,
  getAllUsers,
  updateParticipantApproval,
  deleteTrip,
} from "../services/dataAccess";
import { useUser } from "../hooks/useUser";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import Alert from "react-bootstrap/Alert";
import { deleteParticipant } from "../services/dataAccess";

export const MyTrips = () => {
  const { currentUser } = useUser();
  const [createdTrips, setCreatedTrips] = useState([]);
  const [appliedTrips, setAppliedTrips] = useState([]);
  const [allParticipants, setAllParticipants] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser?.id) return;

    const loadData = async () => {
      try {
        const [trips, participants, users] = await Promise.all([
          getAllTrips(),
          getAllParticipants(),
          getAllUsers(),
        ]);

        setAllParticipants(participants);
        setAllUsers(users);

        const tripsICreated = trips.filter(
          (trip) => trip.userId === currentUser.id
        );
        setCreatedTrips(tripsICreated);

        const myParticipantEntries = participants.filter(
          (p) => p.userId === currentUser.id
        );
        const myAppliedTripIds = myParticipantEntries.map((p) => p.tripId);
        const myAppliedTrips = trips.filter((trip) =>
          myAppliedTripIds.includes(trip.id)
        );

        const appliedWithStatus = myAppliedTrips.map((trip) => {
          const myEntry = myParticipantEntries.find(
            (p) => p.tripId === trip.id
          );
          return {
            ...trip,
            status: myEntry?.approved ? "approved" : "pending",
            user: users.find((u) => u.id === trip.userId),
          };
        });

        setAppliedTrips(appliedWithStatus);
      } catch (error) {
        console.error("🔥 Error loading MyTrips:", error);
      }
    };

    loadData();
  }, []);

  const handleApproval = (participantId, approved) => {
    updateParticipantApproval(participantId, approved).then(() => {
      getAllParticipants().then(setAllParticipants);
    });
  };

  const handleEditTrip = (tripId) => {
    navigate(`/edit-trip/${tripId}`);
  };

  const handleDeleteTrip = (tripId) => {
    if (window.confirm("Are you sure you want to delete this trip?")) {
      deleteTrip(tripId).then(() => {
        setCreatedTrips((prev) => prev.filter((trip) => trip.id !== tripId));
      });
    }
  };

  const handleReject = (participantId) => {
    if (window.confirm("Are you sure you want to reject this participant?")) {
      deleteParticipant(participantId).then(() => {
        setAllParticipants((prev) =>
          prev.filter((p) => p.id !== participantId)
        );
      });
    }
  };

  const getUsername = (userId) => {
    const user = allUsers.find((u) => u.id === userId);
    return user?.name || user?.username || `User ${userId}`;
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Trips You Created</h2>
      {createdTrips.length === 0 ? (
        <Alert variant="info">You haven't created any trips yet.</Alert>
      ) : (
        <Row>
          {createdTrips.map((trip) => {
            const tripParticipants = allParticipants.filter(
              (p) => p.tripId === trip.id
            );

            return (
              <Col md={6} key={trip.id} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>{trip.name}</Card.Title>
                    <Card.Text>{trip.description}</Card.Text>
                    <Card.Text className="text-muted">
                      Organizer: <strong>{getUsername(trip.userId)}</strong>
                    </Card.Text>
                    <div className="mb-3 d-flex gap-2">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleEditTrip(trip.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDeleteTrip(trip.id)}
                      >
                        Delete
                      </Button>
                    </div>

                    {tripParticipants.length > 0 && (
                      <>
                        <hr />
                        <h6>Participants:</h6>
                        <ListGroup variant="flush">
                          {tripParticipants.map((p) => (
                            <ListGroup.Item
                              key={p.id}
                              className="d-flex justify-content-between align-items-center"
                            >
                              {getUsername(p.userId)}
                              <div className="d-flex align-items-center gap-2">
                                <Badge bg={p.approved ? "success" : "warning"}>
                                  {p.approved ? "Approved" : "Pending"}
                                </Badge>
                                {!p.approved && (
                                  <>
                                    <Button
                                      variant="success"
                                      size="sm"
                                      onClick={() => handleApproval(p.id, true)}
                                    >
                                      Approve
                                    </Button>
                                    <Button
                                      variant="danger"
                                      size="sm"
                                      onClick={() => handleReject(p.id)}
                                    >
                                      Reject
                                    </Button>
                                  </>
                                )}
                              </div>
                            </ListGroup.Item>
                          ))}
                        </ListGroup>
                      </>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}

      <h2 className="mt-5 mb-4">Trips You Applied To</h2>
      {appliedTrips.length === 0 ? (
        <Alert variant="info">You haven't applied to any trips.</Alert>
      ) : (
        <Row>
          {appliedTrips.map((trip) => (
            <Col md={6} key={trip.id} className="mb-4">
              <Card border="light">
                <Card.Body>
                  <Card.Title>{trip.name}</Card.Title>
                  <Card.Text>{trip.description}</Card.Text>
                  <Card.Text className="text-muted">
                    Organizer: <strong>{getUsername(trip.userId)}</strong>
                  </Card.Text>
                  <Badge
                    bg={trip.status === "approved" ? "success" : "warning"}
                  >
                    {trip.status}
                  </Badge>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};
