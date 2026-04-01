import { BaseResponse, BaseResponseImpl } from '../common/BaseResponse';

/**
 * Response for create checkout session (POST /v1/checkout/create-session).
 *
 * @since 2026-02-02
 */
export interface CreateCheckoutSessionResponse extends BaseResponse {
  /**
   * URL to redirect the customer to the Hosted Payment Page
   */
  checkoutUrl?: string;

  /**
   * Session expiry time (e.g. ISO 8601); session lifetime is 30 minutes from a successful response
   */
  expiresAt?: string;
}

export class CreateCheckoutSessionResponseImpl
  extends BaseResponseImpl
  implements CreateCheckoutSessionResponse
{
  public checkoutUrl?: string;
  public expiresAt?: string;
}
