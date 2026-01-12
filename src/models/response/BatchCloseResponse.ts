import { BaseResponse, BaseResponseImpl } from '../common/BaseResponse';

/**
 * Batch close response
 * All amount fields are in the smallest currency unit (e.g., cents for USD, fen for CNY)
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
   * Batch time, format: yyyy-MM-DDTHH:mm:ss+TIMEZONE (ISO 8601)
   */
  batchTime?: string;

  /**
   * Number of transactions in the batch
   */
  transactionCount?: number;

  /**
   * Price currency (ISO 4217)
   */
  priceCurrency?: string;

  /**
   * Net amount, using smallest currency unit (minor units)
   */
  netAmount?: number;

  /**
   * Tip amount, using smallest currency unit (minor units)
   */
  tipAmount?: number;

  /**
   * Surcharge amount, using smallest currency unit (minor units)
   */
  surchargeAmount?: number;

  /**
   * Tax amount, using smallest currency unit (minor units)
   */
  taxAmount?: number;
}

export class BatchCloseResponseImpl extends BaseResponseImpl implements BatchCloseResponse {
  public batchNo?: string;
  public terminalSn?: string;
  public batchTime?: string;
  public transactionCount?: number;
  public priceCurrency?: string;
  public netAmount?: number;
  public tipAmount?: number;
  public surchargeAmount?: number;
  public taxAmount?: number;
}

