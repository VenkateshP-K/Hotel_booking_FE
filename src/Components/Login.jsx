import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userServices from '../services/userServices';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Client-side validation
    if (!email || !password) {
      alert("Email and password required.");
      return;
    }
    if(password.length < 6){
      alert("Password must be at least 6 characters long.");  
      return;
    }
    
    try {
      const response = await userServices.login(email, password);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard');
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (error) {
      setError("Login error: " + error.message);
    }
  };

  return (
    <div className="container mt-3" style={{ width: "70%" }}>
      <div className="row">
        <div className="col-md-3 offset-md-3">
          <div className='card' style={{ width: '18rem', marginTop: '60px' }}>
            <div className='card-header'>
              <h2>Login</h2>
            </div>
            <div className='card-body'>
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                <button type="submit" className="btn btn-primary">Submit</button>
                <p>Don't have an account? <a href="/register">Register</a></p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;