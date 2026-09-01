import { BaseResponse, BaseResponseImpl } from '../common/BaseResponse';
import { BatchCloseListItem } from '../common/BatchCloseListItem';

/**
 * Batch close list response
 *
 * @since 2026-09-01
 */
export interface BatchCloseListResponse extends BaseResponse {
  /**
   * List of closed batch records
   */
  batchCloseList?: BatchCloseListItem[];
}

export class BatchCloseListResponseImpl extends BaseResponseImpl implements BatchCloseListResponse {
  public batchCloseList?: BatchCloseListItem[];
}
