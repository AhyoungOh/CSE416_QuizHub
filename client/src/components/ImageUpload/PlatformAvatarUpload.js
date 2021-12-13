import React, { useState } from 'react';
import axios from 'axios';
import { Grid, IconButton, Button } from '@mui/material';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';

export default function PlatformAvatarUpload( { platformId }) {
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
        formdata.append("platform_id", platformId);
        formdata.append("file_name", fileName);
        console.log("fileData", fileData);
    
        await axios.post(
            process.env.NODE_ENV == 'production'
              ? `/api/image/platform`
              : `http://localhost:4000/api/image/platform`, formdata)
        .then((res) => {
            console.log("res", res.data);
            window.location.reload(false);
        })
        .catch((error) => console.error(error));
    };

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item>
                    <label htmlFor='upload-photo'>
                        <input
                            style={{ display: 'none' }}
                            id="upload-photo"
                            name="upload-photo"
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        {fileData ? 
                            <Button
                                className="btn-upload"
                                color="primary"
                                variant="contained"
                                component="span"
                                disabled={!fileData}
                                onClick={handleSubmit}
                            >
                                Upload
                            </Button>
                        :
                            <IconButton variant="outlined" component="span">
                                {/* Choose File */}
                                <FileUploadRoundedIcon />
                            </IconButton>
                        }
                    </label>
                </Grid>
            </Grid>
        </div>
    );
}