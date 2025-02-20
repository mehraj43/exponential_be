export class BaseError extends Error {
  code: number;
  message: string;
  constructor(statusCode: number, message: string) {
    super();
    this.code = statusCode;
    this.message = message;
  }
}

export class BadRequestError extends BaseError {
  constructor(message: any) {
    super(400, message);
  }
}

export class NotFoundError extends BaseError {
  constructor(message: any) {
    super(404, message);
  }
}

export class DuplicateRecordError extends BaseError {
  constructor(message: string) {
    super(409, message);
  }
}

export class UnauthorizedError extends BaseError {
  constructor(message: any) {
    super(401, message);
  }
}

export class ForbiddenError extends BaseError {
  constructor(message: any) {
    super(403, message);
  }
}
