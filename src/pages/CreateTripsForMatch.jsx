// This page is probably old and outdated and NOT USED
// THIS PAGE IS NOT USED ANYMORE
// WOOHOOO


import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getAllMatches,
  getAllLodgings,
  addNewTrip,
} from '../services/dataAccess';

export const CreateTripForMatch = () => {
  const { matchId } = useParams();
  const user = JSON.parse(localStorage.getItem('user')) || {};

  const navigate = useNavigate();

  const [match, setMatch] = useState(null);
  const [lodgings, setLodgings] = useState([]);
  const [tripData, setTripData] = useState({
    name: '',
    description: '',
    lodgingId: '',
  });

  useEffect(() => {
    getAllMatches().then((matches) => {
      const found = matches.find((m) => m.id === parseInt(matchId));
      setMatch(found);
    });
    getAllLodgings().then(setLodgings);
  }, [matchId]);

  const handleChange = (e) => {
    setTripData({ ...tripData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTrip = {
      name: tripData.name,
      description: tripData.description,
      matchId: parseInt(matchId),
      lodgingId: parseInt(tripData.lodgingId),
      userId: user.id,
      createdAt: new Date().toISOString(),
    };

    addNewTrip(newTrip).then(() => navigate('/trips'));
  };

  if (!match) return <p className="p-4">Loading match...</p>;

  const filteredLodgings = lodgings.filter(
    (l) => l.city.toLowerCase() === match.city.toLowerCase()
  );

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">
        Create Trip for {match.team1} vs {match.team2} ({match.city})
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Trip Name"
          value={tripData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Trip Description"
          value={tripData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows="3"
        />

        <select
          name="lodgingId"
          value={tripData.lodgingId}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Lodging in {match.city}</option>
          {filteredLodgings.map((lodging) => (
            <option key={lodging.id} value={lodging.id}>
              {lodging.name} – {lodging.city}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Create Trip
        </button>
      </form>
    </div>
  );
};
