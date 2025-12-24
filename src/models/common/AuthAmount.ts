/**
 * Authorization amount information
 * Supports: orderAmount, pricingCurrency only
 * Used for: Auth, ForcedAuth, IncrementalAuth
 *
 * @since 2025-12-24
 */
export interface AuthAmount {
  /**
   * Order amount (required)
   */
  orderAmount: number;

  /**
   * Pricing currency (ISO 4217, required)
   */
  pricingCurrency: string;
}

