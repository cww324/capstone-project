import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { LodgingCard } from '../components/LodgingCard';

export const Lodgings = () => {
  const [lodgings, setLodgings] = useState([]);
  const [lodgingImages, setLodgingImages] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8088/lodgingImages')
      .then((res) => res.json())
      .then((data) => {
        setLodgingImages(data);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:8088/lodgings')
      .then((res) => res.json())
      .then((data) => setLodgings(data));
  }, []);

  return (
    <Container className="mt-4">
      <Row>
        {lodgings.map((lodging) => {
          const thumbnail = lodgingImages.find(
            (img) => img.lodgingId === lodging.id
          );

          return (
            <Col key={lodging.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <LodgingCard
                lodging={lodging}
                thumbnailImageUrl={thumbnail?.url}
              />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};
