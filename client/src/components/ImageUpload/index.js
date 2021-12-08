import React, { useState } from 'react';
import axios from 'axios';
import { Grid, IconButton, } from '@mui/material';
import CustomInput from './CustomInput';
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';

export default function ImageUpload( { quizId='618f4696f23e2502ccc985b3' }) {
    const [fileData, setFileData] = useState();
    const [images, setFile] = useState("");
    const [fileName, setFileName] = useState();

    const handleFileChange = ({ target }) => {
        setFileData(target.files[0]);
        setFile(target.value);
        setFileName(target.files[0].name);
        console.log(target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formdata = new FormData();
    
        formdata.append("image", fileData);
        formdata.append("quiz_id", quizId);
        formdata.append("file_name", fileName);
        // formdata.append("kind", kind);
        // formData.append('upload_preset', preset);
        console.log("fileData", fileData);
    
        await axios.post(
            process.env.NODE_ENV == 'production'
              ? `/api/image`
              : `http://localhost:4000/api/image`, formdata)
        .then((res) => console.log("res", res.data))
        .catch((error) => console.error(error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <CustomInput
                type="file"
                value={images}
                name="file"
                accept="image/*"
                onChange={handleFileChange}
                placeholder="upload image"
                isRequired={true}
            />
            <button>submit</button>
        </form>
    );
}