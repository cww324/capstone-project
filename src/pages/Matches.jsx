import { useEffect, useState } from 'react';
import { getAllMatches } from '../services/dataAccess.js';
import Card from 'react-bootstrap/Card';
import { Button, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Flag from 'react-world-flags';
import { countryCodes } from '../services/countryCodes.js';
import './Matches.css'; // Assuming you have a CSS file for styling

const formatDate = (dateStr) => {
  const options = { month: 'short', day: 'numeric' };
  return new Date(dateStr).toLocaleDateString('en-US', options); // "Jun 10"
};

export const Matches = () => {
  const [matches, setMatches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllMatches().then((matches) => {
      setMatches(matches);
    });
  }, []);

  return (
    <div className="matches-container">
      {matches.map((match) => (
        <Card className="mb-3" key={match.id}>
          <Card.Body>
            <Row className="align-items-center">
              <Col xs={2}>
                <div className="match-number">Match #{match.matchNumber}</div>
                <div className="match-date">{formatDate(match.date)}</div>
              </Col>

              <Col xs={7} className="text-center">
                <div className="match-details">
                  <div className="match-group">Group {match.group}</div>
                  <div className="match-location">
                    {match.city} – {match.stadium}
                  </div>
                  <div className="match-title-container mt-2">
                    <div className="match-title">
                      <Flag
                        code={countryCodes[match.team1]}
                        style={{ width: '24px', verticalAlign: 'middle' }}
                      />{' '}
                      {match.team1}
                      <span className="mx-2">vs</span>
                      <Flag
                        code={countryCodes[match.team2]}
                        style={{ width: '24px', verticalAlign: 'middle' }}
                      />{' '}
                      {match.team2}
                    </div>
                  </div>
                </div>
              </Col>

              <Col xs={3} className="text-end">
                <Button onClick={() => navigate(`/matches/${match.id}`)}>
                  Find Trips
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};
