import app from './src/app.js';
import { config } from './src/config/index.js';
import connectDB from './src/config/db.js';

const start = async () => {
  // Bind port immediately on 0.0.0.0 so Render detects active server immediately (prevents 502 Bad Gateway)
  const port = config.port || 5000;
  app.listen(port, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${port}`);
  });

  // Connect to MongoDB
  try {
    await connectDB();
  } catch (err) {
    console.error('⚠️ Initial DB connect error:', err.message);
  }
};

start();

