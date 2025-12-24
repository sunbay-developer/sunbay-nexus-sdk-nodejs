/**
 * Tip adjust request
 *
 * @since 2025-12-24
 */
export interface TipAdjustRequest {
  /**
   * Application ID
   */
  appId: string;

  /**
   * Merchant ID
   */
  merchantId: string;

  /**
   * Terminal serial number
   */
  terminalSn: string;

  /**
   * Original transaction ID to adjust tip. Either originalTransactionId or originalTransactionRequestId is required. If both are provided, originalTransactionId takes priority
   */
  originalTransactionId?: string;

  /**
   * Original transaction request ID to adjust tip. Either originalTransactionId or originalTransactionRequestId is required. If both are provided, originalTransactionId takes priority
   */
  originalTransactionRequestId?: string;

  /**
   * New tip amount after adjustment, in basic currency unit
   */
  tipAmount: number;

  /**
   * Additional data, returned as-is, recommended to use JSON format
   */
  attach?: string;
}

