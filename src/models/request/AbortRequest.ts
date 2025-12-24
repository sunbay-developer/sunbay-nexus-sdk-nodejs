/**
 * Abort request
 *
 * @since 2025-12-24
 */
export interface AbortRequest {
  /**
   * Application ID
   */
  appId: string;

  /**
   * Merchant ID
   */
  merchantId: string;

  /**
   * Original transaction ID to abort. Either originalTransactionId or originalTransactionRequestId is required. If both are provided, originalTransactionId takes priority
   */
  originalTransactionId?: string;

  /**
   * Original transaction request ID to abort. Either originalTransactionId or originalTransactionRequestId is required. If both are provided, originalTransactionId takes priority
   */
  originalTransactionRequestId?: string;

  /**
   * Terminal serial number. SUNBAY provided financial POS device serial number for reading bank cards and processing PIN security operations
   */
  terminalSn: string;

  /**
   * Abort reason description
   */
  description: string;

  /**
   * Additional data, returned as-is, recommended to use JSON format
   */
  attach?: string;
}

