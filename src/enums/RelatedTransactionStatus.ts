/**
 * Related transaction status enum.
 * Indicates the lifecycle change of the current transaction due to subsequent transactions.
 *
 * @since 2026-06-29
 */
export enum RelatedTransactionStatus {
  /**
   * Transaction has been voided
   */
  VOIDED = 'VOIDED',

  /**
   * Transaction has incremental authorization
   */
  INCREMENTAL = 'INCREMENTAL',

  /**
   * Transaction has been fully refunded
   */
  REFUNDED = 'REFUNDED',

  /**
   * Transaction has been captured (post-auth)
   */
  CAPTURE = 'CAPTURE',

  /**
   * Transaction has been partially refunded
   */
  PART_REFUNDED = 'PART_REFUNDED',
}
