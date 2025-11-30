import { ErrorCode } from './types.ts';

export class ApiError extends Error {
  constructor(
    public code: ErrorCode,
    message: string,
    public details?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }

  static validationError(message: string, details?: unknown) {
    return new ApiError(ErrorCode.VALIDATION_ERROR, message, details);
  }

  static notFound(resource: string) {
    return new ApiError(ErrorCode.NOT_FOUND, `${resource} not found`);
  }

  static unauthorized(message = 'Unauthorized') {
    return new ApiError(ErrorCode.UNAUTHORIZED, message);
  }

  static forbidden(message = 'Access denied') {
    return new ApiError(ErrorCode.FORBIDDEN, message);
  }

  static conflict(message: string) {
    return new ApiError(ErrorCode.CONFLICT, message);
  }

  static internal(message = 'Internal server error') {
    return new ApiError(ErrorCode.INTERNAL_ERROR, message);
  }

  static badRequest(message: string) {
    return new ApiError(ErrorCode.BAD_REQUEST, message);
  }
}
