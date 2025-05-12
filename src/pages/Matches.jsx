import { useEffect, useState } from 'react';
import { getAllMatches } from '../services/dataAccess.js';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

export const Matches = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    getAllMatches().then((matches) => {
      setMatches(matches);
    });
  }, []);

  return (
    <div className="matches-container">
      {matches.map((match) => (
        <Card key={match.id} style={{ width: '18rem', marginBottom: '20px' }}>
          <Card.Body>
            <Card.Title>{match.name}</Card.Title>
            <Card.Text>{match.description}</Card.Text>
          </Card.Body>
          <ListGroup variant="flush">
            <ListGroup.Item>Group: {match.group}</ListGroup.Item>
            <ListGroup.Item>Location: {match.location}</ListGroup.Item>
            <ListGroup.Item>
              Date:{' '}
              {new Date(match.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </ListGroup.Item>
          </ListGroup>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
      ))}
    </div>
  );
};
