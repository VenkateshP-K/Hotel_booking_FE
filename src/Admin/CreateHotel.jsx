import React, { useState } from 'react';
import adminServices from '../services/adminServices';

function CreateHotel() {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");

    const handleRegister = (e) => {
        e.preventDefault();

        // Prepare the hotel data
        const hotelData = { name, address, description };

        // Perform create hotel
        adminServices.createHotel(hotelData)
            .then((response) => {
                console.log(response.data);
                alert(response.data.message);

                // Clear the form
                setName("");
                setAddress("");
                setDescription("");
            })
            .catch((error) => {
                console.log(error.response ? error.response.data : error.message);
            });
    }

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className='card'>
                        <div className='card-header'>
                            <h2>Hotel Form</h2>
                        </div>
                        <div className='card-body'>
                            <form onSubmit={handleRegister}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="address" className="form-label">Address</label>
                                    <input type="text" className="form-control" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
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


export default CreateHotel ;