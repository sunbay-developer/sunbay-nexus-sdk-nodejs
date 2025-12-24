/**
 * Refund amount information
 * Supports: orderAmount, tipAmount, taxAmount, surchargeAmount, cashbackAmount
 *
 * @since 2025-12-24
 */
export interface RefundAmount {
  /**
   * Order amount (required)
   */
  orderAmount: number;

  /**
   * Tip amount (optional, must be greater than or equal to 0)
   */
  tipAmount?: number;

  /**
   * Tax amount (optional, must be greater than or equal to 0)
   */
  taxAmount?: number;

  /**
   * Surcharge amount (optional, must be greater than or equal to 0).
   * Note: Some processors may require surcharge to be refunded proportionally. Please contact technical support for detailed policies.
   */
  surchargeAmount?: number;

  /**
   * Cashback amount (optional, must be greater than or equal to 0)
   */
  cashbackAmount?: number;

  /**
   * Pricing currency (ISO 4217, required)
   */
  pricingCurrency: string;
}

