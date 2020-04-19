import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MdRemoveCircleOutline } from 'react-icons/md';
import './FileUpload.css';


const FileUpload = ({ multiple, accept, onSubmit }) => {
    const [files, setFiles] = useState([]);
    const [inputRef, setInputRef] = useState(null)

    const onSubmitFiles = (e) => {
        e.preventDefault()
        onSubmit(files)
        setFiles([])
    }

    const onFileChange = (e) => {
        const fileList = e.target.files
        const uploadFiles = Object.keys(fileList)
            .map(id => fileList[id])
            .filter(file => !files.find(item => item.name === file.name))

        setFiles((state) => state.concat(uploadFiles))
    }

    const openFileDialog = (e) => {
        e.preventDefault()
        inputRef.click()
    }

    const removeFile = (name) => {
        setFiles((state) => state.filter(file => file.name !== name))
    }
    
    return (
        <div className='file-upload-container'>
            <div className='file-upload-header'>
                <h2 className='file-upload-title'>
                    File Upload
                </h2>
                <button 
                    className='file-upload-button'
                    onClick={(e) => openFileDialog(e)}>
                    { multiple ? 'Add Files' : 'Add File' }
                </button>
            </div>
                        
            <input 
                ref={setInputRef}
                type='file' 
                value={''} 
                onChange={onFileChange} 
                multiple={multiple}
                accept={accept}
                hidden
            />
            
            <div className='file-upload-list'>
                { files.length === 0 && 
                    <div className='file-upload-list-empty'>
                        Select files to upload
                    </div>
                }
                
                { files.map((file, index) => (
                    <FileUploadItem 
                        key={file.name}
                        name={file.name}
                        size={file.size}
                        onRemove={removeFile}
                    />
                ))}
            </div>

            { files.length > 0 &&
                <div className='file-upload-footer'>
                    <button
                        className='file-upload-button'
                        onClick={onSubmitFiles}>
                        Submit
                    </button>
                </div>
            }
        </div>
    )
}


const FileUploadItem = ({ name, size, onRemove }) => {

    const formatFileSize = (size) => {
        if (size < 1000000) {
            return `${Math.round(size/1000, 0)} KB`
        } else if (size < 1000000000) {
            return `${Math.round(size/1000000, 0)} MB`
        } else {
            return `${Math.round(size/1000000000, 2)} GB`
        }
    }

    return (
        <div className='file-upload-list-item'>
            <div className='file-upload-list-item-details'>
                <span className='file-upload-list-item-filename'>
                    { name }
                </span>
                <span className='file-upload-list-item-size'>
                    { formatFileSize(size) }
                </span>
            </div>
            <button 
                className='file-upload-list-item-delete-button'
                onClick={(e) => onRemove(name)}>
                <MdRemoveCircleOutline size={18}/>
            </button>
        </div>
    )
}

FileUpload.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    multiple: PropTypes.bool,
    accept: PropTypes.string,
}


export default FileUpload;
