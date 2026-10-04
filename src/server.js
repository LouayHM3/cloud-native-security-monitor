import { createServer } from 'node:http';
import { metrics, securitySummary } from './index.js';

createServer((request, response) => {
  if (request.url === '/health') {
    response.setHeader('content-type', 'application/json');
    response.end(JSON.stringify({ status: 'ok', service: 'cloud-native-security-monitor' }));
    return;
  }
  response.setHeader('content-type', request.url === '/metrics' ? 'text/plain' : 'application/json');
  response.end(request.url === '/metrics' ? metrics() : JSON.stringify(securitySummary()));
}).listen(process.env.PORT || 3002, () => console.log('Cloud security monitor listening on http://localhost:3002'));
