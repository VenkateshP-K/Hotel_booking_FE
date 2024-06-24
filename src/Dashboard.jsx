import React from 'react'
import { useLoaderData, useNavigate, Link } from 'react-router-dom'
import './Components/Login'
import Rooms from './Components/Rooms'
import userServices from './services/userServices'
import SideBar from './SideBar'
import { Outlet } from 'react-router-dom'


export async function loader() {
  //get the current logged in user
  const user = await userServices.getMe();

  //return the user data
  return { user };
}
function Dashboard() {

  const { user } = useLoaderData();
  const navigate = useNavigate();

  const handleLogout = () => {
    userServices.logout();
    navigate('/login');
  }

  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand">Hi {user.data.user.username}</a>
          <form className="d-flex" role="search">
            <button className="btn btn-primary" type="submit" onClick={handleLogout}>LogOut</button>
          </form>
        </div>
      </nav>

<div className="row mt-5">
              <div className="col-md-3">
                  <SideBar />
                  </div>
                <div className="col">
                    <Outlet />
                </div>
        </div>  
    </>
  )
}

export default Dashboard