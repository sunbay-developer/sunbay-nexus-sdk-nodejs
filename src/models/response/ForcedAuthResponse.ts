import { BaseResponse, BaseResponseImpl } from '../common/BaseResponse';

/**
 * Forced authorization response
 *
 * @since 2025-12-24
 */
export interface ForcedAuthResponse extends BaseResponse {
  /**
   * SUNBAY Nexus transaction ID for this forced authorization transaction, used for subsequent queries and notifications
   */
  transactionId?: string;

  /**
   * Reference order ID, returned as-is from request
   */
  referenceOrderId?: string;

  /**
   * Transaction request ID, returned as-is from request
   */
  transactionRequestId?: string;
}

export class ForcedAuthResponseImpl extends BaseResponseImpl implements ForcedAuthResponse {
  public transactionId?: string;
  public referenceOrderId?: string;
  public transactionRequestId?: string;
}

