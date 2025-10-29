/**
 * Structured logging utility with sensitive data redaction
 */

const redactSensitiveData = (data) => {
  if (!data) return data;
  
  const sensitive = ['password', 'token', 'authorization', 'cookie'];
  const redacted = { ...data };
  
  Object.keys(redacted).forEach(key => {
    if (sensitive.some(s => key.toLowerCase().includes(s))) {
      redacted[key] = '[REDACTED]';
    }
  });
  
  return redacted;
};

const logger = {
  info: (message, meta = {}) => {
    const log = {
      level: 'info',
      message,
      timestamp: new Date().toISOString(),
      ...redactSensitiveData(meta)
    };
    
    if (process.env.NODE_ENV === 'production') {
      console.log(JSON.stringify(log));
    } else {
      console.log(`ℹ️ ${message}`, meta);
    }
  },
  
  error: (message, error = {}) => {
    const log = {
      level: 'error',
      message,
      timestamp: new Date().toISOString(),
      error: process.env.NODE_ENV === 'production' 
        ? { message: error.message, code: error.code }
        : { ...error, stack: error.stack }
    };
    
    console.error(JSON.stringify(log));
  },
  
  warn: (message, meta = {}) => {
    const log = {
      level: 'warn',
      message,
      timestamp: new Date().toISOString(),
      ...redactSensitiveData(meta)
    };
    
    console.warn(JSON.stringify(log));
  }
};

module.exports = logger;
