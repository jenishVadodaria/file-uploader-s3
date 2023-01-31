import React, { useState, useEffect } from 'react'
import Login from '../login/Login'
import { Route, Routes, Navigate } from 'react-router-dom'
import Upload from '../upload/Upload'
import Logout from '../logout/Logout'
import axios from 'axios'
import Navbar from '../navbar/Navbar'

const Layout = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axios.get("http://localhost:9000/auth/login/success", { withCredentials: true })

                if (response.status === 200) {
                    setUser(response.data)
                }
                else {
                    throw new Error("Authentication has been failed!")
                }
            } catch (error) {
                console.error(error)
            }
        }
        getUser();
    }, []);

    return (
        <div>
            {
                user && <Navbar user={user} />
            }
            <Routes>
                <Route
                    path='upload'
                    element={user?.isAuthenticated ? <Upload googleId={user?.user?.googleId} /> : <Navigate to="/login" replace={true} />}
                />
                <Route
                    path='/'
                    element={user?.isAuthenticated ? <Navigate to="/upload" replace={true} /> : <Login />}
                />
                <Route
                    path="login"
                    element={user?.isAuthenticated ? <Navigate to="/upload" replace={true} /> : <Login />}
                />
                <Route path="/logout"
                    element={<Logout />}
                />
            </Routes>
        </div>
    )
}

export default Layout