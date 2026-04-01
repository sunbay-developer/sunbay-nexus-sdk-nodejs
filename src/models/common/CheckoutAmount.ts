/**
 * Checkout amount breakdown. Payable total = orderAmount + taxAmount + surchargeAmount.
 * Amounts are in the smallest currency unit (integer).
 *
 * @since 2026-02-02
 */
export interface CheckoutAmount {
  /**
   * Order amount (smallest currency unit)
   */
  orderAmount: number;

  /**
   * Tax amount (optional)
   */
  taxAmount?: number;

  /**
   * Surcharge amount (optional)
   */
  surchargeAmount?: number;

  /**
   * Price currency (ISO 4217)
   */
  priceCurrency: string;
}
