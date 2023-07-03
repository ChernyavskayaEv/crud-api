const defaultMessages = {
  404: 'Not Found',
  400: 'Bad Request',
  500: 'Internal Server Error',
};

export class ServerError extends Error {
  constructor(code, message = null) {
    super();
    this.code = code;
    this.message = message ?? defaultMessages[code];
  }
}
