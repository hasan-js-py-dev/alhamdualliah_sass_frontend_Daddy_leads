const mongoose = require('mongoose');

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const isTransientDnsError = (err) => {
  const msg = `${err?.message || ''} ${err?.code || ''}`.toLowerCase();
  return msg.includes('eservfail') || msg.includes('eai_again') || msg.includes('querysrv') || msg.includes('querytxt');
};

const attachConnectionEvents = () => {
  mongoose.connection.on('error', (err) => {
    console.error('❌ MongoDB connection error:', err);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('⚠️  MongoDB disconnected');
  });

  mongoose.connection.on('reconnected', () => {
    console.log('✅ MongoDB reconnected');
  });
};

const buildSeedUri = () => {
  const hosts = process.env.MONGODB_SEED_HOSTS; // comma-separated host:port list
  const user = process.env.MONGODB_USERNAME;
  const pass = process.env.MONGODB_PASSWORD;
  const db = process.env.MONGODB_DB || 'admin';
  if (!hosts || !user || !pass) return null;
  const replicaSet = process.env.MONGODB_REPLICA_SET;
  const authSource = process.env.MONGODB_AUTH_SOURCE || 'admin';

  const params = new URLSearchParams({ retryWrites: 'true', w: 'majority', tls: 'true' });
  if (replicaSet) params.set('replicaSet', replicaSet);
  if (authSource) params.set('authSource', authSource);

  return `mongodb://${encodeURIComponent(user)}:${encodeURIComponent(pass)}@${hosts}/${db}?${params.toString()}`;
};

const connectDB = async () => {
  const options = {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 60000,
    maxPoolSize: 10,
    family: 4, // prefer IPv4 in some docker/dns setups
  };

  const primaryUri = process.env.MONGODB_URI;
  const seedUri = buildSeedUri();
  const maxAttempts = parseInt(process.env.MONGODB_MAX_RETRIES || '6', 10);
  const baseDelay = parseInt(process.env.MONGODB_RETRY_BASE_MS || '1500', 10);

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      await mongoose.connect(primaryUri, options);
      console.log('✅ MongoDB Connected Successfully');
      console.log(`📊 Database: ${mongoose.connection.name}`);
      attachConnectionEvents();
      return mongoose.connection;
    } catch (err) {
      console.error(`❌ MongoDB connection attempt ${attempt} failed:`, err);

      // Fallback to seed list (non-SRV) when SRV/TXT DNS lookup fails and seed env is provided
      if (seedUri && isTransientDnsError(err)) {
        try {
          console.warn('🌐 SRV/TXT DNS lookup failed. Trying seed list connection (mongodb://)...');
          await mongoose.connect(seedUri, options);
          console.log('✅ MongoDB Connected Successfully (seed list)');
          console.log(`📊 Database: ${mongoose.connection.name}`);
          attachConnectionEvents();
          return mongoose.connection;
        } catch (fallbackErr) {
          console.error('❌ Seed list connection also failed:', fallbackErr);
        }
      }

      if (attempt < maxAttempts) {
        const delay = baseDelay * Math.pow(2, attempt - 1); // exponential backoff
        console.log(`⏳ Retrying MongoDB connection in ${delay}ms...`);
        await sleep(delay);
      } else {
        console.error('❌ MongoDB connection failed after maximum retries');
        throw err;
      }
    }
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
    throw error;
  }
};

module.exports = { connectDB, disconnectDB };
