import React from 'react'
import "./navbar.css"
import { Link } from 'react-router-dom'

const Navbar = ({ user }) => {

    return (
        <div className='navbar'>
            <div style={{
                display: 'flex',
                alignItems: 'center'
            }}>
                {/* <img className='user_image' src={user?.user?.image} alt="user" /> */}
                <p className='user-name'>{user?.user?.displayName}</p>
            </div>
            <Link to="/logout">
                <button className='button-logout'>Logout</button>
            </Link>

        </div >
    )
}

export default Navbar