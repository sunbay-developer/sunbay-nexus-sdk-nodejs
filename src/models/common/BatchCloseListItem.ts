/**
 * Batch close list item information
 * <p>
 * Represents a single closed (settled) batch record.
 * </p>
 *
 * @since 2026-09-01
 */
export interface BatchCloseListItem {
  /**
   * Batch number
   */
  batchNo?: string;

  /**
   * Batch status: S - Success
   */
  batchStatus?: string;

  /**
   * Batch close time, ISO 8601 format
   */
  batchTime?: string;

  /**
   * Total number of transactions in the batch
   */
  totalCount?: number;

  /**
   * Total net amount, using minor units.
   * The number of decimal places for each currency can refer to the ISO-4217 standard
   */
  netAmount?: number;

  /**
   * Transaction currency (ISO 4217, e.g. USD, CNY)
   */
  priceCurrency?: string;

  /**
   * Payment channel code
   */
  channelCode?: string;

  /**
   * Terminal serial number
   */
  terminalSn?: string;

  /**
   * Merchant Identification number (MID) assigned by the payment processor
   */
  mid?: string;

  /**
   * Terminal Identification number (TID) assigned by the payment processor
   */
  tid?: string;
}
