import multer from 'multer';
// used as cloudinary.v2.___
import cloudinary from 'cloudinary';
// var cloudinary = require('cloudinary').v2;
import { createRequire } from "module";
const require = createRequire(import.meta.url);
//import CloudinaryStorage from 'multer-storage-cloudinary';
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// production:
// const {
//     CLOUDINARY_HOST,
//     CLOUDINARY_API_KEY,
//     CLOUDINARY_API_SECRET,
// } = process.env;

// cloudinary.v2.config({
//     cloud_name: CLOUDINARY_HOST,
//     api_key: CLOUDINARY_API_KEY,
//     api_secret: CLOUDINARY_API_SECRET,
// });

// development:
cloudinary.v2.config({ 
    cloud_name: 'quizhub', 
    api_key: '827266456164616', 
    api_secret: 'LKL1IsmSVWRo-iFk23lfUvSxOWk' 
});

const imageStorage = new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: {
      folder: async (req, file) => 'Quiz',
      format: async (req, file) => "png",
      public_id: (req, file) => file.filename,
    },
});

// const avatarStorage = new CloudinaryStorage({
//     cloudinary: cloudinary.v2,
//     params: {
//       folder: async (req, file) => 'Avatar',
//       format: async (req, file) => "png",
//       public_id: (req, file) => file.filename,
//     },
// });

const imageParser = multer({ storage: imageStorage });
// const avatarParser = multer({ storage: avatarStorage });

// export default { parser, avatarParser }; 
export default imageParser;