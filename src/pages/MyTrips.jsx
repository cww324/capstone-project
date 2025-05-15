import { useEffect, useState } from 'react';
import {
  getAllTrips,
  getAllParticipants,
  updateParticipantApproval,
} from '../services/dataAccess';
import { useUser } from '../hooks/useUser';
import { useNavigate } from 'react-router-dom';

export const MyTrips = () => {
  const { currentUser } = useUser();
  const [createdTrips, setCreatedTrips] = useState([]);
  const [appliedTrips, setAppliedTrips] = useState([]);
  const [allParticipants, setAllParticipants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser?.id) return;

    const loadData = async () => {
      try {
        const [trips, participants] = await Promise.all([
          getAllTrips(),
          getAllParticipants(),
        ]);

        setAllParticipants(participants);

        const tripsICreated = trips.filter(
          (trip) => trip.userId === currentUser.id
        );
        setCreatedTrips(tripsICreated);

        const myParticipantEntries = participants.filter(
          (p) => p.userId === currentUser.id
        );
        const myAppliedTripIds = myParticipantEntries.map((p) => p.tripId);
        const myAppliedTrips = trips.filter((trip) =>
          myAppliedTripIds.includes(trip.id)
        );

        const appliedWithStatus = myAppliedTrips.map((trip) => {
          const myEntry = myParticipantEntries.find(
            (p) => p.tripId === trip.id
          );
          return {
            ...trip,
            status: myEntry?.approved ? 'approved' : 'pending',
          };
        });

        setAppliedTrips(appliedWithStatus);
      } catch (error) {
        console.error('🔥 Error loading MyTrips:', error);
      }
    };

    loadData();
  }, []);

  const handleApproval = (participantId, approved) => {
    updateParticipantApproval(participantId, approved).then(() => {
      getAllParticipants().then(setAllParticipants);
    });
  };

  const handleEditTrip = (tripId) => {
    navigate(`/edit-trip/${tripId}`);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Trips You Created</h2>
      {createdTrips.length === 0 ? (
        <p>No trips created yet.</p>
      ) : (
        <div className="row">
          {createdTrips.map((trip) => {
            const pendingParticipants = allParticipants.filter(
              (p) => p.tripId === trip.id && p.approved === false
            );

            return (
              <div className="col-md-6 mb-4" key={trip.id}>
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{trip.name}</h5>
                    <p className="card-text">{trip.description}</p>
                    <p className="text-muted">
                      Organizer:{' '}
                      <strong>{trip.user?.username || 'Unknown'}</strong>
                    </p>
                    <button
                      className="btn btn-sm btn-primary me-2"
                      onClick={() => handleEditTrip(trip.id)}
                    >
                      Edit Trip
                    </button>

                    {pendingParticipants.length > 0 && (
                      <>
                        <hr />
                        <p className="fw-bold mb-1">Pending Join Requests:</p>
                        <ul className="list-group list-group-flush">
                          {pendingParticipants.map((p) => (
                            <li
                              key={p.id}
                              className="list-group-item d-flex justify-content-between align-items-center"
                            >
                              User ID: {p.userId}
                              <div>
                                <button
                                  className="btn btn-sm btn-success me-2"
                                  onClick={() => handleApproval(p.id, true)}
                                >
                                  Approve
                                </button>
                                <button
                                  className="btn btn-sm btn-danger"
                                  onClick={() => handleApproval(p.id, false)}
                                >
                                  Reject
                                </button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <h2 className="mt-5 mb-4">Trips You Applied To</h2>
      {appliedTrips.length === 0 ? (
        <p>No applications submitted.</p>
      ) : (
        <div className="row">
          {appliedTrips.map((trip) => (
            <div className="col-md-6 mb-4" key={trip.id}>
              <div className="card border-light shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{trip.name}</h5>
                  <p className="card-text">{trip.description}</p>
                  <p className="text-muted">
                    Organizer:{' '}
                    <strong>{trip.user?.username || 'Unknown'}</strong>
                  </p>
                  <span
                    className={`badge ${
                      trip.status === 'approved'
                        ? 'bg-success'
                        : 'bg-warning text-dark'
                    }`}
                  >
                    {trip.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
