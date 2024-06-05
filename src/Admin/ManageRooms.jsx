import React, { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import roomServices from '../services/roomServices';

export const loader = async () => {
    const rooms = await roomServices.getRooms();
    return { rooms };
};

function ManageRooms() {
    const { rooms } = useLoaderData();
    const [error, setError] = useState(null);
    const [roomList, setRoomList] = useState([]);

    useEffect(() => {
        if (rooms) {
            setRoomList(rooms);
        }
    }, [rooms]);

    // Function to update room
    const handleEditRoom = async (roomId) => {
        const newName = prompt("Enter new name");
        const newCapacity = prompt("Enter new capacity");
        const newAmentities = prompt("Enter new amenities");
        const newDescription = prompt("Enter new description");
        const newStatus = prompt("Enter new status");
        const newPrice = prompt("Enter new price");

        if (!newName || !newCapacity || !newAmentities || !newDescription || !newStatus || !newPrice) {
            return;
        }

        try {
            const updatedRoom = await roomServices.updateRoom(roomId, { name: newName, capacity: newCapacity, amentities: newAmentities, description: newDescription, status: newStatus, price: newPrice });
            console.log('Room updated:', updatedRoom);
      
            setRoomList((prevRooms) => prevRooms.map((room) => (room._id === roomId ? updatedRoom : room)));
          } catch (error) {
            console.error('Error updating room:', error);
            setError(error.message);
          }
    }; 

    // Function to delete room
    const handleDeleteRoom = async (roomId) => {
        if (!window.confirm('Are you sure you want to delete this room?')) 
            return;
    
        try {
          await roomServices.deleteRoom(roomId);
          console.log('Room deleted:', roomId);
    
          setRoomList((prevRooms) => prevRooms.filter((room) => room._id !== roomId));
        } catch (error) {
          console.error('Error deleting room:', error);
          setError(error.message);
        }
      };

    return (
        <div>
            <div className='container' style={{ padding: '10px' }}>
                <div className='row' style={{ textAlign: 'center' }}>
                    <div className='col-md-12'>
                        <h1>Rooms</h1>
                    </div>
                    {roomList.length > 0 ? (
                        roomList.map((room) => {
                            if (!room) return null; // Ensure room is not null
                            return (
                                <div key={room._id} className="card" style={{ width: '18rem' }} id='Roomspage'>
                                    <img src="https://picsum.photos/200/200" className="card-img-top" alt="Room" />
                                    <div className="card-body">
                                        <h5 className="card-title">Room No : {room.name}</h5>
                                        <p className="card-text">Capacity : {room.capacity}</p>
                                        <p className="card-text">Amenities : {room.amentities}</p>
                                        <p className="card-text">Description : {room.description}</p>
                                        <p className="card-text">Status : {room.status}</p>
                                        <p className="card-text">Price : {room.price}</p>
                                        <button className="btn btn-primary" onClick={() => handleEditRoom(room._id)}>Edit</button>
                                        <button className="btn btn-danger" onClick={() => handleDeleteRoom(room._id)}>Delete</button>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p>No rooms available.</p>
                    )}
                    {error && <p className="text-danger">{error}</p>}
                </div>
            </div>
        </div>
    );
}

export default ManageRooms;