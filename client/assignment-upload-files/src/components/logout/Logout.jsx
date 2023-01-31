import React from 'react'

const Logout = () => {

    window.open("http://localhost:9000/auth/logout", "_self")

    return <div>Logging out...</div>;
}

export default Logout