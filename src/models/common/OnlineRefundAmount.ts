/**
 * Online refund amount information (smallest currency unit).
 *
 * @since 2026-06-29
 */
export interface OnlineRefundAmount {
  /**
   * Price currency (ISO 4217)
   */
  priceCurrency: string;

  /**
   * Total transaction amount (smallest currency unit)
   */
  totalAmount?: number;

  /**
   * Order amount (smallest currency unit)
   */
  orderAmount?: number;

  /**
   * Tax amount (smallest currency unit)
   */
  taxAmount?: number;

  /**
   * Surcharge amount (smallest currency unit)
   */
  surchargeAmount?: number;

  /**
   * Tip amount (smallest currency unit)
   */
  tipAmount?: number;
}
