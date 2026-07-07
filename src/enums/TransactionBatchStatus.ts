/**
 * Transaction batch settlement status enum.
 *
 * @since 2026-06-29
 */
export enum TransactionBatchStatus {
  /**
   * No batch settlement needed
   */
  NB = 'NB',

  /**
   * Waiting for batch close
   */
  UB = 'UB',

  /**
   * Batch closed
   */
  BC = 'BC',
}
