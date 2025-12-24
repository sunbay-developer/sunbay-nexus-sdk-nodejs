/**
 * Sale transaction amount information
 * Supports: orderAmount, tipAmount, taxAmount, surchargeAmount, cashbackAmount
 *
 * @since 2025-12-24
 */
export interface SaleAmount {
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
   * Cashback amount (optional)
   */
  cashbackAmount?: number;

  /**
   * Pricing currency (ISO 4217, required)
   */
  pricingCurrency: string;
}

