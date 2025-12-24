import { BaseResponse, BaseResponseImpl } from '../common/BaseResponse';

/**
 * Abort response
 *
 * @since 2025-12-24
 */
export interface AbortResponse extends BaseResponse {
  /**
   * Aborted transaction's SUNBAY Nexus transaction ID
   */
  originalTransactionId?: string;

  /**
   * Aborted transaction's request ID (only returned when provided in request)
   */
  originalTransactionRequestId?: string;
}

export class AbortResponseImpl extends BaseResponseImpl implements AbortResponse {
  public originalTransactionId?: string;
  public originalTransactionRequestId?: string;
}

