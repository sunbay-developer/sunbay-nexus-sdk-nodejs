/**
 * Sunbay network error
 *
 * @since 2025-01-24
 */
export class SunbayNetworkError extends Error {
  /**
   * Whether the error is retryable
   */
  public readonly retryable: boolean;

  /**
   * The cause of the error
   */
  public readonly cause?: Error;

  constructor(message: string, cause?: Error, retryable?: boolean);
  constructor(message: string, retryable: boolean);
  constructor(message: string, causeOrRetryable?: Error | boolean, retryable?: boolean) {
    super(message);
    this.name = 'SunbayNetworkError';

    if (causeOrRetryable instanceof Error) {
      this.cause = causeOrRetryable;
      this.retryable = retryable !== undefined ? retryable : false;
    } else if (typeof causeOrRetryable === 'boolean') {
      this.retryable = causeOrRetryable;
    } else {
      this.retryable = false;
    }
  }

  public toString(): string {
    return `SunbayNetworkError{message='${this.message}', retryable=${this.retryable}}`;
  }
}

