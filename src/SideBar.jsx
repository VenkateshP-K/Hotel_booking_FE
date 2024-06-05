import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import userServices from './services/userServices'
import { useLoaderData } from 'react-router-dom'

export async function loader() {
  //get the current logged in user
  const user = await userServices.getCurrentUser();

  //return the user data
  return { user };
}
function SideBar() {
  const { user } = useLoaderData();
    const[active, setActive] = useState("Dashboard")
    //if the user role is user show this items
    const items = user.data.user.role === "user" ? ["Hotels", "Rooms","UpdateProfile"] : ["createHotel", "createRoom","ManageHotel","ManageRooms"]
  return (
    <div className="offcanvas offcanvas-start show text-bg-dark" style={{width:"200px"}} id='sidebar'>
       <div className="offcanvas-header">
    <h5 className="offcanvas-title" id="offcanvasDarkLabel">Hi {user.data.user.username}</h5>
    </div>
    {
        items.map((item, index) => (
            <Link key={index} to={`/dashboard/${item.toLowerCase()}`} className={`list-group-item list-group-item-action ${active === item ? "active" : ""}`}
                onClick={() => setActive(item)}
            >
                {item}
            </Link>
        ))
}
</div>
  )
}

export default SideBar