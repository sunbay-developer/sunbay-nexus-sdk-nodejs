/**
 * Transaction status enum
 *
 * @since 2025-12-24
 */
export enum TransactionStatus {
  /**
   * Initial state
   */
  INITIAL = 'INITIAL',

  /**
   * Transaction processing. Channel called but no result obtained, or unexpected
   * exception returned.
   */
  PROCESSING = 'PROCESSING',

  /**
   * Transaction successful
   */
  SUCCESS = 'SUCCESS',

  /**
   * Transaction failed
   */
  FAIL = 'FAIL',

  /**
   * Transaction closed
   */
  CLOSED = 'CLOSED',
}

