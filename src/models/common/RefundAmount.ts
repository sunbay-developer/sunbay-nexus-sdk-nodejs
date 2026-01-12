/**
 * Refund amount information
 * Supports: orderAmount, tipAmount, taxAmount, surchargeAmount, cashbackAmount
 * All amount fields are in the smallest currency unit (e.g., cents for USD, fen for CNY)
 *
 * @since 2025-12-24
 */
export interface RefundAmount {
  /**
   * Order amount (required, in smallest currency unit)
   */
  orderAmount: number;

  /**
   * Tip amount (optional, must be greater than or equal to 0, in smallest currency unit)
   */
  tipAmount?: number;

  /**
   * Tax amount (optional, must be greater than or equal to 0, in smallest currency unit)
   */
  taxAmount?: number;

  /**
   * Surcharge amount (optional, must be greater than or equal to 0, in smallest currency unit).
   * Note: Some processors may require surcharge to be refunded proportionally. Please contact technical support for detailed policies.
   */
  surchargeAmount?: number;

  /**
   * Cashback amount (optional, must be greater than or equal to 0, in smallest currency unit)
   */
  cashbackAmount?: number;

  /**
   * Price currency (ISO 4217, required)
   */
  priceCurrency: string;
}

