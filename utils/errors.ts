// errors.ts

// HTTP Status Codes
export enum HttpStatusCode {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
    // Add other status codes as needed
  }
  
  // Custom Error Codes
  export enum AppErrorCode {
    // Network Errors (1000-1999)
    NETWORK_ERROR = 1000,
    REQUEST_TIMEOUT = 1001,
    OFFLINE = 1002,
  
    // Authentication Errors (2000-2999)
    INVALID_CREDENTIALS = 2000,
    TOKEN_EXPIRED = 2001,
  
    // Client Errors (4000-4999)
    INVALID_INPUT = 4000,
    RESOURCE_NOT_FOUND = 4004,
  
    // Server Errors (5000-5999)
    SERVER_ERROR = 5000,
  
    // Device Errors (6000-6999)
    CAMERA_PERMISSION_DENIED = 6000,
    LOCATION_PERMISSION_DENIED = 6001,
  
    // Unknown Error
    UNKNOWN_ERROR = 10000
  }
  
  // Error messages corresponding to error codes
  export const ErrorMessages: { [key in AppErrorCode]: string } = {
    [AppErrorCode.NETWORK_ERROR]: "Network error occurred. Please check your connection.",
    [AppErrorCode.REQUEST_TIMEOUT]: "Request timed out. Please try again.",
    [AppErrorCode.OFFLINE]: "You are offline. Please check your internet connection.",
  
    [AppErrorCode.INVALID_CREDENTIALS]: "Invalid username or password.",
    [AppErrorCode.TOKEN_EXPIRED]: "Your session has expired. Please log in again.",
  
    [AppErrorCode.INVALID_INPUT]: "The provided input is invalid.",
    [AppErrorCode.RESOURCE_NOT_FOUND]: "The requested resource was not found.",
  
    [AppErrorCode.SERVER_ERROR]: "An unexpected server error occurred. Please try again later.",
  
    [AppErrorCode.CAMERA_PERMISSION_DENIED]: "Camera permission is required for this feature.",
    [AppErrorCode.LOCATION_PERMISSION_DENIED]: "Location permission is required for this feature.",
  
    [AppErrorCode.UNKNOWN_ERROR]: "An unknown error occurred. Please try again."
  };
  
  // Custom error class
  export class AppError extends Error {
    code: AppErrorCode;
    httpStatus?: HttpStatusCode;
  
    constructor(code: AppErrorCode, message?: string, httpStatus?: HttpStatusCode) {
      super(message || ErrorMessages[code]);
      this.code = code;
      this.httpStatus = httpStatus;
      this.name = 'AppError';
    }
  }
  
  // Utility function to create an error
  export function createError(code: AppErrorCode, message?: string, httpStatus?: HttpStatusCode): AppError {
    return new AppError(code, message, httpStatus);
  }
  
  // Utility function to map HTTP status to AppErrorCode
  export function mapHttpStatusToErrorCode(httpStatus: HttpStatusCode): AppErrorCode {
    switch (httpStatus) {
      case HttpStatusCode.BAD_REQUEST:
        return AppErrorCode.INVALID_INPUT;
      case HttpStatusCode.UNAUTHORIZED:
        return AppErrorCode.INVALID_CREDENTIALS;
      case HttpStatusCode.NOT_FOUND:
        return AppErrorCode.RESOURCE_NOT_FOUND;
      case HttpStatusCode.INTERNAL_SERVER_ERROR:
        return AppErrorCode.SERVER_ERROR;
      default:
        return AppErrorCode.UNKNOWN_ERROR;
    }
  }