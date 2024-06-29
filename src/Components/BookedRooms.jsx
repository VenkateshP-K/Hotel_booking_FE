import React, { useEffect, useState } from 'react';
import userServices from '../services/userServices';

function BookedRooms() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [paidBookings, setPaidBookings] = useState({});

  useEffect(() => {
    const fetchBookedRooms = async () => {
      try {
        const response = await userServices.bookedRooms();
        setBookings(response.data.bookings || []);
      } catch (error) {
        setError('Failed to fetch booked rooms');
      }
    };

    fetchBookedRooms();
  }, []);

  const handlePaymentToggle = (bookingId, price) => {
    if (paidBookings[bookingId]) {
      // Payment is being cancelled
      setPaidBookings((prev) => {
        const updated = { ...prev };
        delete updated[bookingId];
        return updated;
      });
    } else {
      // Payment is being processed
      alert(`Room Amount: $${price} Paid Successfully`);
      setPaidBookings((prev) => ({
        ...prev,
        [bookingId]: true,
      }));
    }
  };

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
                <p className="card-text">Price: {booking.price}</p>
                <p className="card-text">Date: {booking.date}</p>
                <p className="card-text">Time: {booking.time}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => handlePaymentToggle(booking._id, booking.price)}
                >
                  {paidBookings[booking._id] ? 'Cancel Payment' : 'Proceed to Pay'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookedRooms;