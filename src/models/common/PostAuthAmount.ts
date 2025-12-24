/**
 * Post authorization amount information
 * Supports: orderAmount, tipAmount, taxAmount, surchargeAmount
 * Does NOT support: cashbackAmount
 *
 * @since 2025-12-24
 */
export interface PostAuthAmount {
  /**
   * Order amount (required)
   */
  orderAmount: number;

  /**
   * Tip amount (optional)
   */
  tipAmount?: number;

  /**
   * Tax amount (optional)
   */
  taxAmount?: number;

  /**
   * Surcharge amount (optional)
   */
  surchargeAmount?: number;

  /**
   * Pricing currency (ISO 4217, required)
   */
  pricingCurrency: string;
}

