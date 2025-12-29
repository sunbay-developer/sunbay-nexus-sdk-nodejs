/**
 * Amount information
 * All amount fields are in the smallest currency unit (e.g., cents for USD, fen for CNY)
 *
 * @since 2025-12-24
 */
export interface Amount {
  /**
   * Price currency (used in query response, ISO 4217)
   */
  priceCurrency?: string;

  /**
   * Transaction amount (calculated field in response, in smallest currency unit)
   */
  transAmount?: number;

  /**
   * Order amount (in smallest currency unit)
   */
  orderAmount?: number;

  /**
   * Tax amount (in smallest currency unit)
   */
  taxAmount?: number;

  /**
   * Surcharge amount (in smallest currency unit)
   */
  surchargeAmount?: number;

  /**
   * Tip amount (in smallest currency unit)
   */
  tipAmount?: number;

  /**
   * Cashback amount (in smallest currency unit)
   */
  cashbackAmount?: number;

  /**
   * Pricing currency (ISO 4217, used in request)
   */
  pricingCurrency?: string;
}

