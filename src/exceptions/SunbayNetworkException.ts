/**
 * Sunbay network exception
 *
 * @since 2025-12-24
 */
export class SunbayNetworkException extends Error {
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
    this.name = 'SunbayNetworkException';

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
    return `SunbayNetworkException{message='${this.message}', retryable=${this.retryable}}`;
  }
}

