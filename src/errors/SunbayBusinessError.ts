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

  constructor(message: string);
  constructor(message: string, cause: string);
  constructor(code: string, message: string, traceId?: string);
  constructor(codeOrMessage: string, messageOrCause?: string, traceId?: string) {
    if (messageOrCause === undefined) {
      // Single parameter: message only
      super(codeOrMessage);
      this.name = 'SunbayBusinessError';
    } else if (traceId === undefined && !codeOrMessage.startsWith('C')) {
      // Two parameters: message and cause
      super(codeOrMessage);
      this.name = 'SunbayBusinessError';
    } else {
      // Three parameters or code starts with 'C': code, message, traceId
      super(messageOrCause);
      this.name = 'SunbayBusinessError';
      this.code = codeOrMessage;
      this.traceId = traceId;
    }
  }

  public toString(): string {
    if (this.code) {
      return `SunbayBusinessError{code='${this.code}', message='${this.message}', traceId='${this.traceId || ''}'}`;
    }
    return `SunbayBusinessError{message='${this.message}'}`;
  }
}

