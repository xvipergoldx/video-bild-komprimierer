const { createServer } = require('http');
const { readFileSync, existsSync } = require('fs');
const { join, extname } = require('path');

const MIME = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.wasm': 'application/wasm',
};

const dir = __dirname;

createServer((req, res) => {
  const url = req.url.split('?')[0];
  const file = join(dir, url === '/' ? 'video-compressor.html' : url);

  if (!existsSync(file)) {
    res.writeHead(404);
    res.end('Not found');
    return;
  }

  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  res.setHeader('Content-Type', MIME[extname(file)] || 'application/octet-stream');
  res.end(readFileSync(file));
}).listen(3000, () => {
  console.log('Video Kompressor laeuft auf: http://localhost:3000');
});
