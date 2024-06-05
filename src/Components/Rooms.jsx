import React from 'react'
import roomServices from '../services/roomServices'
import { useLoaderData } from 'react-router-dom'
import { useState, useEffect } from 'react'


export const loader = async () => {
    const rooms = await roomServices.getRooms();
    return { rooms };
}

function Rooms() {

    const { rooms: initialRooms } = useLoaderData();
    const [rooms, setRooms] = useState(initialRooms);

    useEffect(() => {
        setRooms(initialRooms);
    }, [initialRooms]);

    const handleBook = async (roomId) => {
        try {
            await roomServices.bookRoom(roomId);
            alert("Room booked successfully");
            setRooms(rooms.map(room => room._id === roomId ? { ...room, status: 'booked' } : room));
        } catch (error) {
            console.error("Failed to book room:", error);
        }
    }

    const handleUnbook = async (roomId) => {
        try {
            await roomServices.unbookRoom(roomId);
            alert("Room unbooked successfully");
            setRooms(rooms.map(room => room._id === roomId ? { ...room, status: 'available' } : room));
        } catch (error) {
            console.error("Failed to unbook room:", error);
        }
    }
    return (
        <div>
            <div className='container' padding='10px'>
                <div className='row' align='center'>
                    <div className='col-md-12'>
                        <h1 align='center'>Rooms</h1></div>
                    {rooms.map((room) => {
                        return <div key={room._id}
                         className="card" style={{ width: '18rem' }} id='Roomspage'>
                                <img src="https://picsum.photos/200/200" className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Room No : {room.name}</h5>
                                    <p className="card-text">Capacity : {room.capacity}</p>
                                    <p className="card-text">Amenities : {room.amentities}</p>
                                    <p className="card-text">Description : {room.description}</p>
                                    <p className="card-text">Status : {room.status}</p>
                                    {room.status === 'available' ? (
                                        <button className="btn btn-primary" onClick={() => handleBook(room._id)}>Book</button>
                                    ) : (
                                        <button className="btn btn-secondary" onClick={() => handleUnbook(room._id)}>Unbook</button>
                                    )}
                                </div>
                            </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default Rooms