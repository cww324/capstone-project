import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllMatches, getAllLodgings } from '../services/dataAccess.js';
import { postTrip } from '../services/dataAccess.js';

export const CreateTrip = () => {
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [matchId, setMatchId] = useState('');
  const [lodgingId, setLodgingId] = useState('');
  const [matches, setMatches] = useState([]);
  const [lodgings, setLodgings] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getAllMatches().then(setMatches);
    getAllLodgings().then(setLodgings);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTrip = {
      groupName,
      description,
      matchId: parseInt(matchId),
      lodgingId: parseInt(lodgingId),
    };

    postTrip(newTrip).then(() => navigate('/trips'));
  };

  return (
    <form onSubmit={handleSubmit} className="trip-form">
      <h2>Create a New Group Trip</h2>

      <fieldset>
        <label htmlFor="groupName">Group Name</label>
        <input
          type="text"
          id="groupName"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          required
        />
      </fieldset>

      <fieldset>
        <label htmlFor="match">Match</label>
        <select
          id="match"
          value={matchId}
          onChange={(e) => setMatchId(e.target.value)}
          required
        >
          <option value="">-- Select a Match --</option>
          {matches.map((match) => (
            <option key={match.id} value={match.id}>
              {match.team1} vs {match.team2} ({match.city})
            </option>
          ))}
        </select>
      </fieldset>

      <fieldset>
        <label htmlFor="lodging">Lodging</label>
        <select
          id="lodging"
          value={lodgingId}
          onChange={(e) => setLodgingId(e.target.value)}
          required
        >
          <option value="">-- Select Lodging --</option>
          {lodgings.map((lodging) => (
            <option key={lodging.id} value={lodging.id}>
              {lodging.name} – {lodging.city}
            </option>
          ))}
        </select>
      </fieldset>

      <fieldset>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />
      </fieldset>

      <button type="submit">Create Trip</button>
    </form>
  );
};
