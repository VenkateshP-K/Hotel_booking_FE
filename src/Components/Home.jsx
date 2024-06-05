import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card">
                        <div className="card-body">
                            <p>Welcome</p>
                            <div className="card">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV_k4_zdB6Mqj7bjmr6pS-VA99GdZdEdI0jlxw8DChqQBrHaS6d5oLxBHqGBpvuAE8D_I&usqp=CAU" className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Hotel Booking App</h5>
                                    <p className="card-text">Hotel booking is the process of securing a room in a hotel for a set duration, tailored to travelers' needs and preferences. Guests can book directly through hotel websites, or via travel agencies and online platforms like Expedia and Booking.com. </p>
                                    <Link to="/Register" className="btn btn-primary">Check In</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home