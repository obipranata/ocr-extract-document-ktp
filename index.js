const express = require('express');
const multer = require('multer');
const fs = require("fs");
const app = express();
const port = 3000;

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Set the upload directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });
const textractScan = require("./textract");

// Endpoint for file upload
app.post('/upload', upload.single('file'), async (req, res) => {
  const data = fs.readFileSync('./uploads/'+req.file.filename);
  const results = await textractScan(data);
  res.send({'data': results});
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
