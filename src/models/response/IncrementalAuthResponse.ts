import { BaseResponse, BaseResponseImpl } from '../common/BaseResponse';

/**
 * Incremental authorization response
 *
 * @since 2025-12-24
 */
export interface IncrementalAuthResponse extends BaseResponse {
  /**
   * SUNBAY Nexus transaction ID for this incremental authorization transaction, used for subsequent queries and notifications
   */
  transactionId?: string;

  /**
   * Transaction request ID for this incremental authorization, returned as-is from request
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

export class IncrementalAuthResponseImpl extends BaseResponseImpl implements IncrementalAuthResponse {
  public transactionId?: string;
  public transactionRequestId?: string;
  public originalTransactionId?: string;
  public originalTransactionRequestId?: string;
}

