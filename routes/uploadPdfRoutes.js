const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();

const { getAccessToken } = require('../auth/msalClient'); // <- note updated path

const axios = require('axios');

router.post('/uploadpdf', upload.single('pdf'), async (req, res) => {
  try {
    const fileBuffer = req.file.buffer;
    const fileName = req.file.originalname;

    const accessToken = await getAccessToken();

    const driveId = 'b!bRRCFNiB-Euhtl89WwPBxfUtpv6SShpOr-VdW6s9T8HpwPhV0s0nQLLZxBZiMaeV';
    const encodedFileName = encodeURIComponent(fileName);

    const url = `https://graph.microsoft.com/v1.0/drives/${driveId}/root:/Raportit/${encodedFileName}:/content`;

    const response = await axios.put(url, fileBuffer, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/pdf',
      },
    });

    console.log('✅ Upload success:', response.data);
    res.status(200).json({ success: true, data: response.data });

  } catch (err) {
    console.error('❌ Upload failed:', err.response?.data || err.message);
    res.status(500).json({ success: false, error: err.response?.data || err.message });
  }
});


module.exports = router;
