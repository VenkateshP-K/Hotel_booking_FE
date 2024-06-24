import React, { useEffect, useState } from 'react';
import userServices from '../services/userServices';

function BookedRooms() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookedRooms = async () => {
      try {
        const response = await userServices.bookedRooms();
        setBookings(response.data.bookings || []);  // Add a fallback to an empty array
      } catch (error) {
        setError('Failed to fetch booked rooms');
      } finally {
        setLoading(false);
      }
    };

    fetchBookedRooms();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!bookings || bookings.length === 0) {
    return <div>No booked rooms found.</div>;
  }

  return (
    <div className="container mt-3">
      <h2>Booked Rooms</h2>
      <div className="row">
        {bookings.map((booking) => (
          <div key={booking._id} className="col-md-4">
            <div className="card mb-4">
              <div className="card-body">
              <img src="https://picsum.photos/200/200" className="card-img-top" alt="..." />
                <h5 className="card-title">{booking.hotelId?.name}</h5>
                <p className="card-text">Room Number: {booking.name}</p>
                <p className="card-text">Description: {booking.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookedRooms;