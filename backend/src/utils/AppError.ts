export class AppError extends Error {
  public statusCode: number;
  public status: string;
  public isActive: boolean;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isActive = true;
    Error.captureStackTrace(this, this.constructor);
  }
}
