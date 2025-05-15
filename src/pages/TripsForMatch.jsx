// src/pages/TripsForMatch.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  getAllTrips,
  getAllLodgings,
  getAllMatches,
} from '../services/dataAccess';

export const TripsForMatch = () => {
  const { matchId } = useParams();
  const navigate = useNavigate();

  const [trips, setTrips] = useState([]);
  const [lodgings, setLodgings] = useState([]);
  const [match, setMatch] = useState(null);

  useEffect(() => {
    getAllTrips().then((allTrips) => {
      const filtered = allTrips.filter(
        (trip) => trip.matchId === parseInt(matchId)
      );
      setTrips(filtered);
    });

    getAllLodgings().then(setLodgings);

    getAllMatches().then((matches) => {
      const selected = matches.find((m) => m.id === parseInt(matchId));
      setMatch(selected || null);
    });
  }, [matchId]);

  const getLodgingName = (lodgingId) => {
    const lodging = lodgings.find((l) => l.id === lodgingId);
    return lodging ? `${lodging.name} – ${lodging.city}` : 'Loading...';
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">
          Trips Available for Match:{' '}
          {match ? (
            <>
              <span className="text-blue-700 font-semibold">
                {match.team1} vs {match.team2}
              </span>{' '}
              <span className="text-gray-500">
                ({match.city} @ {match.stadium})
              </span>
            </>
          ) : (
            `#${matchId}`
          )}
        </h2>

        <button
          onClick={() => navigate(`/matches/${matchId}/create`)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create New Trip
        </button>
      </div>

      {trips.length === 0 ? (
        <p>No trips found for this match. Be the first to create one!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {trips.map((trip) => (
            <div
              key={trip.id}
              className="border p-4 rounded shadow bg-white hover:shadow-lg transition"
            >
              <h3 className="font-bold text-lg">{trip.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{trip.description}</p>
              <p className="text-sm italic">
                Lodging: {getLodgingName(trip.lodgingId)}
              </p>
              {/* Optional: Add a button to view this trip in detail */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
