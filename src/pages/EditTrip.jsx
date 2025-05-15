import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAllTrips } from '../services/dataAccess';
import { useUser } from '../hooks/useUser';

export const EditTrip = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useUser();

  const [trip, setTrip] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getAllTrips().then((trips) => {
      const foundTrip = trips.find((t) => t.id === parseInt(tripId));
      if (!foundTrip) {
        setError('Trip not found');
      } else if (foundTrip.userId !== currentUser.id) {
        setError('You are not authorized to edit this trip.');
      } else {
        setTrip(foundTrip);
        setName(foundTrip.name);
        setDescription(foundTrip.description);
      }
    });
  }, [tripId, currentUser]);

  const handleUpdate = () => {
    fetch(`http://localhost:8088/trips/${trip.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description }),
    })
      .then((res) => res.json())
      .then(() => {
        alert('Trip updated successfully!');
        navigate('/my-trips');
      });
  };

  if (error) return <p className="text-red-600">{error}</p>;
  if (!trip) return <p>Loading trip...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Trip</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdate();
        }}
        className="flex flex-col gap-3 max-w-lg"
      >
        <label>
          Trip Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-2 py-1 rounded"
            required
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border px-2 py-1 rounded"
            required
          />
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};
