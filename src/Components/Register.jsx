import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import userServices from '../services/userServices'

function Register() {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if(!username || !email || !password || !location) {
      alert("All fields are required");
      return;
    }
    if(password.length < 6){
      alert("Password must be at least 6 characters long.");  
      return;
    }
    
    // perform user registration
    userServices.register(username, email, password, location)
      .then(response => {
        alert(response.data.message);

        // clear the form
        setUserName("");
        setEmail("");
        setPassword("");
        setLocation("");

        // redirect to login page
        setTimeout(() => {
          navigate("/login");
        }, 500);
      })
      .catch(error => {
        alert(error.response.data.message);
      });
  }

  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className='card'>
              <div className='card-header'>
                <h2>Register</h2>
              </div>
              <div className='card-body'>
                <form onSubmit={handleRegister}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" value={username} onChange={(e) => setUserName(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="location" className="form-label">Location</label>
                    <input type="text" className="form-control" id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
                  </div>
                  <button type="submit" className="btn btn-primary">Submit</button>
                  <p>Already have an account? <Link to="/Login">Login</Link></p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register