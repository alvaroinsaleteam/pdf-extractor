import express from 'express';
import multer from 'multer';
import pdfParse from 'pdf-parse';

const app = express();
const upload = multer();

app.post('/extract', upload.single('file'), async (req, res) => {
  try {
    const data = await pdfParse(req.file.buffer);
    res.json({ text: data.text });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/', (req, res) => {
  res.send('PDF extractor is running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`PDF extractor listening on port ${PORT}`);
});
