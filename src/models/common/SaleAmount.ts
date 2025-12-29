/**
 * Sale transaction amount information
 * Supports: orderAmount, tipAmount, taxAmount, surchargeAmount, cashbackAmount
 * All amount fields are in the smallest currency unit (e.g., cents for USD, fen for CNY)
 *
 * @since 2025-12-24
 */
export interface SaleAmount {
  /**
   * Order amount (required, in smallest currency unit)
   */
  orderAmount: number;

  /**
   * Tip amount (optional, in smallest currency unit)
   */
  tipAmount?: number;

  /**
   * Tax amount (optional, in smallest currency unit)
   */
  taxAmount?: number;

  /**
   * Surcharge amount (optional, in smallest currency unit)
   */
  surchargeAmount?: number;

  /**
   * Cashback amount (optional, in smallest currency unit)
   */
  cashbackAmount?: number;

  /**
   * Pricing currency (ISO 4217, required)
   */
  pricingCurrency: string;
}

