
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const port = process.env.PORT || 3000;
const app = express();
app.use(express.static(path.join(__dirname+'/public')))

// Fix __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from current folder
app.use(express.static(__dirname));

app.listen(port, () => {
  console.log(`API server listening on port ${port}`);
});