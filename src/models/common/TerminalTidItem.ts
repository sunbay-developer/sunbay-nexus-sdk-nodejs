/**
 * TID information assigned by a payment processor to a terminal
 *
 * @since 2026-09-01
 */
export interface TerminalTidItem {
  /**
   * Payment channel code identifying the processor this TID belongs to
   */
  channelCode?: string;

  /**
   * Payment channel display name (for presentation only)
   */
  channelName?: string;

  /**
   * Terminal Identification Number (TID) assigned by the payment processor.
   * Note: this differs from the terminal serial number (sn)
   */
  tid?: string;
}
