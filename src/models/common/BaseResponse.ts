import { ApiConstants } from '../../constants/ApiConstants';

/**
 * Base response
 *
 * @since 2025-12-24
 */
export interface BaseResponse {
  /**
   * Response code, 0 means success
   */
  code?: string;

  /**
   * Response message
   */
  msg?: string;

  /**
   * Trace ID for troubleshooting
   */
  traceId?: string;

  /**
   * Check if response is successful
   *
   * @return true if success
   */
  isSuccess?(): boolean;
}

/**
 * Base response implementation
 */
export class BaseResponseImpl implements BaseResponse {
  public code?: string;
  public msg?: string;
  public traceId?: string;

  public isSuccess(): boolean {
    return ApiConstants.RESPONSE_SUCCESS_CODE === this.code;
  }
}

