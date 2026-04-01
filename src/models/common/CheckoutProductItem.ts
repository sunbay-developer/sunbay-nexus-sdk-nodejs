/**
 * Single product row in checkout productList. If sent, sum of amount × num must equal amount.orderAmount.
 *
 * @since 2026-02-02
 */
export interface CheckoutProductItem {
  /**
   * Product amount (smallest currency unit)
   */
  amount: number;

  /**
   * Product name
   */
  name: string;

  /**
   * Quantity
   */
  num: number;
}
