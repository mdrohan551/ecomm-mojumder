// index.js (ESM)
import app from './app.js';
import { PORT } from './src/config/Config.js';

app.listen(PORT, () => {
  console.log(`MAJUMDER E-commerce Ready 👉 http://localhost:${PORT}`);
});
