/**
 * Sunbay SDK business exception
 * <p>
 * Used for API business exceptions and parameter validation errors
 * </p>
 *
 * @since 2025-12-24
 */
export class SunbayBusinessException extends Error {
  /**
   * API error code (for API exceptions)
   */
  public readonly code?: string;

  /**
   * Trace ID (for API exceptions)
   */
  public readonly traceId?: string;

  constructor(message: string);
  constructor(message: string, cause: string);
  constructor(code: string, message: string, traceId?: string);
  constructor(codeOrMessage: string, messageOrCause?: string, traceId?: string) {
    if (messageOrCause === undefined) {
      // Single parameter: message only
      super(codeOrMessage);
      this.name = 'SunbayBusinessException';
    } else if (traceId === undefined && !codeOrMessage.startsWith('C')) {
      // Two parameters: message and cause
      super(codeOrMessage);
      this.name = 'SunbayBusinessException';
    } else {
      // Three parameters or code starts with 'C': code, message, traceId
      super(messageOrCause);
      this.name = 'SunbayBusinessException';
      this.code = codeOrMessage;
      this.traceId = traceId;
    }
  }

  public toString(): string {
    if (this.code) {
      return `SunbayBusinessException{code='${this.code}', message='${this.message}', traceId='${this.traceId || ''}'}`;
    }
    return `SunbayBusinessException{message='${this.message}'}`;
  }
}

