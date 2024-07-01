import React from 'react';
import { useLoaderData } from 'react-router-dom';
import userServices from '../services/userServices';

// Define the loader function
export async function loader() {
    const users = await userServices.getAllUsers();

    return { users };
  }

function Users() {
    const { users } = useLoaderData();

    // Check if users is defined and is an array
    if (!users || !Array.isArray(users)) {
        return <div className="container mt-3" style={{ padding: '10px' }}>Loading...</div>;
    }

    return (
        <div className='container mt-3' style={{ padding: '10px' }}>
            <div className='row'>
                <div className='col-md-12'>
                    <h1 align='center'>Users</h1>
                </div>
                {users.map((user) => (
                    <div key={user._id} className="card" style={{ width: '20rem' }}>
                        <img src="https://picsum.photos/200/200" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Name: {user.username}</h5>
                            <p className="card-text">Role: {user.role}</p>
                            <p className="card-text">Location: {user.location}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Users;