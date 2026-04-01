import { BaseResponse, BaseResponseImpl } from '../common/BaseResponse';

/**
 * Response for online direct payment (POST /v1/checkout/sale).
 *
 * @since 2026-02-02
 */
export interface CheckoutDirectPaymentResponse extends BaseResponse {
  transactionId?: string;
  referenceOrderId?: string;
  transactionRequestId?: string;
}

export class CheckoutDirectPaymentResponseImpl
  extends BaseResponseImpl
  implements CheckoutDirectPaymentResponse
{
  public transactionId?: string;
  public referenceOrderId?: string;
  public transactionRequestId?: string;
}
