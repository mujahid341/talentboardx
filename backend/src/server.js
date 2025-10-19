// server.js
import app from './app.js';
import dotenv from 'dotenv';
import sequelize from './config/sequelize.js';
import './models/postgres/job.model.js'; // Register model
import './models/postgres/user.model.js'; // Register model

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  const dbType = process.env.DB_TYPE;

  if (dbType === 'postgres') {
    // PostgreSQL

    try {
      await sequelize.sync({ force: false });
      console.log('PostgreSQL DB synced');
    } catch (err) {
      console.error(' PostgreSQL sync error', err);
      process.exit(1);
    }

  } else if (dbType === 'mongo') {
    // MongoDB
    const { connectMongoDB } = await import('./config/mongodb.connect.js');
    try {
      await connectMongoDB();
    } catch (err) {
      console.error(' MongoDB connection error', err);
      process.exit(1);
    }
  } else {
    console.error(' Invalid DB_TYPE specified in .env');
    process.exit(1);
  }

  // Start server after DB is ready
  app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
  });
};

startServer();
