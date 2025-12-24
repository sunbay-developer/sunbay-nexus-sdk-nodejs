import { BaseResponse, BaseResponseImpl } from '../common/BaseResponse';

/**
 * Post authorization response
 *
 * @since 2025-12-24
 */
export interface PostAuthResponse extends BaseResponse {
  /**
   * SUNBAY Nexus transaction ID for this post authorization transaction, used for subsequent queries and notifications
   */
  transactionId?: string;

  /**
   * Transaction request ID for this post authorization, returned as-is from request
   */
  transactionRequestId?: string;

  /**
   * Original authorization transaction ID, returned as-is from request (only returned when provided in request)
   */
  originalTransactionId?: string;

  /**
   * Original authorization transaction request ID, returned as-is from request (only returned when provided in request)
   */
  originalTransactionRequestId?: string;
}

export class PostAuthResponseImpl extends BaseResponseImpl implements PostAuthResponse {
  public transactionId?: string;
  public transactionRequestId?: string;
  public originalTransactionId?: string;
  public originalTransactionRequestId?: string;
}

