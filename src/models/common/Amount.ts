/**
 * Amount information
 *
 * @since 2025-12-24
 */
export interface Amount {
  /**
   * Price currency (used in query response, ISO 4217)
   */
  priceCurrency?: string;

  /**
   * Transaction amount (calculated field in response)
   */
  transAmount?: number;

  /**
   * Order amount
   */
  orderAmount?: number;

  /**
   * Tax amount
   */
  taxAmount?: number;

  /**
   * Surcharge amount
   */
  surchargeAmount?: number;

  /**
   * Tip amount
   */
  tipAmount?: number;

  /**
   * Cashback amount
   */
  cashbackAmount?: number;

  /**
   * Pricing currency (ISO 4217, used in request)
   */
  pricingCurrency?: string;
}

