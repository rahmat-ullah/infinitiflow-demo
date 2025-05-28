import { createWriteStream } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { mkdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create logs directory if it doesn't exist
const logsDir = join(__dirname, '../../logs');
try {
  mkdirSync(logsDir, { recursive: true });
} catch (error) {
  // Directory already exists
}

// Log levels
const LOG_LEVELS = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3
};

class Logger {
  constructor() {
    this.logLevel = LOG_LEVELS[process.env.LOG_LEVEL?.toUpperCase()] || LOG_LEVELS.INFO;
    this.errorStream = createWriteStream(join(logsDir, 'error.log'), { flags: 'a' });
    this.combinedStream = createWriteStream(join(logsDir, 'combined.log'), { flags: 'a' });
  }

  formatMessage(level, message, meta = {}) {
    const timestamp = new Date().toISOString();
    const metaString = Object.keys(meta).length > 0 ? ` ${JSON.stringify(meta)}` : '';
    return `${timestamp} [${level}]: ${message}${metaString}\n`;
  }

  log(level, message, meta = {}) {
    if (LOG_LEVELS[level] > this.logLevel) return;

    const formattedMessage = this.formatMessage(level, message, meta);
    
    // Write to combined log
    this.combinedStream.write(formattedMessage);
    
    // Write errors to error log
    if (level === 'ERROR') {
      this.errorStream.write(formattedMessage);
    }

    // Console output for development
    if (process.env.NODE_ENV !== 'production') {
      const colors = {
        ERROR: '\x1b[31m', // Red
        WARN: '\x1b[33m',  // Yellow
        INFO: '\x1b[36m',  // Cyan
        DEBUG: '\x1b[35m'  // Magenta
      };
      const reset = '\x1b[0m';
      console.log(`${colors[level]}${formattedMessage.trim()}${reset}`);
    }
  }

  error(message, meta = {}) {
    this.log('ERROR', message, meta);
  }

  warn(message, meta = {}) {
    this.log('WARN', message, meta);
  }

  info(message, meta = {}) {
    this.log('INFO', message, meta);
  }

  debug(message, meta = {}) {
    this.log('DEBUG', message, meta);
  }

  // HTTP request logging middleware
  httpLog(req, res, next) {
    const start = Date.now();
    
    res.on('finish', () => {
      const duration = Date.now() - start;
      const message = `${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`;
      
      if (res.statusCode >= 400) {
        this.error(message, {
          ip: req.ip,
          userAgent: req.get('User-Agent'),
          body: req.body
        });
      } else {
        this.info(message, {
          ip: req.ip,
          userAgent: req.get('User-Agent')
        });
      }
    });
    
    next();
  }
}

export const logger = new Logger(); 