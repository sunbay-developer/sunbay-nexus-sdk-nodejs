import { RefundAmount } from '../common/RefundAmount';
import { PaymentMethodInfo } from '../common/PaymentMethodInfo';
import type { PrintReceipt } from '../common/PrintReceipt';

/**
 * Refund request
 *
 * @since 2025-12-24
 */
export interface RefundRequest {
  /**
   * Application ID
   */
  appId: string;

  /**
   * Merchant ID
   */
  merchantId: string;

  /**
   * Original transaction ID to refund. Either originalTransactionId or originalTransactionRequestId is required for refund with reference. Both must be empty for refund without reference. If both are provided, originalTransactionId takes priority
   */
  originalTransactionId?: string;

  /**
   * Original transaction request ID to refund. Either originalTransactionId or originalTransactionRequestId is required for refund with reference. Both must be empty for refund without reference. If both are provided, originalTransactionId takes priority
   */
  originalTransactionRequestId?: string;

  /**
   * Reference order ID. Required for refund without reference, used to associate business records in merchant system. Not required for refund with reference, system will automatically associate with original transaction's reference order ID
   */
  referenceOrderId?: string;

  /**
   * Transaction request ID for this refund transaction. Unique ID to identify this refund request, used as API idempotency control field
   */
  transactionRequestId: string;

  /**
   * Amount information
   */
  amount: RefundAmount;

  /**
   * Payment method information. Only available for refund without reference. Optional, recommended to omit for maximum flexibility
   */
  paymentMethod?: PaymentMethodInfo;

  /**
   * Refund reason description. Should be a real description representing the refund reason
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

  /**
   * Transaction expiration time, format: yyyy-MM-DDTHH:mm:ss+TIMEZONE (ISO 8601). Transaction will be closed if payment is not completed after this time. Minimum 3 minutes, maximum 1 day, default 1 day if not provided. Only used for refund without reference (requires customer operation on terminal), not needed for refund with reference
   */
  timeExpire?: string;

  /**
   * Receipt print option. NONE: do not print; MERCHANT: merchant copy only; CUSTOMER: customer copy only; BOTH: merchant and customer copies. Default: "NONE"
   */
  printReceipt?: PrintReceipt;
}

