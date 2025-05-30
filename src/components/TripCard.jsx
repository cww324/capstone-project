import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';

export const TripCard = ({ trip, currentUser }) => {
  const match = trip.match;
  const lodging = trip.lodging;
  console.log(currentUser);

  return (
    <Card className="h-100 shadow-sm border-0">
      <Card.Body>
        <Card.Title>{trip.groupName}</Card.Title>

        {/* Lodging Thumbnail */}
        {lodging?.imageUrl && (
          <div className="mb-2 d-flex align-items-center">
            <Image
              src={lodging.imageUrl}
              alt={lodging.name}
              width={60}
              height={60}
              rounded
              className="me-2 object-fit-cover"
              style={{ objectFit: 'cover' }}
            />
            <div>
              <small className="text-muted">Lodging:</small>
              <div>{lodging.name}</div>
            </div>
          </div>
        )}

        {/* Match Info */}
        {match && (
          <Card.Text className="mb-2">
            <strong>
              Match {match.matchNumber}: {match.team1} vs {match.team2}
            </strong>
            <br />
            <span className="text-muted">{match.stadium}</span>
            <br />
            <small>{new Date(match.date).toLocaleDateString()}</small>
          </Card.Text>
        )}

        <Card.Text className="mt-2">
          <small className="text-muted">
            Created by{' '}
            {trip.userId === currentUser?.id
              ? 'You'
              : trip.user?.name || 'Unknown'}
          </small>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
