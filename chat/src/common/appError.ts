/**
 * [INPUT]: 依赖标准 Error
 * [OUTPUT]: 对外提供 AppError 与 isAppError
 * [POS]: chat 公共错误边界，统一 HTTP 状态码、错误代码与错误详情
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
export class AppError extends Error {
  readonly code: string;
  readonly details?: unknown;
  readonly status: number;

  constructor(status: number, code: string, message: string, details?: unknown) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.details = details;
    this.status = status;
  }
}

export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}
