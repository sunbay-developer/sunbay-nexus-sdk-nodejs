/**
 * API constants
 *
 * @since 2025-12-24
 */
export class ApiConstants {
  /**
   * Parameter error code (C17)
   */
  public static readonly ERROR_CODE_PARAMETER_ERROR = 'C17';

  /**
   * HTTP methods
   */
  public static readonly HTTP_METHOD_POST = 'POST';
  public static readonly HTTP_METHOD_GET = 'GET';

  /**
   * HTTP status codes
   */
  public static readonly HTTP_STATUS_OK_START = 200;
  public static readonly HTTP_STATUS_OK_END = 300;
  public static readonly HTTP_STATUS_CLIENT_ERROR_START = 400;
  public static readonly HTTP_STATUS_CLIENT_ERROR_END = 500;
  public static readonly HTTP_STATUS_SERVER_ERROR_START = 500;

  /**
   * Response success code
   */
  public static readonly RESPONSE_SUCCESS_CODE = '0';

  /**
   * Authorization header prefix
   */
  public static readonly AUTHORIZATION_BEARER_PREFIX = 'Bearer ';

  /**
   * JSON field names
   */
  public static readonly JSON_FIELD_CODE = 'code';
  public static readonly JSON_FIELD_MSG = 'msg';
  public static readonly JSON_FIELD_DATA = 'data';
  public static readonly JSON_FIELD_TRACE_ID = 'traceId';

  /**
   * Getter method name prefix length
   */
  public static readonly GETTER_METHOD_PREFIX_LENGTH = 3;

  /**
   * Semi-integration API path prefix
   */
  public static readonly SEMI_INTEGRATION_PREFIX = '/v1/semi-integration';

  /**
   * Common API path prefix
   */
  public static readonly COMMON_PREFIX = '/v1';

  /**
   * Semi-integration transaction API paths
   */
  public static readonly PATH_SALE = ApiConstants.SEMI_INTEGRATION_PREFIX + '/transaction/sale';
  public static readonly PATH_AUTH = ApiConstants.SEMI_INTEGRATION_PREFIX + '/transaction/auth';
  public static readonly PATH_FORCED_AUTH =
    ApiConstants.SEMI_INTEGRATION_PREFIX + '/transaction/forced-auth';
  public static readonly PATH_INCREMENTAL_AUTH =
    ApiConstants.SEMI_INTEGRATION_PREFIX + '/transaction/incremental-auth';
  public static readonly PATH_POST_AUTH =
    ApiConstants.SEMI_INTEGRATION_PREFIX + '/transaction/post-auth';
  public static readonly PATH_REFUND = ApiConstants.SEMI_INTEGRATION_PREFIX + '/transaction/refund';
  public static readonly PATH_VOID = ApiConstants.SEMI_INTEGRATION_PREFIX + '/transaction/void';
  public static readonly PATH_ABORT = ApiConstants.SEMI_INTEGRATION_PREFIX + '/transaction/abort';
  public static readonly PATH_TIP_ADJUST =
    ApiConstants.SEMI_INTEGRATION_PREFIX + '/transaction/tip-adjust';
  public static readonly PATH_QUERY = ApiConstants.COMMON_PREFIX + '/transaction/query';

  /**
   * Settlement API paths
   */
  public static readonly PATH_BATCH_CLOSE =
    ApiConstants.COMMON_PREFIX + '/settlement/batch-close';
  public static readonly PATH_BATCH_QUERY =
    ApiConstants.COMMON_PREFIX + '/settlement/batch-query';

  private constructor() {
    // Utility class, prevent instantiation
  }
}

