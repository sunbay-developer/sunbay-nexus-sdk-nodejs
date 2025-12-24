/**
 * Query request
 *
 * @since 2025-12-24
 */
export interface QueryRequest {
  /**
   * Application ID
   */
  appId: string;

  /**
   * Merchant ID
   */
  merchantId: string;

  /**
   * SUNBAY Nexus transaction ID. Either transactionId or transactionRequestId is required. If both are provided, transactionId takes priority
   */
  transactionId?: string;

  /**
   * Transaction request ID. Either transactionId or transactionRequestId is required. If both are provided, transactionId takes priority
   */
  transactionRequestId?: string;
}

