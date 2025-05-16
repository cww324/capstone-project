// src/pages/MyTrips.jsx
import { useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";
import { TripCard } from "../components/TripCard";
import { TripParticipants } from "../components/TripParticipants";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

export const MyTrips = () => {
  const { currentUser } = useUser();
  const [createdTrips, setCreatedTrips] = useState([]);
  const [joinedTrips, setJoinedTrips] = useState([]);

  useEffect(() => {
    // Get all trips created by the current user
    fetch(`http://localhost:8088/trips?_expand=match&_expand=user`)
      .then((res) => res.json())
      .then((trips) => {
        const userCreated = trips.filter(
          (trip) => trip.userId === currentUser.id
        );
        setCreatedTrips(userCreated);
      });

    // Get trips the user joined (via participants)
    fetch(
      `http://localhost:8088/participants?userId=${currentUser.id}&_expand=trip&_expand=trip.match&_expand=trip.user`
    )
      .then((res) => res.json())
      .then((joins) => {
        const trips = joins
          .map((p) => p.trip)
          .filter((trip) => trip.userId !== currentUser.id); // avoid duplicate if you're also creator
        setJoinedTrips(trips);
      });
  }, [currentUser.id]);

  return (
    <Container className="mt-4">
      <h2 className="mb-4">My Trips</h2>

      {/* Trips You Created */}
      {createdTrips.length > 0 && (
        <>
          <h4>Trips You Created</h4>
          {createdTrips.map((trip) => (
            <Card className="mb-4 shadow-sm" key={trip.id}>
              <Card.Body>
                <TripCard trip={trip} currentUser={currentUser} />
                <TripParticipants
                  tripId={trip.id}
                  organizerId={trip.userId}
                  currentUserId={currentUser.id}
                  canEdit={true}
                />
              </Card.Body>
            </Card>
          ))}
        </>
      )}

      {/* Trips You Joined */}
      {joinedTrips.length > 0 && (
        <>
          <h4 className="mt-5">Trips You Joined</h4>
          {joinedTrips.map((trip) => (
            <TripCard key={trip.id} trip={trip} currentUser={currentUser} />
          ))}
        </>
      )}

      {createdTrips.length === 0 && joinedTrips.length === 0 && (
        <p>You haven't joined or created any trips yet.</p>
      )}
    </Container>
  );
};
