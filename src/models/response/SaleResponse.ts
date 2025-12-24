import { BaseResponse, BaseResponseImpl } from '../common/BaseResponse';

/**
 * Sale transaction response
 *
 * @since 2025-12-24
 */
export interface SaleResponse extends BaseResponse {
  /**
   * SUNBAY Nexus transaction ID for this sale transaction, used for subsequent queries and notifications
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
 * Sale response implementation class
 */
export class SaleResponseImpl extends BaseResponseImpl implements SaleResponse {
  public transactionId?: string;
  public referenceOrderId?: string;
  public transactionRequestId?: string;
}

