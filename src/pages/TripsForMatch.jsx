import { useParams } from 'react-router-dom';

export const TripsForMatch = () => {
  const { matchId } = useParams();

  return (
    <div>
      <h2>Trips for Match #{matchId}</h2>
      <p>Here’s where you’ll list group trips for this match.</p>
    </div>
  );
};
