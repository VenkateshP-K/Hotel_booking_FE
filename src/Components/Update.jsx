import React from 'react'
import { useState, useEffect } from 'react';
import userServices from '../services/userServices';
import { useLoaderData } from 'react-router-dom';

export const loader = async() => {
  const users = await userServices.getCurrentuser();
  return { users};
}
function Update() {
  const userId = useLoaderData();
  const [profile, setProfile] = useState({ username: '', email: '', location: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    userServices.getCurrentUser()
      .then(response => setProfile(response.data))
      .catch(error => setError('Failed to fetch user data'));
  },[]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    const userId = useLoaderData();
    e.preventDefault();
    setLoading(true);
    userServices
      .updateUser(userId, profile)
      .then(() => {
        setLoading(false);
        setSuccess('Profile updated successfully');
      })
      .catch((error) => {
        setLoading(false);
        setError('Failed to update profile');
      });
  };
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className='card'>
            <div className='card-header'>
              <h2>Update Profile</h2>
            </div>
            <div className='card-body'>
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
                <button type="submit" className="btn btn-primary">
                  {loading ? 'Updating...' : 'Submit'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Update