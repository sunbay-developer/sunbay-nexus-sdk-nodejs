/**
 * Transaction batch settlement status enum.
 *
 * @since 2026-06-29
 */
export enum TransactionBatchStatus {
  /**
   * No batch settlement needed
   */
  N = 'N',

  /**
   * Waiting for batch close
   */
  U = 'U',

  /**
   * Batch closed
   */
  C = 'C',
}
