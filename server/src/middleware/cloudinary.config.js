import multer from 'multer';
// used as cloudinary.v2.___
import cloudinary from 'cloudinary';
// var cloudinary = require('cloudinary').v2;

const { CloudinaryStorage } = require('multer-storage-cloudinary');

// production:
// const {
//     CLOUDINARY_HOST,
//     CLOUDINARY_API_KEY,
//     CLOUDINARY_API_SECRET,
// } = process.env;

// cloudinary.config({
//     cloud_name: CLOUDINARY_HOST,
//     api_key: CLOUDINARY_API_KEY,
//     api_secret: CLOUDINARY_API_SECRET,
// });

// development:
cloudinary.config({ 
    cloud_name: 'quizhub', 
    api_key: '827266456164616', 
    api_secret: 'LKL1IsmSVWRo-iFk23lfUvSxOWk' 
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "folder name",
      format: async () => "png",
      public_id: (req, file) => file.filename,
    },
});
  
const parser = multer({ storage: storage });

export default parser;