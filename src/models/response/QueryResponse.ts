import { BaseResponse, BaseResponseImpl } from '../common/BaseResponse';
import { Amount } from '../common/Amount';

/**
 * Query response
 *
 * @since 2025-12-24
 */
export interface QueryResponse extends BaseResponse {
  /**
   * SUNBAY Nexus transaction ID
   */
  transactionId?: string;

  /**
   * Transaction request ID
   */
  transactionRequestId?: string;

  /**
   * Reference order ID (only returned for transactions with reference order ID such as sale, authorization, forced authorization)
   */
  referenceOrderId?: string;

  /**
   * Transaction status: INITIAL(initial)/PROCESSING(processing)/SUCCESS(success)/FAIL(failed)/CLOSED(closed)
   */
  transactionStatus?: string;

  /**
   * Transaction type: AUTH(authorization)/SALE(sale)/FORCED_AUTH(forced authorization)/INCREMENTAL(incremental authorization)/POST_AUTH(post authorization)/VOID(void)/REFUND(refund)
   */
  transactionType?: string;

  /**
   * Transaction amount details
   */
  amount?: Amount;

  /**
   * Transaction creation time, format: yyyy-MM-DDTHH:mm:ss+TIMEZONE (ISO 8601)
   */
  createTime?: string;

  /**
   * Transaction completion time, format: yyyy-MM-DDTHH:mm:ss+TIMEZONE (ISO 8601)
   */
  completeTime?: string;

  /**
   * Masked card number (first 6 digits + **** + last 4 digits)
   */
  maskedPan?: string;

  /**
   * Card network type: CREDIT(credit card)/DEBIT(debit card)/EBT/EGC/UNKNOWN
   */
  cardNetworkType?: string;

  /**
   * Payment method ID
   */
  paymentMethodId?: string;

  /**
   * Sub payment method ID
   */
  subPaymentMethodId?: string;

  /**
   * Batch number
   */
  batchNo?: string;

  /**
   * Voucher number
   */
  voucherNo?: string;

  /**
   * System trace number
   */
  stan?: string;

  /**
   * Reference number
   */
  rrn?: string;

  /**
   * Authorization code
   */
  authCode?: string;

  /**
   * Entry mode: MANUAL(manual input)/SWIPE(swipe)/FALLBACK_SWIPE(swipe fallback)/CONTACT(contact)/CONTACTLESS(contactless)
   */
  entryMode?: string;

  /**
   * Authentication method: NOT_AUTHENTICATED(not authenticated)/PIN/OFFLINE_PIN/BY_PASS/SIGNATURE
   */
  authenticationMethod?: string;

  /**
   * Transaction result code
   */
  transactionResultCode?: string;

  /**
   * Transaction result message
   */
  transactionResultMsg?: string;

  /**
   * Terminal serial number
   */
  terminalSn?: string;

  /**
   * Product description
   */
  description?: string;

  /**
   * Additional data, returned as-is
   */
  attach?: string;
}

/**
 * Query response implementation class
 */
export class QueryResponseImpl extends BaseResponseImpl implements QueryResponse {
  public transactionId?: string;
  public transactionRequestId?: string;
  public referenceOrderId?: string;
  public transactionStatus?: string;
  public transactionType?: string;
  public amount?: Amount;
  public createTime?: string;
  public completeTime?: string;
  public maskedPan?: string;
  public cardNetworkType?: string;
  public paymentMethodId?: string;
  public subPaymentMethodId?: string;
  public batchNo?: string;
  public voucherNo?: string;
  public stan?: string;
  public rrn?: string;
  public authCode?: string;
  public entryMode?: string;
  public authenticationMethod?: string;
  public transactionResultCode?: string;
  public transactionResultMsg?: string;
  public terminalSn?: string;
  public description?: string;
  public attach?: string;
}

