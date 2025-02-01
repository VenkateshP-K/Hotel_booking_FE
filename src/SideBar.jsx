import React from 'react';
import { Link } from 'react-router-dom';

function SideBar({ user }) {
  const isAdmin = user && user.role === 'admin';

  return (
    <div className="d-flex" style={{width:'150px'}}>
      <ul className="nav flex-column">
        <li>
          <Link to="/dashboard/hotels" className="nav-link link-dark">
          <button className="btn btn-dark" style={{width:'150px'}}>Hotels</button>
          </Link>
        </li>
        <li>
          <Link to="/dashboard/rooms" className="nav-link link-dark">
          <button className="btn btn-dark" style={{width:'150px'}}>Rooms</button>
          </Link>
        </li>
        <li>
          <Link to="/dashboard/bookedrooms" className="nav-link link-dark">
          <button className="btn btn-dark" style={{width:'150px'}}>Booked Rooms
          </button>
          </Link>
        </li>
        <li>
          <Link to="/dashboard/update" className="nav-link link-dark">
          <button className="btn btn-dark" style={{width:'150px'}}>Update Profile</button>
          </Link>
        </li>
        {isAdmin && (
          <>
            <li>
              <Link to="/dashboard/createHotel" className="nav-link link-dark">
               <button className="btn btn-dark" style={{width:'150px'}}>Create Hotel</button>
              </Link>
            </li>
            <li>
              <Link to="/dashboard/createRoom" className="nav-link link-dark">
               <button className="btn btn-dark" style={{width:'150px'}}>Create Room</button>
              </Link>
            </li>
            <li>
              <Link to="/dashboard/manageHotel" className="nav-link link-dark">
                <button className="btn btn-dark" style={{width:'150px'}}>Manage Hotels</button>
              </Link>
            </li>
            <li>
              <Link to="/dashboard/manageRooms" className="nav-link link-dark">
                <button className="btn btn-dark" style={{width:'150px'}}>Manage Rooms</button>
              </Link>
            </li>
            <li>
              <Link to="/dashboard/users" className="nav-link link-dark">
               <button className="btn btn-dark" style={{width:'150px'}}>Manage Users</button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default SideBar;