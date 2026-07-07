import { BaseResponse, BaseResponseImpl } from '../common/BaseResponse';
import { OnlineRefundAmount } from '../common/OnlineRefundAmount';

/**
 * Online refund response (POST /v1/checkout/refund).
 *
 * @since 2026-06-29
 */
export interface OnlineRefundResponse extends BaseResponse {
  /**
   * SUNBAY Nexus transaction ID for this refund transaction
   */
  transactionId?: string;

  /**
   * Transaction request ID, returned as-is from request
   */
  transactionRequestId?: string;

  /**
   * Original transaction ID
   */
  originalTransactionId?: string;

  /**
   * Transaction status: INITIAL(I)/PROCESSING(P)/SUCCESS(S)/FAIL(F)/CLOSED(C)
   */
  transactionStatus?: string;

  /**
   * Transaction type, fixed as REFUND
   */
  transactionType?: string;

  /**
   * Refund amount information (smallest currency unit)
   */
  amount?: OnlineRefundAmount;

  /**
   * Refund creation time, ISO 8601 format
   */
  createTime?: string;

  /**
   * Refund completion time, returned when transaction reaches terminal state (S/F). ISO 8601 format
   */
  completeTime?: string;

  /**
   * Transaction result code
   */
  transactionResultCode?: string;

  /**
   * Transaction result message
   */
  transactionResultMsg?: string;

  /**
   * Refund description (returned as-is from request)
   */
  description?: string;
}

export class OnlineRefundResponseImpl extends BaseResponseImpl implements OnlineRefundResponse {
  public transactionId?: string;
  public transactionRequestId?: string;
  public originalTransactionId?: string;
  public transactionStatus?: string;
  public transactionType?: string;
  public amount?: OnlineRefundAmount;
  public createTime?: string;
  public completeTime?: string;
  public transactionResultCode?: string;
  public transactionResultMsg?: string;
  public description?: string;
}
