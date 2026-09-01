import type { BatchClosePrintReceipt } from '../common/BatchClosePrintReceipt';

/**
 * Batch close request
 *
 * @since 2025-12-24
 */
export interface BatchCloseRequest {
  /**
   * Application ID
   */
  appId: string;

  /**
   * Merchant ID
   */
  merchantId: string;

  /**
   * Batch close request unique identifier. Unique ID to identify this batch close request, used as API idempotency control field, can be used later to query batch close results
   */
  transactionRequestId: string;

  /**
   * Terminal serial number. SUNBAY provided financial POS device serial number for reading bank cards and processing PIN security operations
   */
  terminalSn: string;

  /**
   * Payment channel code
   */
  channelCode: string;

  /**
   * Batch close description
   */
  description: string;

  /**
   * Additional data, returned as-is, recommended to use JSON format
   */
  attach?: string;

  /**
   * Batch close report print option. Controls what report is printed after batch close.
   * TOTAL: summary only; DETAIL: transaction details only; BOTH: summary + details; NONE: no report; AUTO: use SUNBAY platform configuration.
   * When not provided, the SUNBAY platform configuration is used by default.
   */
  printReceipt?: BatchClosePrintReceipt;
}

