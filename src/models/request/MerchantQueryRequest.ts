/**
 * Merchant query request
 *
 * @since 2026-09-01
 */
export interface MerchantQueryRequest {
  /**
   * Application ID
   */
  appId: string;

  /**
   * SUNBAY platform merchant unique identifier.
   * Format: 11-character alphanumeric string starting with M.
   * Note: This is not the MID assigned by a payment processor
   */
  merchantId: string;
}
