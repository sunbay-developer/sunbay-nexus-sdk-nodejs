import { BaseResponse, BaseResponseImpl } from '../common/BaseResponse';

/**
 * Void response
 *
 * @since 2025-12-24
 */
export interface VoidResponse extends BaseResponse {
  /**
   * SUNBAY Nexus transaction ID for this void transaction, used for subsequent queries and notifications
   */
  transactionId?: string;

  /**
   * Transaction request ID for this void, returned as-is from request
   */
  transactionRequestId?: string;

  /**
   * Original transaction ID
   */
  originalTransactionId?: string;

  /**
   * Original transaction request ID
   */
  originalTransactionRequestId?: string;
}

export class VoidResponseImpl extends BaseResponseImpl implements VoidResponse {
  public transactionId?: string;
  public transactionRequestId?: string;
  public originalTransactionId?: string;
  public originalTransactionRequestId?: string;
}

