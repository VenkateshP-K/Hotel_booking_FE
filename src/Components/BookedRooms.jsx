import React, { useState, useEffect } from 'react';
import userServices from '../services/userServices';

function BookedRooms() {
    const [bookedRooms, setBookedRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState({});

    useEffect(() => {
        const fetchBookedRooms = async () => {
            try {
                const response = await userServices.getBookedRooms();
                console.log(response); 
                if (response && response.bookings && Array.isArray(response.bookings)) {
                    setBookedRooms(response.bookings);
                    // Initialize payment status for each room
                    const initialPaymentStatus = {};
                    response.bookings.forEach(room => {
                        initialPaymentStatus[room._id] = false; 
                    });
                    setPaymentStatus(initialPaymentStatus);
                }
            } catch (error) {
                console.log(error);
            } 
        };

        fetchBookedRooms();
    }, []);

    const handlePaymentToggle = async (roomId) => {
        try {
            // Check if payment status is true (paid) or false (not paid)
            const currentStatus = paymentStatus[roomId];
            if (currentStatus) {
                const updatedStatus = { ...paymentStatus, [roomId]: false };
                setPaymentStatus(updatedStatus);
                alert("Booking canceled");
            } else {
                const updatedStatus = { ...paymentStatus, [roomId]: true };
                setPaymentStatus(updatedStatus);
                alert("Amount paid successfully");
            }
        } catch (error) {
            console.log(error);
        }
    };
    if (bookedRooms.length === 0) {
        return <div>No booked rooms found.</div>;
    }

    return (
        <div className="container mt-3">
            <h2>Booked Rooms</h2>
            <div className="row">
                {bookedRooms.map(room => (
                    <div key={room._id} className="col-md-4">
                        <div className="card mb-3">
                            <div className="card-header">
                                {room.name} - {room.hotel?.name}
                            </div>
                            <div className="card-body">
                                <p>Description: {room.description}</p>
                                <p>Status: {room.status}</p>
                                <p>Maximum Persons Allowed : {room.capacity}</p>
                                <p>Amenities: {room.amenities.join(", ")}</p>
                                <p>Price: {room.price}</p>
                                <p>Check-in: {new Date(room.checkIn).toLocaleDateString()}</p>
                                <p>Check-out: {new Date(room.checkOut).toLocaleDateString()}</p>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => handlePaymentToggle(room._id)}
                                >
                                    {paymentStatus[room._id] ? "Cancel Payment" : "Proceed to Payment"}
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