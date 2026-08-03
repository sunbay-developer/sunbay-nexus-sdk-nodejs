/**
 * Request for POST /v1/checkout/expire-session (Expire/close a checkout session).
 *
 * @see https://docs.sunbay-dev.com/zh/refspec/online/checkout/expire-session
 * @since 2026-08-03
 */
export interface ExpireCheckoutSessionRequest {
  appId: string;
  merchantId: string;
  sessionId: string;
  reason?: string;
}
