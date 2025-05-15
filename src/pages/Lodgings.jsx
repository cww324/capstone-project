// src/pages/Lodgings.jsx
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { getAllLodgings } from '../services/dataAccess.js';
import { useEffect, useState } from 'react';
import { LodgingCard } from '../components/LodgingCard.jsx';

export const Lodgings = () => {
  const [lodgings, setLodgings] = useState([]);

  useEffect(() => {
    getAllLodgings().then((lodgings) => {
      setLodgings(lodgings);
    });
  }, []);
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Lodging Options</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {lodgings.map((lodging) => (
          <LodgingCard key={lodging.id} lodging={lodging} />
        ))}
      </div>
    </div>
  );
};
//   return (
//     <Container className="mt-4">
//       {lodgings.map((lodging) => (
//         <Card
//           key={lodging.id}
//           className="mb-4"
//           style={{ maxWidth: '500px', margin: 'auto' }}
//         >
//           <Card.Header>{lodging.name}</Card.Header>
//           <Card.Body>
//             <Card.Title>{lodging.location}</Card.Title>
//             <Card.Text>${lodging.price_per_night} per night</Card.Text>
//             <Button variant="primary">Book Now</Button>
//           </Card.Body>
//           <Card.Footer>Available: {lodging.availableDates}</Card.Footer>
//         </Card>
//       ))}
//     </Container>
//   );
// };
