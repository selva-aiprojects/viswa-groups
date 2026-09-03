const fs = require('fs');
const http = require('http');
const path = require('path');
const leadHandler = require('./api/leads');

const port = Number(process.env.PORT || 3000);
const root = __dirname;
const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp'
};

function sendJson(response, status, body) {
  response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify(body));
}

function serveFile(request, response) {
  const requestedPath = decodeURIComponent(request.url.split('?')[0]);
  const relativePath = requestedPath === '/' ? 'index.html' : requestedPath.slice(1);
  const filePath = path.resolve(root, relativePath);
  if (!filePath.startsWith(root + path.sep)) {
    sendJson(response, 403, { error: 'Forbidden' });
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      sendJson(response, error.code === 'ENOENT' ? 404 : 500, { error: 'Not found' });
      return;
    }
    response.writeHead(200, { 'Content-Type': contentTypes[path.extname(filePath)] || 'application/octet-stream' });
    response.end(data);
  });
}

const server = http.createServer((request, response) => {
  if (request.url.split('?')[0] === '/api/leads') {
    if (request.method !== 'POST') {
      sendJson(response, 405, { error: 'Method not allowed' });
      return;
    }
    let body = '';
    request.on('data', (chunk) => { body += chunk; });
    request.on('end', async () => {
      try {
        request.body = body ? JSON.parse(body) : {};
        await leadHandler(request, {
          status(statusCode) {
            response.statusCode = statusCode;
            return this;
          },
          json(payload) {
            response.setHeader('Content-Type', 'application/json; charset=utf-8');
            response.end(JSON.stringify(payload));
          }
        });
      } catch (error) {
        console.error('Local API error:', error);
        sendJson(response, 500, { error: 'Internal server error' });
      }
    });
    return;
  }

  serveFile(request, response);
});

function startServer(currentPort) {
  server.removeAllListeners('listening');
  server.once('listening', () => {
    console.log(`Local server running at http://localhost:${currentPort}`);
  });
  server.once('error', (error) => {
    if (error.code !== 'EADDRINUSE') throw error;
    server.close(() => startServer(currentPort + 1));
  });
  server.listen(currentPort);
}

startServer(port);
