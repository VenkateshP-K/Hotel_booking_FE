import React, { useState, useEffect } from 'react';
import hotelServices from '../services/hotelServices';
import { useLoaderData, useParams } from 'react-router-dom';

export const loader = async () => {
  const hotels = await hotelServices.getAllHotels();
  return { hotels };
};

function Hotels() {
  const { hotels: initialHotels } = useLoaderData();
  const { hotelId } = useParams();
  const [hotel, setHotel] = useState(null);
  const [hotels, setHotels] = useState(initialHotels);

  useEffect(() => {
    if (hotelId) {
      const fetchHotel = async () => {
        try {
          const fetchedHotel = await hotelServices.getHotel(hotelId);
          setHotel(fetchedHotel.hotel);
        } catch (error) {
          console.error("Failed to fetch hotel:", error);
        }
      };

      fetchHotel();
    }
  }, [hotelId]);

  return (
    <div className='container mt-3' style={{ padding: '10px' }}>
      <div className='row' align='center'>
        <div className='col-md-12'>
          <h1 align='center'>Hotels</h1>
        </div>
        {hotelId && hotel ? (
          <div key={hotel._id} className="card" style={{ width: '18rem', margin: '10px' }}>
            <img src="https://picsum.photos/200/200" className="card-img-top" alt="Hotel" />
            <div className="card-body">
              <h5 className="card-title">Name: {hotel.name}</h5>
              <p className="card-text">Description: {hotel.description}</p>
              <p className="card-text">Address: {hotel.address}</p>
              <h2>Rooms</h2>
              <ul>
                {hotel.rooms.map(room => (
                  <li key={room._id}>{room.name}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          hotels.map((hotel) => (
            <div key={hotel._id} className="card" style={{ width: '18rem', margin: '10px' }}>
              <img src="https://picsum.photos/200/200" className="card-img-top" alt="Hotel" />
              <div className="card-body">
                <h5 className="card-title">Name: {hotel.name}</h5>
                <p className="card-text">Description: {hotel.description}</p>
                <p className="card-text">Address: {hotel.address}</p>
                <h2>Rooms</h2>
                <ul>
                  {hotel.rooms.map(room => (
                    <li key={room._id}> Room No : {room.name} Capacity : {room.capacity}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Hotels;