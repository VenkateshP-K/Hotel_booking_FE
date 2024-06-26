import React from 'react';
import { useLoaderData, Outlet, useNavigate } from 'react-router-dom';
import SideBar from './SideBar';
import userServices from './services/userServices';

export async function loader() {
  try {
    const response = await userServices.getMe();
    return { user: response.data.user };
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw new Response("", { status: 401 });
    }
    throw error;
  }
}

function Dashboard() {
  const { user } = useLoaderData();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await userServices.logout();
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand">Hi {user.username}</a>
          <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div className="row mt-5">
        <div className="col-md-3">
          <SideBar user={user} />
        </div>
        <div className="col-md-9">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Dashboard;