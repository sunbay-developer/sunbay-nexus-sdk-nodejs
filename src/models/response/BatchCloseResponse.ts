import { BaseResponse, BaseResponseImpl } from '../common/BaseResponse';
import { BatchTotalAmount } from '../common/BatchTotalAmount';

/**
 * Batch close response
 *
 * @since 2025-12-24
 */
export interface BatchCloseResponse extends BaseResponse {
  /**
   * Batch number
   */
  batchNo?: string;

  /**
   * Terminal serial number
   */
  terminalSn?: string;

  /**
   * Batch close time, format: yyyy-MM-DDTHH:mm:ss+TIMEZONE (ISO 8601)
   */
  closeTime?: string;

  /**
   * Number of transactions in the batch
   */
  transactionCount?: number;

  /**
   * Total amount of the batch
   */
  totalAmount?: BatchTotalAmount;
}

export class BatchCloseResponseImpl extends BaseResponseImpl implements BatchCloseResponse {
  public batchNo?: string;
  public terminalSn?: string;
  public closeTime?: string;
  public transactionCount?: number;
  public totalAmount?: BatchTotalAmount;
}

