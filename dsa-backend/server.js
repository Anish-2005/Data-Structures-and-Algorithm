const app = require('./app');
const { PORT } = require('./config/constants');
const { ALLOWED_ORIGINS, API_BASE_PATH } = require('./config/constants');

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log('🛡️  CORS enabled for origins:');
  ALLOWED_ORIGINS.forEach(origin => console.log(`   - ${origin}`));
  console.log(`📂 API base path: ${API_BASE_PATH}`);
});

// Handle shutdown gracefully
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Closing server...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});