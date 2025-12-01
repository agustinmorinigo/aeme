export interface ApiSuccessResponse<T = unknown> {
  data: T;
  success: true;
  status: number;
}

export interface ApiErrorResponse {
  error: {
    message: string;
    status: number;
    details?: unknown;
  };
  success: false;
}
