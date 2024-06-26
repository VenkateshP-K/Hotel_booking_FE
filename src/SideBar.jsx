import React from 'react';
import { Link } from 'react-router-dom';

function SideBar({ user }) {
  const isAdmin = user && user.role === 'admin';

  return (
    <div className="d-flex" style={{width: '200px'}}>
      <ul className="nav flex-column">
        <li>
          <Link to="/dashboard/hotels" className="nav-link link-dark">Hotels</Link>
        </li>
        <li>
          <Link to="/dashboard/rooms" className="nav-link link-dark">Rooms</Link>
        </li>
        <li>
          <Link to="/dashboard/bookedrooms" className="nav-link link-dark">Booked Rooms</Link>
        </li>
        <li>
          <Link to="/dashboard/update" className="nav-link link-dark">Update Profile</Link>
        </li>
        {isAdmin && (
          <>
            <li>
              <Link to="/dashboard/createHotel" className="nav-link link-dark">Create Hotel</Link>
            </li>
            <li>
              <Link to="/dashboard/createRoom" className="nav-link link-dark">Create Room</Link>
            </li>
            <li>
              <Link to="/dashboard/manageHotel" className="nav-link link-dark">Manage Hotel</Link>
            </li>
            <li>
              <Link to="/dashboard/manageRooms" className="nav-link link-dark">Manage Rooms</Link>
            </li>
            <li>
              <Link to="/dashboard/users" className="nav-link link-dark">Users</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default SideBar;