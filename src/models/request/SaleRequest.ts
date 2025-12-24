import { SaleAmount } from '../common/SaleAmount';
import { PaymentMethodInfo } from '../common/PaymentMethodInfo';

/**
 * Sale transaction request
 *
 * @since 2025-12-24
 */
export interface SaleRequest {
  /**
   * Application ID
   */
  appId: string;

  /**
   * Merchant ID
   */
  merchantId: string;

  /**
   * Reference order ID for the sale transaction. Unique ID assigned by merchant system to identify this sale transaction, 6-32 characters, can only contain numbers, uppercase/lowercase letters, _-\|*
   */
  referenceOrderId: string;

  /**
   * Unique request identifier for this sale transaction. Used as the API idempotency key to ensure that retrying the
   * same request does not create multiple transactions. Can only contain letters, digits, underscore (_) and hyphen (-),
   * with a maximum length of 64 characters. Each request must use a value that has not been used before.
   */
  transactionRequestId: string;

  /**
   * Amount information
   */
  amount: SaleAmount;

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
}

