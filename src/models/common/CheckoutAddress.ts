/**
 * Billing or shipping address for online checkout (direct payment).
 *
 * @since 2026-02-02
 */
export interface CheckoutAddress {
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  countryCode?: string;
}
