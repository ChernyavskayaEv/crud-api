import { createServer } from 'node:http';
import { config } from 'dotenv';
config();

import { routing } from './router/router.js';
import { ServerError } from './errors/errors.js';

const port = process.env['PORT'];

const httpError = (code, response, message) => {
  response.statusCode = code;
  response.end(message);
};

const OkCode = {
  GET: 200,
  POST: 201,
  PUT: 200,
  DELETE: 204,
};

const server = createServer(async (req, res) => {
  const url = req.url;
  console.log(
    `Executing request: ${req.method} ${url} --- Server #${process.pid} is running on port ${port}`
  );

  if (!url?.startsWith('/api/users')) {
    httpError(404, res, 'Not Found');
    return;
  }
  const handler = routing['/api/users'];

  try {
    const data = await handler(req);
    res.writeHead(OkCode[req.method] ?? 200, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify(data));
  } catch (err) {
    if (err instanceof ServerError) {
      res.statusCode = err.code;
      res.end(err.message);
      return;
    }
    res.statusCode = 500;
    res.end(err.message);
  }
});

server.listen(port, () => {
  console.log(`Server #${process.pid} is running on port ${port}`);
});
