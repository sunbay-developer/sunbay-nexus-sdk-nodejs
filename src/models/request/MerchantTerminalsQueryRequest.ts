/**
 * Merchant terminals query request
 *
 * @since 2026-09-01
 */
export interface MerchantTerminalsQueryRequest {
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

  /**
   * Pagination token returned by the previous response.
   * Pass it back to fetch the next page. Omit on the first request.
   * The token is an opaque string — do not parse or modify its contents.
   */
  nextToken?: string;
}
