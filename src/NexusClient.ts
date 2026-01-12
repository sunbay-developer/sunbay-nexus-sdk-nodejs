import { HttpClient } from './http/HttpClient';
import { ApiConstants } from './constants/ApiConstants';
import { SunbayBusinessError } from './errors/SunbayBusinessError';
import { ClientConfig } from './client/ClientConfig';
import { Logger } from './logger/Logger';

// Request types
import { SaleRequest } from './models/request/SaleRequest';
import { AuthRequest } from './models/request/AuthRequest';
import { ForcedAuthRequest } from './models/request/ForcedAuthRequest';
import { IncrementalAuthRequest } from './models/request/IncrementalAuthRequest';
import { PostAuthRequest } from './models/request/PostAuthRequest';
import { RefundRequest } from './models/request/RefundRequest';
import { VoidRequest } from './models/request/VoidRequest';
import { AbortRequest } from './models/request/AbortRequest';
import { TipAdjustRequest } from './models/request/TipAdjustRequest';
import { QueryRequest } from './models/request/QueryRequest';
import { BatchCloseRequest } from './models/request/BatchCloseRequest';
import { BatchQueryRequest } from './models/request/BatchQueryRequest';

// Response types
import { SaleResponse, SaleResponseImpl } from './models/response/SaleResponse';
import { AuthResponse, AuthResponseImpl } from './models/response/AuthResponse';
import { ForcedAuthResponse, ForcedAuthResponseImpl } from './models/response/ForcedAuthResponse';
import { IncrementalAuthResponse, IncrementalAuthResponseImpl } from './models/response/IncrementalAuthResponse';
import { PostAuthResponse, PostAuthResponseImpl } from './models/response/PostAuthResponse';
import { RefundResponse, RefundResponseImpl } from './models/response/RefundResponse';
import { VoidResponse, VoidResponseImpl } from './models/response/VoidResponse';
import { AbortResponse, AbortResponseImpl } from './models/response/AbortResponse';
import { TipAdjustResponse, TipAdjustResponseImpl } from './models/response/TipAdjustResponse';
import { QueryResponse, QueryResponseImpl } from './models/response/QueryResponse';
import { BatchCloseResponse, BatchCloseResponseImpl } from './models/response/BatchCloseResponse';
import { BatchQueryResponse, BatchQueryResponseImpl } from './models/response/BatchQueryResponse';

/**
 * Sunbay SDK main client
 * <p>
 * This client is thread-safe and can be safely used by multiple threads.
 * </p>
 *
 * @since 2025-01-24
 */
export class NexusClient {
  private static readonly DEFAULT_BASE_URL = 'https://open.sunbay.us';
  private static readonly DEFAULT_CONNECT_TIMEOUT = 30000;
  private static readonly DEFAULT_READ_TIMEOUT = 60000;
  private static readonly DEFAULT_MAX_RETRIES = 3;
  private static readonly DEFAULT_MAX_TOTAL = 200;
  private static readonly DEFAULT_MAX_PER_ROUTE = 20;

  private readonly httpClient: HttpClient;

  /**
   * Create a new NexusClient instance
   * 
   * @param config client configuration
   */
  constructor(config: ClientConfig) {
    if (!config || !config.apiKey || config.apiKey.length === 0) {
      throw new SunbayBusinessError(
        ApiConstants.ERROR_CODE_PARAMETER_ERROR,
        'API key cannot be null or empty'
      );
    }

    this.httpClient = new HttpClient(
      config.apiKey,
      config.baseUrl || NexusClient.DEFAULT_BASE_URL,
      config.connectTimeout || NexusClient.DEFAULT_CONNECT_TIMEOUT,
      config.readTimeout || NexusClient.DEFAULT_READ_TIMEOUT,
      config.maxRetries || NexusClient.DEFAULT_MAX_RETRIES,
      config.maxTotal || NexusClient.DEFAULT_MAX_TOTAL,
      config.maxPerRoute || NexusClient.DEFAULT_MAX_PER_ROUTE,
      config.logger
    );
  }

  /**
   * Sale transaction
   *
   * @param request sale request
   * @return sale response
   */
  public async sale(request: SaleRequest): Promise<SaleResponse> {
    if (!request) {
      throw new SunbayBusinessError(
        ApiConstants.ERROR_CODE_PARAMETER_ERROR,
        'SaleRequest cannot be null'
      );
    }
    return this.httpClient.post(ApiConstants.PATH_SALE, request, SaleResponseImpl);
  }

  /**
   * Authorization (pre-auth)
   *
   * @param request auth request
   * @return auth response
   */
  public async auth(request: AuthRequest): Promise<AuthResponse> {
    if (!request) {
      throw new SunbayBusinessError(
        ApiConstants.ERROR_CODE_PARAMETER_ERROR,
        'AuthRequest cannot be null'
      );
    }
    return this.httpClient.post(ApiConstants.PATH_AUTH, request, AuthResponseImpl);
  }

  /**
   * Forced authorization
   *
   * @param request forced auth request
   * @return forced auth response
   */
  public async forcedAuth(request: ForcedAuthRequest): Promise<ForcedAuthResponse> {
    if (!request) {
      throw new SunbayBusinessError(
        ApiConstants.ERROR_CODE_PARAMETER_ERROR,
        'ForcedAuthRequest cannot be null'
      );
    }
    return this.httpClient.post(ApiConstants.PATH_FORCED_AUTH, request, ForcedAuthResponseImpl);
  }

  /**
   * Incremental authorization
   *
   * @param request incremental auth request
   * @return incremental auth response
   */
  public async incrementalAuth(
    request: IncrementalAuthRequest
  ): Promise<IncrementalAuthResponse> {
    if (!request) {
      throw new SunbayBusinessError(
        ApiConstants.ERROR_CODE_PARAMETER_ERROR,
        'IncrementalAuthRequest cannot be null'
      );
    }
    return this.httpClient.post(
      ApiConstants.PATH_INCREMENTAL_AUTH,
      request,
      IncrementalAuthResponseImpl
    );
  }

  /**
   * Post authorization (pre-auth completion)
   *
   * @param request post auth request
   * @return post auth response
   */
  public async postAuth(request: PostAuthRequest): Promise<PostAuthResponse> {
    if (!request) {
      throw new SunbayBusinessError(
        ApiConstants.ERROR_CODE_PARAMETER_ERROR,
        'PostAuthRequest cannot be null'
      );
    }
    return this.httpClient.post(ApiConstants.PATH_POST_AUTH, request, PostAuthResponseImpl);
  }

  /**
   * Refund
   *
   * @param request refund request
   * @return refund response
   */
  public async refund(request: RefundRequest): Promise<RefundResponse> {
    if (!request) {
      throw new SunbayBusinessError(
        ApiConstants.ERROR_CODE_PARAMETER_ERROR,
        'RefundRequest cannot be null'
      );
    }
    return this.httpClient.post(ApiConstants.PATH_REFUND, request, RefundResponseImpl);
  }

  /**
   * Void transaction
   *
   * @param request void request
   * @return void response
   */
  public async voidTransaction(request: VoidRequest): Promise<VoidResponse> {
    if (!request) {
      throw new SunbayBusinessError(
        ApiConstants.ERROR_CODE_PARAMETER_ERROR,
        'VoidRequest cannot be null'
      );
    }
    return this.httpClient.post(ApiConstants.PATH_VOID, request, VoidResponseImpl);
  }

  /**
   * Abort transaction
   *
   * @param request abort request
   * @return abort response
   */
  public async abort(request: AbortRequest): Promise<AbortResponse> {
    if (!request) {
      throw new SunbayBusinessError(
        ApiConstants.ERROR_CODE_PARAMETER_ERROR,
        'AbortRequest cannot be null'
      );
    }
    return this.httpClient.post(ApiConstants.PATH_ABORT, request, AbortResponseImpl);
  }

  /**
   * Tip adjust
   *
   * @param request tip adjust request
   * @return tip adjust response
   */
  public async tipAdjust(request: TipAdjustRequest): Promise<TipAdjustResponse> {
    if (!request) {
      throw new SunbayBusinessError(
        ApiConstants.ERROR_CODE_PARAMETER_ERROR,
        'TipAdjustRequest cannot be null'
      );
    }
    return this.httpClient.post(ApiConstants.PATH_TIP_ADJUST, request, TipAdjustResponseImpl);
  }

  /**
   * Query transaction
   *
   * @param request query request
   * @return query response
   */
  public async query(request: QueryRequest): Promise<QueryResponse> {
    if (!request) {
      throw new SunbayBusinessError(
        ApiConstants.ERROR_CODE_PARAMETER_ERROR,
        'QueryRequest cannot be null'
      );
    }
    return this.httpClient.get(ApiConstants.PATH_QUERY, request, QueryResponseImpl);
  }

  /**
   * Batch close
   *
   * @param request batch close request
   * @return batch close response
   */
  public async batchClose(request: BatchCloseRequest): Promise<BatchCloseResponse> {
    if (!request) {
      throw new SunbayBusinessError(
        ApiConstants.ERROR_CODE_PARAMETER_ERROR,
        'BatchCloseRequest cannot be null'
      );
    }
    return this.httpClient.post(ApiConstants.PATH_BATCH_CLOSE, request, BatchCloseResponseImpl);
  }

  /**
   * Batch query
   *
   * @param request batch query request
   * @return batch query response
   */
  public async batchQuery(request: BatchQueryRequest): Promise<BatchQueryResponse> {
    if (!request) {
      throw new SunbayBusinessError(
        ApiConstants.ERROR_CODE_PARAMETER_ERROR,
        'BatchQueryRequest cannot be null'
      );
    }
    return this.httpClient.post(ApiConstants.PATH_BATCH_QUERY, request, BatchQueryResponseImpl);
  }

}

