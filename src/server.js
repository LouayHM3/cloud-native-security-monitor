import { createServer } from 'node:http';
import { metrics, securitySummary } from './index.js';
import { loadConfig, verifyWebhook } from './config.js';
import { log } from './logger.js';

const config = loadConfig();

createServer((request, response) => {
  log('info', 'request received', { method: request.method, path: request.url });
  if (request.url === '/health') {
    response.setHeader('content-type', 'application/json');
    response.end(JSON.stringify({ status: 'ok', service: 'cloud-native-security-monitor' }));
    return;
  }
  if (request.url === '/alerts/webhook' && request.method === 'POST') {
    let body = '';
    request.on('data', chunk => { body += chunk; });
    request.on('end', () => {
      response.statusCode = verifyWebhook(request.headers, body, config) ? 202 : 401;
      response.setHeader('content-type', 'application/json');
      response.end(JSON.stringify({ accepted: response.statusCode === 202 }));
    });
    return;
  }
  response.setHeader('content-type', request.url === '/metrics' ? 'text/plain' : 'application/json');
  response.end(request.url === '/metrics' ? metrics() : JSON.stringify(securitySummary()));
}).listen(process.env.PORT || 3002, () => console.log('Cloud security monitor listening on http://localhost:3002'));
