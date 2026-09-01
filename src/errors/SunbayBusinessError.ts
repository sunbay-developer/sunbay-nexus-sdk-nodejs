/**
 * Sunbay SDK business error
 * <p>
 * Used for API business errors and parameter validation errors
 * </p>
 *
 * @since 2025-01-24
 */
export class SunbayBusinessError extends Error {
  /**
   * API error code (for API errors)
   */
  public readonly code?: string;

  /**
   * Trace ID (for API errors)
   */
  public readonly traceId?: string;

  /**
   * Create a business error with code, message, and optional traceId.
   *
   * @param code API error code
   * @param message error message
   * @param traceId optional trace ID for troubleshooting
   */
  constructor(code: string, message: string, traceId?: string) {
    super(message);
    this.name = 'SunbayBusinessError';
    this.code = code;
    this.traceId = traceId;
    Object.setPrototypeOf(this, new.target.prototype);
  }

  public toString(): string {
    if (this.code) {
      return `SunbayBusinessError{code='${this.code}', message='${this.message}', traceId='${this.traceId || ''}'}`;
    }
    return `SunbayBusinessError{message='${this.message}'}`;
  }
}

