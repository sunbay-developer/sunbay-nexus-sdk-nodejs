import { OnlineRefundAmount } from '../common/OnlineRefundAmount';

/**
 * Online refund request (POST /v1/checkout/refund).
 *
 * Either {@code originalTransactionId} or {@code originalTransactionRequestId} must be provided
 * to identify the original transaction to refund.
 *
 * @since 2026-06-29
 */
export interface OnlineRefundRequest {
  /**
   * Application ID
   */
  appId: string;

  /**
   * Merchant ID
   */
  merchantId: string;

  /**
   * Transaction request ID for this refund transaction.
   * Unique ID to identify this refund request, used as API idempotency control field.
   * Only letters, numbers, underscores and hyphens are supported, max length 64.
   */
  transactionRequestId: string;

  /**
   * Original transaction ID to refund (SUNBAY transaction ID from the payment response).
   * Either originalTransactionId or originalTransactionRequestId is required.
   * If both are provided, originalTransactionId takes priority.
   */
  originalTransactionId?: string;

  /**
   * Original transaction request ID to refund.
   * Either originalTransactionId or originalTransactionRequestId is required.
   * If both are provided, originalTransactionId takes priority.
   */
  originalTransactionRequestId?: string;

  /**
   * Refund amount information.
   * If totalAmount is provided, system will validate it equals orderAmount + taxAmount + surchargeAmount + tipAmount.
   */
  amount?: OnlineRefundAmount;

  /**
   * Refund description
   */
  description?: string;

  /**
   * Additional data, returned as-is, can be used to record refund reason or other custom information
   */
  attach?: string;

  /**
   * Asynchronous notification URL (Webhook). Must be a publicly accessible HTTPS address if provided.
   */
  notifyUrl?: string;
}
