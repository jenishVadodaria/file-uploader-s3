import React, { useState } from 'react';
import axios from "axios"
import Files from '../files/Files';
import "./upload.css"

const Upload = ({ googleId }) => {
    const [file, setFile] = useState()
    const [fileMessage, setFileMessage] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleFileChange = (e) => {
        e.preventDefault()

        setFile(e.target.files[0])
        setFileMessage("")
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)
            const formData = new FormData();
            formData.append("file", file)
            formData.append("googleId", googleId)

            if (file) {
                await axios.post("http://localhost:9000/upload", formData, { headers: { 'Content-Type': 'multipart/form-data' } })
                setFileMessage("File Uploaded Successfully")
                setFile(null)
            }
            else {
                setFileMessage("Select a File")
            }
        }
        catch (error) {
            console.log(error);
            setFileMessage("Please try again")
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className='upload-container'>
                    <label className='custom-label'>
                        Choose File
                        <input className='input-file' onChange={(e) => handleFileChange(e)} placeholder="Browse" type="file"></input>
                    </label >
                    <p>{file?.name}</p>
                    <button className='btn-upload' type="submit">{loading ? 'Uploading...' : 'Upload'}</button>
                    {
                        fileMessage && <p>{fileMessage}</p>
                    }
                </div>
            </form>
            <Files googleId={googleId} loading={loading} />
        </>
    )
}

export default Upload