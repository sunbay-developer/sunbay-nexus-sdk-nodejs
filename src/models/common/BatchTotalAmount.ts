/**
 * Batch total amount information
 * All amount fields are in the smallest currency unit (e.g., cents for USD, fen for CNY)
 *
 * @since 2025-12-24
 */
export interface BatchTotalAmount {
  /**
   * Price currency (ISO 4217)
   */
  priceCurrency: string;

  /**
   * Total amount (in smallest currency unit)
   */
  amount: number;
}

