import app from './src/app.js';
import { config } from './src/config/index.js';
import connectDB from './src/config/db.js';

const start = async () => {
  await connectDB();
  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });
};

start();
