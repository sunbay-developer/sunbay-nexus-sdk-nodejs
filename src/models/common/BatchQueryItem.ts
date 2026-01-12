/**
 * Batch query item information
 * <p>
 * Statistics grouped by channel code and price currency
 * </p>
 * All amount fields are in the smallest currency unit (e.g., cents for USD, fen for CNY)
 *
 * @since 2025-12-26
 */
export interface BatchQueryItem {
  /**
   * Batch number
   */
  batchNo?: string;

  /**
   * Batch start time, format: yyyy-MM-DDTHH:mm:ss+TIMEZONE (ISO 8601)
   */
  startTime?: string;

  /**
   * Payment channel code
   */
  channelCode?: string;

  /**
   * Price currency (ISO 4217)
   */
  priceCurrency?: string;

  /**
   * Total count of transactions in the batch
   */
  totalCount?: number;

  /**
   * Net amount, using smallest currency unit (minor units)
   */
  netAmount?: number;

  /**
   * Tip amount, using smallest currency unit (minor units)
   */
  tipAmount?: number;

  /**
   * Surcharge amount, using smallest currency unit (minor units)
   */
  surchargeAmount?: number;

  /**
   * Tax amount, using smallest currency unit (minor units)
   */
  taxAmount?: number;
}

