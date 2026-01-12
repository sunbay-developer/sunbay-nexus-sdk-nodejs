/**
 * Batch close request
 *
 * @since 2025-12-24
 */
export interface BatchCloseRequest {
  /**
   * Application ID
   */
  appId: string;

  /**
   * Merchant ID
   */
  merchantId: string;

  /**
   * Batch close request unique identifier. Unique ID to identify this batch close request, used as API idempotency control field, can be used later to query batch close results
   */
  transactionRequestId: string;

  /**
   * Terminal serial number. SUNBAY provided financial POS device serial number for reading bank cards and processing PIN security operations
   */
  terminalSn: string;

  /**
   * Payment channel code
   */
  channelCode: string;

  /**
   * Batch close description
   */
  description: string;

  /**
   * Additional data, returned as-is, recommended to use JSON format
   */
  attach?: string;
}

