import { BaseResponse, BaseResponseImpl } from '../common/BaseResponse';

/**
 * Refund response
 *
 * @since 2025-12-24
 */
export interface RefundResponse extends BaseResponse {
  /**
   * SUNBAY Nexus transaction ID for this refund transaction, used for subsequent queries and notifications
   */
  transactionId?: string;

  /**
   * Reference order ID (same as original transaction for refund with reference, new refund reference order ID for refund without reference)
   */
  referenceOrderId?: string;

  /**
   * Transaction request ID for this refund, returned as-is from request
   */
  transactionRequestId?: string;

  /**
   * Original transaction ID (only returned for refund with reference)
   */
  originalTransactionId?: string;

  /**
   * Original transaction request ID (only returned for refund with reference)
   */
  originalTransactionRequestId?: string;
}

export class RefundResponseImpl extends BaseResponseImpl implements RefundResponse {
  public transactionId?: string;
  public referenceOrderId?: string;
  public transactionRequestId?: string;
  public originalTransactionId?: string;
  public originalTransactionRequestId?: string;
}

