/**
 * Void request
 *
 * @since 2025-12-24
 */
export interface VoidRequest {
  /**
   * Application ID
   */
  appId: string;

  /**
   * Merchant ID
   */
  merchantId: string;

  /**
   * Original transaction ID to void. Either originalTransactionId or originalTransactionRequestId is required. If both are provided, originalTransactionId takes priority
   */
  originalTransactionId?: string;

  /**
   * Original transaction request ID to void. Either originalTransactionId or originalTransactionRequestId is required. If both are provided, originalTransactionId takes priority
   */
  originalTransactionRequestId?: string;

  /**
   * Transaction request ID for this void transaction. Unique ID to identify this void request, used as API idempotency control field
   */
  transactionRequestId: string;

  /**
   * Void reason description
   */
  description: string;

  /**
   * Terminal serial number. SUNBAY provided financial POS device serial number for reading bank cards and processing PIN security operations
   */
  terminalSn: string;

  /**
   * Additional data, returned as-is, recommended to use JSON format
   */
  attach?: string;

  /**
   * Asynchronous notification URL
   */
  notifyUrl?: string;
}

