import { BaseResponse, BaseResponseImpl } from '../common/BaseResponse';

/**
 * Response for expire checkout session (POST /v1/checkout/expire-session).
 *
 * @since 2026-08-03
 */
export interface ExpireCheckoutSessionResponse extends BaseResponse {
  /**
   * Echo of the session ID from the request
   */
  sessionId?: string;

  /**
   * Session status after expiration, always "EXPIRED"
   */
  sessionStatus?: string;

  /**
   * SUNBAY transaction ID associated with the session
   */
  transactionId?: string;

  /**
   * Transaction request ID used when creating the session
   */
  transactionRequestId?: string;

  /**
   * Session expiration time in ISO 8601 format
   */
  expiredAt?: string;
}

export class ExpireCheckoutSessionResponseImpl
  extends BaseResponseImpl
  implements ExpireCheckoutSessionResponse
{
  public sessionId?: string;
  public sessionStatus?: string;
  public transactionId?: string;
  public transactionRequestId?: string;
  public expiredAt?: string;
}
