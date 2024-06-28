import React, { useState, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import userServices from '../services/userServices';

function Update() {
    const loaderData = useLoaderData();
    const { user, error: loadError } = loaderData || { user: null, error: 'Loader data is unavailable' };

    const [profile, setProfile] = useState({ username: '', email: '', location: '' });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setProfile({
                username: user.username || '',
                email: user.email || '',
                location: user.location || '',
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({
            ...profile,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!user) throw new Error('User data is not available');
    
            const updatedProfile = {
                username: profile.username,
                email: profile.email,
                location: profile.location,
            };
    
            try {
                const response = await userServices.updateMe(user.id, updatedProfile);
                setSuccess('Profile updated successfully');
                setTimeout(() => {
                    navigate('/dashboard');
                }, 2000);
            } catch (error) {
                console.error('Update profile error:', error);
                if (error.response) {
                    if (error.response.status === 404) {
                        setError('User not found');
                    } else if (error.response.status === 500) {
                        setError('Server error. Please try again later.');
                    } else {
                        setError(error.response.data.message || 'Failed to update profile');
                    }
                } else {
                    setError('Network error. Please check your connection.');
                }
            }
        } catch (error) {
            console.error('Update profile error:', error);
            setError(error.message);
        }
    };

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card">
                        <div className="card-header">
                            <h2>Update Profile</h2>
                        </div>
                        <div className="card-body">
                            {error && <div className="alert alert-danger">{error}</div>}
                            {success && <div className="alert alert-success">{success}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        name="username"
                                        value={profile.username}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={profile.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="location" className="form-label">Location</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="location"
                                        name="location"
                                        value={profile.location}
                                        onChange={handleChange}
                                    />
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

export default Update;