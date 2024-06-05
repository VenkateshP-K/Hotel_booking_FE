import React, { useState } from 'react';
import hotelServices from '../services/hotelServices';
import { useLoaderData } from 'react-router-dom';

export const loader = async () => {
  const hotels = await hotelServices.getAllHotels();
  return { hotels };
};

function ManageHotel() {
  const { hotels } = useLoaderData();
  const [error, setError] = useState(null);
  const [hotelList, setHotelList] = useState(hotels);

  const handleEditHotel = async (hotelId) => {
    const newName = prompt('Enter new Name');
    const newDescription = prompt('Enter new description:');
    const newAddress = prompt('Enter new address');

    if (!newName || !newDescription || !newAddress) {
      return;
    }

    try {
      const updatedHotel = await hotelServices.updateHotel(hotelId, { name: newName, description: newDescription, address: newAddress });
      console.log('Hotel updated:', updatedHotel);

      setHotelList((prevHotels) => prevHotels.map((hotel) => (hotel._id === hotelId ? updatedHotel : hotel)));
    } catch (error) {
      console.error('Error updating hotel:', error);
      setError(error.message);
    }
  };

  const handleDeleteHotel = async (hotelId) => {
    if (!window.confirm('Are you sure you want to delete this hotel?')) return;

    try {
      await hotelServices.deleteHotel(hotelId);
      console.log('Hotel deleted:', hotelId);

      setHotelList((prevHotels) => prevHotels.filter((hotel) => hotel._id !== hotelId));
    } catch (error) {
      console.error('Error deleting hotel:', error);
      setError(error.message);
    }
  };

  return (
    <div className='container' style={{ padding: '10px' }}>
      <div className='row' style={{ textAlign: 'center' }}>
        <div className='col-md-12'>
          <h1>Manage Hotels</h1>
        </div>
        {hotelList.length > 0 ? (
          hotelList.map((hotel) => (
            <div key={hotel._id} className="card" style={{ width: '18rem', margin: '10px' }}>
              <img src="https://picsum.photos/200/200" className="card-img-top" alt="Hotel" />
              <div className="card-body">
                <h5 className="card-title">Name: {hotel.name}</h5>
                <p className="card-text">Description: {hotel.description}</p>
                <p className="card-text">Address: {hotel.address}</p>
                <button className='btn btn-primary' onClick={() => handleEditHotel(hotel._id)}>Edit</button>
                <button className='btn btn-danger' onClick={() => handleDeleteHotel(hotel._id)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No hotels available.</p>
        )}
        {error && <p className="text-danger">{error}</p>}
      </div>
    </div>
  );
}

export default ManageHotel;