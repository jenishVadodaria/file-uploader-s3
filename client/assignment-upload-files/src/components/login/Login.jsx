import React from 'react'

const Login = () => {
    const handleGoogleLogin = async () => {
        window.open('http://localhost:9000/auth/google', "_self")
    }

    return (
        <div className="container login-container">
            <div className="card">
                <div className="card-content">
                    <h3><i className="fa-solid fa-file-arrow-up"></i> File Uploader</h3>
                    <div className="section">
                        <p className="lead" style={{
                            margin: '10px 0px'
                        }}>Upload Files of any type after Login with Google</p>
                    </div>
                    <div className="divider"></div>
                    <div className="section">
                        <button onClick={handleGoogleLogin} className="btn red darken-1">
                            <i className="fab fa-google left"></i>
                            Log In With Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login