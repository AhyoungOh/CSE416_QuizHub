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
    const createCertificate = await Certificate.insertMany(data.certificate);
    res.send({ createCertificate });
  })
);

//create new data
certificateRouter.post(
  '/post',
  expressAsyncHandler(async (req, res) => {
    const certificate = new Certificate({
      certificateRasterizedContentUrl: req.body.certificateRasterizedContentUrl,
      certificateEncodedContent: req.body.certificateEncodedContent,
      certificateUploadFile: req.body.certificateUploadFile,
      certificateRequirementsAccuracy: req.body.certificateRequirementsAccuracy,
    });
    const createdCertificate = await certificate.save();
    res.send({
      message: 'Certificate Created',
      certificate: createdCertificate,
    });
  })
);

// update
certificateRouter.put(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const certificateId = req.params.id;
    const certificate = await Certificate.findById(certificateId);

    console.log(req.body);
    if (certificate) {
      certificate.certificateRasterizedContentUrl =
        req.body.certificateRasterizedContentUrl;
      certificate.certificateEncodedContent =
        req.body.certificateEncodedContent;
      certificate.certificateUploadFile = req.body.certificateUploadFile;
      certificate.certificateRequirementsAccuracy =
        req.body.certificateRequirementsAccuracy;
      const updatedcertificate = await certificate.save();
      res.send({
        message: 'certificate Updated',
        Badge: updatedcertificate,
      });
    } else {
      res.status(404).send({ message: 'certificate Not Found' });
    }
  })
);

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
