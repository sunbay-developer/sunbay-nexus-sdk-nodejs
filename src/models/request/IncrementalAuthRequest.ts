import { AuthAmount } from '../common/AuthAmount';
import type { PrintReceipt } from '../common/PrintReceipt';

/**
 * Incremental authorization request
 *
 * @since 2025-12-24
 */
export interface IncrementalAuthRequest {
  /**
   * Application ID
   */
  appId: string;

  /**
   * Merchant ID
   */
  merchantId: string;

  /**
   * Original authorization transaction ID to increase authorization amount. Either originalTransactionId or originalTransactionRequestId is required. If both are provided, originalTransactionId takes priority
   */
  originalTransactionId?: string;

  /**
   * Original authorization transaction request ID to increase authorization amount. Either originalTransactionId or originalTransactionRequestId is required. If both are provided, originalTransactionId takes priority
   */
  originalTransactionRequestId?: string;

  /**
   * Transaction request ID for this incremental authorization transaction. Unique ID to identify this incremental authorization request, used as API idempotency control field
   */
  transactionRequestId: string;

  /**
   * Amount information
   */
  amount: AuthAmount;

  /**
   * Product description. Should be a real description representing the product information, may be displayed on some payment App billing pages
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
   * Receipt print option. NONE: do not print; MERCHANT: merchant copy only; CUSTOMER: customer copy only; BOTH: merchant and customer copies. Default: "NONE"
   */
  printReceipt?: PrintReceipt;
}

