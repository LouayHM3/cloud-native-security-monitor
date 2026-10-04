import { createServer } from 'node:http';
import { metrics, securitySummary } from './index.js';

createServer((request, response) => {
  response.setHeader('content-type', request.url === '/metrics' ? 'text/plain' : 'application/json');
  response.end(request.url === '/metrics' ? metrics() : JSON.stringify(securitySummary()));
}).listen(process.env.PORT || 3002, () => console.log('Cloud security monitor listening on http://localhost:3002'));
