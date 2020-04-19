import React from 'react';
import FileUpload from './FileUpload';


const App = () => {

    const onUploadFiles = (files) => {
        console.log(files)
    }

    return (
        <div>
            <FileUpload 
                multiple={true} 
                accept={null}
                onSubmit={onUploadFiles}
            />
        </div>
    )
}

export default App
