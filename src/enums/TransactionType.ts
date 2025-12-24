/**
 * Transaction type enum
 *
 * @since 2025-12-24
 */
export enum TransactionType {
  /**
   * Sale transaction
   */
  SALE = 'SALE',

  /**
   * Authorization (pre-auth)
   */
  AUTH = 'AUTH',

  /**
   * Forced authorization
   */
  FORCED_AUTH = 'FORCED_AUTH',

  /**
   * Incremental authorization
   */
  INCREMENTAL = 'INCREMENTAL',

  /**
   * Post authorization (pre-auth completion)
   */
  POST_AUTH = 'POST_AUTH',

  /**
   * Refund
   */
  REFUND = 'REFUND',

  /**
   * Void
   */
  VOID = 'VOID',
}

