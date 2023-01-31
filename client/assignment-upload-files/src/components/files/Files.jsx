import axios from 'axios'
import React, { useState, useEffect } from 'react'
import "./files.css"

const Files = ({ googleId, loading }) => {
    const [fileData, setFileData] = useState()


    const getFiles = async () => {
        try {
            const files = await axios.get("http://localhost:9000/upload", { headers: { "Authorization": `${googleId}` } })
            setFileData(files.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (loading === false) {
            getFiles()
        }
    }, [loading])

    const downloadFile = async ({ signedUrl, filename }) => {
        try {
            const response = await axios({
                url: signedUrl,
                method: 'GET',
                responseType: 'blob'
            });
            const blob = new Blob([response.data]);
            const blobUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='file-container'>
            {
                fileData &&
                fileData.map((file, index) => {
                    return (
                        <div className='file' key={index}>
                            <p>{file.fileName}</p>
                            <button className='btn-download' onClick={() => downloadFile({ signedUrl: file.fileUrl, filename: file.fileName })}>
                                <i className="fa-solid fa-download"></i>
                            </button>
                        </div>
                    )
                })

            }
        </div>
    )
}

export default Files