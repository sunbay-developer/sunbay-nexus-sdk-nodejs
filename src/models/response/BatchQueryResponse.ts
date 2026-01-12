import { BaseResponse, BaseResponseImpl } from '../common/BaseResponse';
import { BatchQueryItem } from '../common/BatchQueryItem';

/**
 * Batch query response
 *
 * @since 2025-12-26
 */
export interface BatchQueryResponse extends BaseResponse {
  /**
   * Batch list, statistics grouped by channel code and price currency
   */
  batchList?: BatchQueryItem[];
}

export class BatchQueryResponseImpl extends BaseResponseImpl implements BatchQueryResponse {
  public batchList?: BatchQueryItem[];
}

