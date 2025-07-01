const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const { uploadPdfToSharePoint } = require('../models/sharepoint');

router.post('/uploadpdf', upload.single('pdf'), async (req, res) => {
  try {
    const fileBuffer = req.file.buffer;
    const fileName = req.file.originalname;

    const uploadResult = await uploadPdfToSharePoint(fileBuffer, fileName);
    res.json({ success: true, url: uploadResult.webUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
