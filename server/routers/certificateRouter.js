import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Certificate from '../models/certificateSchema.js';

const certificateRouter = express.Router();

//get data
certificateRouter.get(
  '/get',
  expressAsyncHandler(async (req, res) => {
    const createCertificate = await Certificate.find();
    res.send({ createCertificate });
  })
);

//post sample data
certificateRouter.post(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    await Certificate.remove({});
    const createCertificate = await Certificate.insertMany(data.ranking);
    res.send({ createCertificate });
  })
);

//create new data
certificateRouter.post(
  '/post',
  expressAsyncHandler(async (req, res) => {
    const certificate = new Certificate({
      certificateRasterizedContentUrl: 'sample certificate Url',
      certificateEncodedContent: 'sample encoded content for certificate',
      certificateUploadFile: 'sample certificate file',
      certificateRequirementsAccuracy: 5,
    });
    const createdCertificate = await certificate.save();
    res.send({
      message: 'Certificate Created',
      certificate: createdCertificate,
    });
  })
);

// update -> no needed for certificate
// certificateRouter.put(
//   '/:id',
//   expressAsyncHandler(async (req, res) => {
//     const certificateId = req.params.id;
//     const certificate = await Certificate.findById(certificateId);

//     console.log(req.body);
//     if (certificate) {
//       certificate.username = req.body.username;
//       certificate.score = req.body.score;
//       certificate.minutes = req.body.minutes;
//       certificate.seconds = req.body.seconds;
//       certificate.isPrivate = req.body.isPrivate;
//       certificate.updatedAt = req.body.updatedAt;
//       const updatedCertificate = await certificate.save();
//       res.send({
//         message: 'Certificate Updated',
//         certificate: updatedCertificate,
//       });
//     } else {
//       res.status(404).send({ message: 'Certificate Not Found' });
//     }
//   })
// );

certificateRouter.delete(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const certificate = await Certificate.findById(req.params.id);
    if (certificate) {
      const deleteCertificate = await certificate.remove();
      res.send({
        message: 'Certificate Deleted',
        certificate: deleteCertificate,
      });
    } else {
      res.status(404).send({ message: 'Certificate Not Found' });
    }
  })
);

export default certificateRouter;
