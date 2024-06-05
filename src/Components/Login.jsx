import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import userServices from '../services/userServices'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    //perform login
    userServices.login(email, password)
      .then(res => {
        alert(res.data.message);

         //clear the form
         setEmail("")
         setPassword("")

        //redirect to home
        setTimeout(() => navigate("/Dashboard"), 500)

      }).catch(err => alert(err.response.data.message))
  }

  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className='card'>
              <div className='card-header'>
                <h2>Login</h2>
              </div>
              <div className='card-body'>
                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <div id="email" className="form-text">We'll never share your email with anyone else.</div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  <button type="submit" className="btn btn-primary">Submit</button>
                  <p>Don't have an account? <Link to="/register">Register</Link></p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div></>
  )
}


export default Login