
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// Fix __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from current folder
app.use(express.static(__dirname));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`portfolio running at http://localhost:${PORT}`);
});