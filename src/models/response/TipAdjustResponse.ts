import { BaseResponse, BaseResponseImpl } from '../common/BaseResponse';

/**
 * Tip adjust response
 *
 * @since 2025-12-24
 */
export interface TipAdjustResponse extends BaseResponse {
  /**
   * Original transaction's SUNBAY Nexus transaction ID (only returned when provided in request)
   */
  originalTransactionId?: string;

  /**
   * Original transaction's request ID (only returned when provided in request)
   */
  originalTransactionRequestId?: string;

  /**
   * Adjusted tip amount, in smallest currency unit (e.g., cents for USD, fen for CNY), returned as-is from request
   */
  tipAmount?: number;
}

export class TipAdjustResponseImpl extends BaseResponseImpl implements TipAdjustResponse {
  public originalTransactionId?: string;
  public originalTransactionRequestId?: string;
  public tipAmount?: number;
}

