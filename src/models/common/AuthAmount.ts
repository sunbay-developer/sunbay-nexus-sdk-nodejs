/**
 * Authorization amount information
 * Supports: orderAmount, pricingCurrency only
 * Used for: Auth, ForcedAuth, IncrementalAuth
 * All amount fields are in the smallest currency unit (e.g., cents for USD, fen for CNY)
 *
 * @since 2025-12-24
 */
export interface AuthAmount {
  /**
   * Order amount (required, in smallest currency unit)
   */
  orderAmount: number;

  /**
   * Pricing currency (ISO 4217, required)
   */
  pricingCurrency: string;
}

