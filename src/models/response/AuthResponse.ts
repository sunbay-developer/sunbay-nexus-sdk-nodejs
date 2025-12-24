import { BaseResponse, BaseResponseImpl } from '../common/BaseResponse';

/**
 * Authorization response
 *
 * @since 2025-12-24
 */
export interface AuthResponse extends BaseResponse {
  /**
   * SUNBAY Nexus transaction ID for this authorization transaction, used for subsequent queries, notifications, and post authorization/incremental authorization operations
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

/**
 * Auth response implementation class
 */
export class AuthResponseImpl extends BaseResponseImpl implements AuthResponse {
  public transactionId?: string;
  public referenceOrderId?: string;
  public transactionRequestId?: string;
}

