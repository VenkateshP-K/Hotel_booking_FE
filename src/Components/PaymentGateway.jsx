import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import userServices from '../services/userServices';

function PaymentGateway() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await userServices.getBookingDetails(bookingId);
        setBooking(response.data);
      } catch (error) {
        console.error('Error fetching booking details:', error);
        setError('Failed to fetch booking details');
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  const handlePayment = async () => {
    try {
      await userServices.processPayment(bookingId);
      alert('Payment successful!');
      navigate('/dashboard/bookedrooms');
    } catch (error) {
      console.error('Error processing payment:', error);
      setError('Payment failed. Please try again.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!booking) return <div>No booking found.</div>;

  return (
    <div className="container mt-5">
      <h2>Payment Gateway</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Booking Details</h5>
          <p className="card-text">Hotel: {booking.hotelId?.name}</p>
          <p className="card-text">Room: {booking.name}</p>
          <p className="card-text">Price: ${booking.price}</p>
          <p className="card-text">Date: {booking.date}</p>
          <p className="card-text">Time: {booking.time}</p>
          
          <h5 className="mt-4">Payment Information</h5>
          {/* Add payment form fields here */}
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number</label>
            <input type="text" className="form-control" id="cardNumber" placeholder="Card Number" />
          </div>
          <div className="form-group">
            <label htmlFor="expiryDate">Expiry Date</label>
            <input type="text" className="form-control" id="expiryDate" placeholder="MM/YY" />
          </div>
          <div className="form-group">
            <label htmlFor="cvv">CVV</label>
            <input type="text" className="form-control" id="cvv" placeholder="CVV" />
          </div>
          
          <button className="btn btn-primary mt-3" onClick={handlePayment}>
            Confirm Payment
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentGateway;