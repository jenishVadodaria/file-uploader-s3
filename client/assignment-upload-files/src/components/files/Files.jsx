import axios from 'axios'
import React, { useState, useEffect } from 'react'
import "./files.css"

const Files = ({ token, loading }) => {
    const [fileData, setFileData] = useState()
    const [error, setError] = useState(false)

    const getFiles = async () => {
        try {
            const files = await axios.get("http://localhost:9000/upload", { headers: { "Authorization": `Bearer ${token}` } })
            setFileData(files.data)
            if (files.data.length === 0) {
                setError(true)
            }
            else {
                setError(false)
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (loading === false) {
            getFiles()
        }
    }, [loading])

    function concatSignedUrl(url, fields) {
        let fieldsString = '';
        Object.keys(fields).forEach((key, index) => {
            fieldsString += `${key}=${fields[key]}`;
            if (index !== Object.keys(fields).length - 1) {
                fieldsString += '&';
            }
        });

        const fullUrl = `${url}?${fieldsString}`;
        return fullUrl
    }



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
        <div className='file-container'>{
        }
            {error && <p className='error-files' >No Files in the Bucket!</p>}
            {
                fileData &&
                fileData.map((file, index) => {
                    return (
                        <div className='file' key={index}>
                            <p>{file.fileName}</p>
                            <button className='btn-download' onClick={() =>
                                downloadFile({ signedUrl: concatSignedUrl(file.data.url, file.data.fields), filename: file.fileName })}>
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