// src/pages/TripDetail.jsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  getAllTrips,
  getAllLodgings,
  getAllMatches,
  requestToJoinTrip,
} from '../services/dataAccess.js';

import '../css/TripDetail.css';

export const TripDetail = () => {
  const { tripId } = useParams();
  const user = JSON.parse(localStorage.getItem('user')) || {};

  const [trip, setTrip] = useState(null);
  const [lodging, setLodging] = useState({});
  const [match, setMatch] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllTrips().then((trips) => {
      const foundTrip = trips.find((t) => t.id === parseInt(tripId));
      setTrip(foundTrip || null);
      setLoading(false);
    });
  }, [tripId]);

  useEffect(() => {
    if (trip) {
      getAllLodgings().then((lodgings) => {
        const selected = lodgings.find((l) => l.id === trip.lodgingId);
        if (selected) setLodging(selected);
      });

      getAllMatches().then((matches) => {
        const selected = matches.find((m) => m.id === trip.matchId);
        if (selected) setMatch(selected);
      });
    }
  }, [trip]);

  if (loading) return <p className="p-4">Loading trip...</p>;
  if (!trip) return <p className="p-4 text-red-600">Trip not found.</p>;

  const isOwner = trip.organizerId === user.id;

  return (
    <div className="trip-detail-container">
      <h2>{trip.name}</h2>
      <p>{trip.description}</p>
      <p>
        <strong>Match:</strong> {match.team1} vs {match.team2} ({match.city})
      </p>
      <p>
        <strong>Lodging:</strong> {lodging.name} – {lodging.city}
      </p>

      {isOwner ? (
        <div>
          <button className="edit-button">Edit Trip</button>
          <button className="manage-button">Manage Join Requests</button>
        </div>
      ) : (
        <button
          onClick={() => {
            requestToJoinTrip(trip.id, user.id)
              .then(() => alert('Request sent!'))
              .catch((err) => console.error('Failed to join trip', err));
          }}
          className="join-button"
        >
          Join Trip
        </button>
      )}
    </div>
  );
};
