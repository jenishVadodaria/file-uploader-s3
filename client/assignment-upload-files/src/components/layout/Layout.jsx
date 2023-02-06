import React, { useState, useEffect } from 'react'
import Login from '../login/Login'
import { Route, Routes, Navigate, useLocation } from 'react-router-dom'
import Upload from '../upload/Upload'
import Logout from '../logout/Logout'
import axios from 'axios'
import Navbar from '../navbar/Navbar'

const Layout = () => {
    const [user, setUser] = useState(null);
    let location = useLocation();

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

        if (location.pathname === "/upload") {
            getUser();
        }
    }, []);

    return (
        <div>
            {
                user && <Navbar user={user} />
            }
            <Routes>
                <Route
                    path='upload'
                    element={user?.isAuthenticated ? <Upload token={user?.token} /> : <Navigate to="/login" replace={true} />}
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