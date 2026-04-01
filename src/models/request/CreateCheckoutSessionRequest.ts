import type { CheckoutAmount } from '../common/CheckoutAmount';
import type { CheckoutProductItem } from '../common/CheckoutProductItem';

/**
 * Request for POST /v1/checkout/create-session (Hosted Payment Page).
 *
 * @see https://docs.sunbay.dev/en/refspec/online/checkout/checkout-api-integration
 * @since 2026-02-02
 */
export interface CreateCheckoutSessionRequest {
  appId: string;
  transactionRequestId: string;
  referenceOrderId: string;
  merchantId: string;
  amount: CheckoutAmount;
  description: string;
  productList?: CheckoutProductItem[];
  collectBillingAddress?: boolean;
  collectShippingAddress?: boolean;
  merchantReturnUrl?: string;
  notifyUrl?: string;
}
