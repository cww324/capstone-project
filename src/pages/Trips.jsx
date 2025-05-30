// src/pages/Trips.jsx
import { useEffect, useState } from "react";
import { TripCard } from "../components/TripCard";
import { useUser } from "../hooks/useUser";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Trips = () => {
  const { currentUser } = useUser();
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([
      fetch(
        "http://localhost:8088/trips?_expand=match&_expand=user&_expand=lodging"
      ).then((res) => res.json()),
      fetch("http://localhost:8088/lodgingImages").then((res) => res.json()),
    ]).then(([tripsData, lodgingImages]) => {
      const tripsWithImages = tripsData.map((trip) => {
        const lodgingId = trip.lodging?.id;
        const imagesForLodging = lodgingImages.filter(
          (img) => img.lodgingId === lodgingId
        );
        const firstImageUrl =
          imagesForLodging.length > 0 ? imagesForLodging[0].url : null;

        return {
          ...trip,
          lodging: {
            ...trip.lodging,
            imageUrl: firstImageUrl,
          },
        };
      });

      setTrips(tripsWithImages);
    });
  }, []);

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>All Trips</h2>
        <Button variant="success" onClick={() => navigate("/trips/create")}>
          Create New Trip
        </Button>
      </div>

      {trips.length === 0 ? (
        <p>No trips available yet.</p>
      ) : (
        trips.map((trip) => (
          <TripCard key={trip.id} trip={trip} currentUser={currentUser} />
        ))
      )}
    </Container>
  );
};
