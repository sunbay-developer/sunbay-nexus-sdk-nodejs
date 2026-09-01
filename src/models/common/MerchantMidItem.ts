/**
 * MID information assigned by a payment processor
 *
 * @since 2026-09-01
 */
export interface MerchantMidItem {
  /**
   * Payment channel code identifying the processor this MID belongs to
   */
  channelCode?: string;

  /**
   * Payment channel display name (for presentation only)
   */
  channelName?: string;

  /**
   * Merchant Identification Number (MID) assigned by the payment processor.
   * Note: this differs from the SUNBAY platform merchantId
   */
  mid?: string;
}
