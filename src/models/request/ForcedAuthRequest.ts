import { AuthAmount } from '../common/AuthAmount';
import { PaymentMethodInfo } from '../common/PaymentMethodInfo';
import type { PrintReceipt } from '../common/PrintReceipt';

/**
 * Forced authorization request
 *
 * @since 2025-12-24
 */
export interface ForcedAuthRequest {
  /**
   * Application ID
   */
  appId: string;

  /**
   * Merchant ID
   */
  merchantId: string;

  /**
   * Reference order ID for the forced authorization transaction. Unique ID assigned by merchant system to identify this forced authorization transaction, 6-32 characters, can only contain numbers, uppercase/lowercase letters, _-\|*
   */
  referenceOrderId: string;

  /**
   * Transaction request ID for this forced authorization transaction. Unique ID to identify this forced authorization transaction request, used as API idempotency control field
   */
  transactionRequestId: string;

  /**
   * Amount information
   */
  amount: AuthAmount;

  /**
   * Payment method information. Optional, recommended to omit for maximum flexibility
   */
  paymentMethod?: PaymentMethodInfo;

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
   * Transaction expiration time, format: yyyy-MM-DDTHH:mm:ss+TIMEZONE (ISO 8601). Transaction will be closed if payment is not completed after this time. Minimum 3 minutes, maximum 1 day, default 1 day if not provided
   */
  timeExpire?: string;

  /**
   * Receipt print option. NONE: do not print; MERCHANT: merchant copy only; CUSTOMER: customer copy only; BOTH: merchant and customer copies. Default: "NONE"
   */
  printReceipt?: PrintReceipt;
}

