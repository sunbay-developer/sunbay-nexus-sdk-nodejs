import type { CheckoutAddress } from '../common/CheckoutAddress';
import type { CheckoutAmount } from '../common/CheckoutAmount';
import type { CheckoutProductItem } from '../common/CheckoutProductItem';

/**
 * Online wallet payment method for {@code POST /v1/checkout/sale}.
 */
export type CheckoutWalletPaymentMethod = 'GOOGLE_PAY' | 'APPLE_PAY';

/**
 * Request for POST /v1/checkout/sale (online direct payment, e.g. Google Pay / Apple Pay).
 *
 * @see https://docs.sunbay.dev/en/refspec/online/direct-payment
 * @since 2026-02-02
 */
export interface CheckoutDirectPaymentRequest {
  appId: string;
  merchantId: string;
  transactionRequestId: string;
  referenceOrderId: string;
  description: string;
  amount: CheckoutAmount;
  productList?: CheckoutProductItem[];
  /**
   * e.g. GOOGLE_PAY, APPLE_PAY. Send with {@link cardEncryptedData} from the wallet.
   */
  paymentMethod: CheckoutWalletPaymentMethod | string;
  /**
   * Wallet encrypted token JSON string; required when paymentMethod is GOOGLE_PAY or APPLE_PAY
   */
  cardEncryptedData?: string;
  customerEmail?: string;
  customerName?: string;
  billingAddress?: CheckoutAddress;
  shippingAddress?: CheckoutAddress;
  notifyUrl?: string;
  merchantReturnUrl?: string;
}
