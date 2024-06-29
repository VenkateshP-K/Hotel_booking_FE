import React, { useState } from 'react';
import roomServices from '../services/roomServices';

function CreateRoom() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [capacity, setCapacity] = useState(0);
    const [status, setStatus] = useState("available");
    const [amenities, setAmenities] = useState("");
    const [date, setDate] = useState("");
    const [hotelId, setHotelId] = useState("");
    const [price, setPrice] = useState(0);

    const handleRegister = async (e) => {
        e.preventDefault();

        // Prepare the room data
        const roomData = {
            name,
            description,
            capacity,
            status,
            amenities: amenities.split(",").map(amenity => amenity.trim()),
            price,
            date,
            hotelId
        };

        console.log('Room Data to be sent:', roomData);

        try {
            // Perform create room
            const response = await roomServices.createRoom(roomData);
            console.log('Room creation response:', response);
            alert('Room created successfully!');

            // Clear the form
            setName("");
            setDescription("");
            setCapacity(0);
            setStatus("available");
            setAmenities("");
            setPrice(0);
            setDate("");
            setHotelId("");
        } catch (error) {
            console.error('Room creation error:', error.response ? error.response.data : error.message);
        }
    }

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className='card'>
                        <div className='card-header'>
                            <h2>Create Room</h2>
                        </div>
                        <div className='card-body'>
                            <form onSubmit={handleRegister}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="capacity" className="form-label">Capacity</label>
                                    <input type="number" className="form-control" id="capacity" value={capacity} onChange={(e) => setCapacity(parseInt(e.target.value))} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="status" className="form-label">Status</label>
                                    <select className="form-control" id="status" value={status} onChange={(e) => setStatus(e.target.value)} required>
                                        <option value="available">Available</option>
                                        <option value="booked">Booked</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="amenities" className="form-label">Amenities (comma-separated)</label>
                                    <input type="text" className="form-control" id="amenities" value={amenities} onChange={(e) => setAmenities(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="price" className="form-label">Price</label>
                                    <input type="number" className="form-control" id="price" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="date" className="form-label">Date</label>
                                    <input type="date" className="form-control" id="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="hotelId" className="form-label">Hotel ID</label>
                                    <input type="text" className="form-control" id="hotelId" value={hotelId} onChange={(e) => setHotelId(e.target.value)} required />
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateRoom;