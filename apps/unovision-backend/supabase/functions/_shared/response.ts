import { ApiError } from './errors.ts';
import { type ApiErrorResponse, type ApiSuccessResponse, ErrorCode, ErrorStatusMap } from './types.ts';

// biome-ignore lint: asd
export class ResponseBuilder {
  private static corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'authorization, content-type, x-request-id',
  };

  static success<T>(data: T, status = 200, req?: Request): Response {
    const body: ApiSuccessResponse<T> = {
      success: true,
      data,
    };

    return new Response(JSON.stringify(body), {
      status,
      headers: {
        'Content-Type': 'application/json',
        ...ResponseBuilder.corsHeaders,
      },
    });
  }

  static error(error: ApiError | Error | unknown, req?: Request): Response {
    let code: ErrorCode;
    let message: string;
    let details: unknown;
    let status: number;

    if (error instanceof ApiError) {
      code = error.code;
      message = error.message;
      details = error.details;
      status = ErrorStatusMap[code];
    } else if (error instanceof Error) {
      code = ErrorCode.INTERNAL_ERROR;
      message = error.message;
      status = 500;

      // Log para debugging
      console.error('Unhandled error:', error);
    } else {
      code = ErrorCode.INTERNAL_ERROR;
      message = 'Error desconocido';
      status = 500;

      console.error('Unknown error type:', error);
    }

    const body: ApiErrorResponse = {
      success: false,
      error: {
        code,
        message,
        ...(typeof details === 'object' && details !== null ? { details } : {}),
      },
    };

    return new Response(JSON.stringify(body), {
      status,
      headers: {
        'Content-Type': 'application/json',
        ...ResponseBuilder.corsHeaders,
      },
    });
  }

  static cors(): Response {
    return new Response('ok', {
      headers: ResponseBuilder.corsHeaders,
    });
  }

  // Helper para validación con Zod
  static validationError(zodError: any, req?: Request): Response {
    const details = zodError.flatten ? zodError.flatten() : zodError;
    return ResponseBuilder.error(ApiError.validationError('Datos inválidos', details), req);
  }
}
