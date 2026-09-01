/**
 * Batch close list request
 * <p>
 * Query closed (settled) batch records. You can filter results by payment channel
 * and time range. If no time range is specified, the API returns data from the last
 * 7 days by default. The maximum query span is 30 days.
 * </p>
 *
 * @since 2026-09-01
 */
export interface BatchCloseListRequest {
  /**
   * Application ID
   */
  appId: string;

  /**
   * Merchant ID
   */
  merchantId: string;

  /**
   * Payment terminal serial number. The payment terminal device serial number provided by SUNBAY
   */
  terminalSn: string;

  /**
   * Payment channel code. If specified, only returns batches for this channel
   */
  channelCode?: string;

  /**
   * Query start time, ISO 8601 format.
   * startTime and endTime must both be present.
   * The time span cannot exceed 30 days.
   * If not specified, defaults to the last 7 days
   */
  startTime?: string;

  /**
   * Query end time, ISO 8601 format.
   * startTime and endTime must both be present.
   * The time span cannot exceed 30 days.
   * If not specified, defaults to the last 7 days
   */
  endTime?: string;
}
