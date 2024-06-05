import React, { useState } from 'react';
import hotelServices from '../services/hotelServices';
import roomServices from '../services/roomServices';
import { useLoaderData } from 'react-router-dom';

export const loader = async () => {
  const hotels = await hotelServices.getAllHotels();
  return { hotels };
};

function Hotels() {
  const { hotels } = useLoaderData();
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [error, setError] = useState(null);

  const handleSelectHotel = (hotelId) => {
    const hotel = hotels.find(h => h._id === hotelId);
    setSelectedHotel(hotel);
  };

  const handleBookRoom = async (roomId) => {
    try {
      await roomServices.bookRoom(roomId);
      setSelectedHotel((prevHotel) => {
        const updatedRooms = prevHotel.rooms.map(room =>
          room._id === roomId ? { ...room, isBooked: true } : room
        );
        return { ...prevHotel, rooms: updatedRooms };
      });
    } catch (error) {
      console.error('Error booking room:', error);
      setError(error.message);
    }
  };

  return (
    <div className='container' style={{ padding: '10px' }}>
      <div className='row' align='center'>
        <div className='col-md-12'>
          <h1 align='center'>Hotels</h1>
        </div>

        {hotels.map((hotel) => (
          <div key={hotel._id} className="card" style={{ width: '18rem', margin: '10px' }}>
            <img src="https://picsum.photos/200/200" className="card-img-top" alt="Hotel" />
            <div className="card-body">
              <h5 className="card-title">Name: {hotel.name}</h5>
              <p className="card-text">Description: {hotel.description}</p>
              <p className="card-text">Address: {hotel.address}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 

export default Hotels;