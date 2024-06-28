import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import Navbar from './Navbar'
import Register from './Components/Register'
import Login from './Components/Login'
import Dashboard from './Dashboard'
import {loader as userLoader} from './Dashboard'
import {loader as roomsLoader} from './Components/Rooms'
import {loader as hotelsLoader} from './Components/Hotels'
import Rooms from './Components/Rooms'
import Hotels from './Components/Hotels'
import Update from './Components/Update'
import CreateHotel from './Admin/CreateHotel'
import CreateRoom from './Admin/CreateRoom'
import ManageHotel from './Admin/ManageHotel'
import ManageRooms from './Admin/ManageRooms'
import BookedRooms from './Components/BookedRooms'
import PaymentGateway from './Components/PaymentGateway'

const router = createBrowserRouter([
  {
    path: "/",
    element : <Navbar/> 
  },
  {
    path: "/register",
    element : <Register/>
  },
  {
    path: "/login",
    element : <Login/>
  },

  {
    path: 'dashboard',
    element: <Dashboard/>,
    loader: userLoader,
    children: [
      {
        path: 'hotels',
        element: <Hotels/>,
        loader: hotelsLoader
      },
      {
        path: 'rooms',
        element: <Rooms/>,
        loader: roomsLoader
      },
      {
        path:'update',
        element: <Update/>,
        loader: userLoader
      },
      {
        path: 'bookedrooms',
        element: <BookedRooms/>,
        loader: userLoader
      },
    ]
  },

  //for admin
  {
    path: 'dashboard',
    element: <Dashboard/>,
    loader: userLoader,
    children : [
      {
        path: 'createHotel',
        element: <CreateHotel/>
      },
      {
        path: 'createRoom',
        element: <CreateRoom/>
      },
      {
        path: 'manageHotel',
        element: <ManageHotel/>,
        loader: hotelsLoader
      },
      {
        path: 'manageRooms',
        element: <ManageRooms/>,
        loader: roomsLoader
      },
    ]
  },
  {
    path: '/paymentGateway/:bookingId',
    element: <PaymentGateway />,
  },
])

function App() {
  return (
        <RouterProvider router = {router}/>
      )
}

export default App