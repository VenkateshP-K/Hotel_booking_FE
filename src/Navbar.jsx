import React from 'react'
import { Link } from 'react-router-dom'
import './Components/Home'
import './Components/Register'
import './Components/Login'
import Home from './Components/Home'

function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Hello !</a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Register">Register</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Login">Login</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Home />
    </>
  )
}

export default Navbar