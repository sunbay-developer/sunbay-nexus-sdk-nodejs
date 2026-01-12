/**
 * Batch query request
 *
 * @since 2025-12-26
 */
export interface BatchQueryRequest {
  /**
   * Application ID
   */
  appId: string;

  /**
   * Merchant ID
   */
  merchantId: string;

  /**
   * Terminal serial number. SUNBAY provided financial POS device serial number
   */
  terminalSn: string;
}

