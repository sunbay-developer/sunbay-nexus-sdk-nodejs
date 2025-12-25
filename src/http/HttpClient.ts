import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import * as https from 'https';
import { ApiConstants } from '../constants/ApiConstants';
import { SunbayBusinessException } from '../exceptions/SunbayBusinessException';
import { SunbayNetworkException } from '../exceptions/SunbayNetworkException';
import { BaseResponse } from '../models/common/BaseResponse';
import { IdGenerator } from '../utils/IdGenerator';
import { UserAgentUtil } from '../utils/UserAgentUtil';
import { JsonUtil } from '../utils/JsonUtil';
import { Logger, DefaultLogger } from '../logger/Logger';
import { TransactionStatus } from '../enums/TransactionStatus';
import { TransactionType } from '../enums/TransactionType';
import { EntryMode } from '../enums/EntryMode';
import { CardNetworkType } from '../enums/CardNetworkType';
import { AuthenticationMethod } from '../enums/AuthenticationMethod';

/**
 * HTTP client for Sunbay API
 *
 * @since 2025-12-24
 */
export class HttpClient {
  private static readonly HEADER_AUTHORIZATION = 'Authorization';
  private static readonly HEADER_CONTENT_TYPE = 'Content-Type';
  private static readonly HEADER_REQUEST_ID = 'X-Client-Request-Id';
  private static readonly HEADER_TIMESTAMP = 'X-Timestamp';
  private static readonly HEADER_USER_AGENT = 'User-Agent';
  private static readonly CONTENT_TYPE_JSON = 'application/json';
  private static readonly RETRY_DELAY_BASE_MS = 1000;

  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly axiosInstance: AxiosInstance;
  private readonly maxRetries: number;
  private readonly logger: Logger;

  constructor(
    apiKey: string,
    baseUrl: string,
    connectTimeout: number,
    readTimeout: number,
    maxRetries: number,
    maxTotal?: number,
    maxPerRoute?: number,
    logger?: Logger
  ) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.maxRetries = maxRetries;
    this.logger = logger || new DefaultLogger();

    // Create HTTPS agent with connection pool
    const agent = new https.Agent({
      keepAlive: true,
      maxSockets: maxTotal || 200,
      maxFreeSockets: maxPerRoute || 20,
      timeout: connectTimeout,
    });

    // Create axios instance
    this.axiosInstance = axios.create({
      timeout: readTimeout,
      httpsAgent: agent,
      headers: {
        'User-Agent': UserAgentUtil.getUserAgent(),
      },
    });

    // Add request interceptor
    this.axiosInstance.interceptors.request.use((config) => {
      this.addCommonHeaders(config);
      return config;
    });
  }

  /**
   * Execute POST request
   *
   * @param path API path
   * @param requestBody request body object
   * @param responseType response type class
   * @return response object
   */
  public async post<T extends BaseResponse>(
    path: string,
    requestBody: any,
    responseType: new () => T
  ): Promise<T> {
    const url = this.baseUrl + path;
    const requestJson = JsonUtil.toJson(requestBody);

    const config: AxiosRequestConfig = {
      method: 'POST',
      url,
      data: requestJson,
      headers: {
        [HttpClient.HEADER_CONTENT_TYPE]: HttpClient.CONTENT_TYPE_JSON,
      },
    };

    return this.executeRequest<T>(config, responseType, false);
  }

  /**
   * Execute GET request
   *
   * @param path API path
   * @param request request object with query parameters
   * @param responseType response type class
   * @return response object
   */
  public async get<T extends BaseResponse>(
    path: string,
    request: any,
    responseType: new () => T
  ): Promise<T> {
    const url = this.baseUrl + path;
    const params: Record<string, string> = {};

    // Build query parameters from request object
    if (request) {
      for (const key in request) {
        if (request.hasOwnProperty(key)) {
          const value = request[key];
          if (value !== null && value !== undefined) {
            params[key] = String(value);
          }
        }
      }
    }

    const config: AxiosRequestConfig = {
      method: 'GET',
      url,
      params,
    };

    return this.executeRequest<T>(config, responseType, true);
  }

  /**
   * Add common headers to request
   *
   * @param config axios request config
   */
  private addCommonHeaders(config: AxiosRequestConfig): void {
    if (!config.headers) {
      config.headers = {};
    }

    config.headers[HttpClient.HEADER_AUTHORIZATION] =
      ApiConstants.AUTHORIZATION_BEARER_PREFIX + this.apiKey;
    config.headers[HttpClient.HEADER_REQUEST_ID] = IdGenerator.generateRequestId();
    config.headers[HttpClient.HEADER_TIMESTAMP] = String(Date.now());
    config.headers[HttpClient.HEADER_USER_AGENT] = UserAgentUtil.getUserAgent();
  }

  /**
   * Execute HTTP request with retry logic
   *
   * @param config axios request config
   * @param responseType response type class
   * @param retryable whether the request is retryable
   * @return response object
   */
  private async executeRequest<T extends BaseResponse>(
    config: AxiosRequestConfig,
    responseType: new () => T,
    retryable: boolean
  ): Promise<T> {
    let attempts = 0;
    const maxAttempts = retryable ? this.maxRetries : 1;

    while (attempts < maxAttempts) {
      attempts++;
      try {
        return await this.doExecute<T>(config, responseType);
      } catch (error: any) {
        if (!retryable || attempts >= maxAttempts) {
          if (this.logger.warn) {
            this.logger.warn(
              `Request failed after ${attempts} attempts: ${error.message || 'Unknown error'}`
            );
          }
          throw error;
        }

        if (this.logger.debug) {
          this.logger.debug(
            `Request failed, retrying (${attempts}/${maxAttempts}) after delay: ${error.message || 'Unknown error'}`
          );
        }

        // Retry after delay
        const delay = HttpClient.RETRY_DELAY_BASE_MS * attempts;
        await this.sleep(delay);
      }
    }

    throw new SunbayNetworkException(
      `Request failed after ${maxAttempts} attempts`,
      true
    );
  }

  /**
   * Execute HTTP request
   *
   * @param config axios request config
   * @param responseType response type class
   * @return response object
   */
  private async doExecute<T extends BaseResponse>(
    config: AxiosRequestConfig,
    responseType: new () => T
  ): Promise<T> {
    const requestMethod = config.method?.toUpperCase() || 'UNKNOWN';
    const requestUrl = config.url || '';

    // Log request
    // Note: Headers will be added by request interceptor before request is sent
    // For logging, we create a copy of headers and add common headers to show complete header info
    if (this.logger.info) {
      const headersForLogging: Record<string, any> = {};
      
      // Copy existing headers
      if (config.headers) {
        if (typeof config.headers === 'object') {
          for (const key in config.headers) {
            if (config.headers.hasOwnProperty(key)) {
              headersForLogging[key] = config.headers[key];
            }
          }
        }
      }
      
      // Add common headers for logging (they will be added by interceptor anyway)
      headersForLogging[HttpClient.HEADER_AUTHORIZATION] =
        ApiConstants.AUTHORIZATION_BEARER_PREFIX + this.apiKey;
      headersForLogging[HttpClient.HEADER_REQUEST_ID] = IdGenerator.generateRequestId();
      headersForLogging[HttpClient.HEADER_TIMESTAMP] = String(Date.now());
      headersForLogging[HttpClient.HEADER_USER_AGENT] = UserAgentUtil.getUserAgent();
      
      const headers = this.formatHeadersForLogging(headersForLogging);
      const requestBody = config.data ? (typeof config.data === 'string' ? config.data : JSON.stringify(config.data)) : null;
      
      if (requestBody) {
        this.logger.info(`Request ${requestMethod} ${requestUrl} - Headers: ${headers} - Body: ${requestBody}`);
      } else {
        this.logger.info(`Request ${requestMethod} ${requestUrl} - Headers: ${headers}`);
      }
    }

    try {
      const response: AxiosResponse = await this.axiosInstance.request(config);
      const statusCode = response.status;
      const responseBody = response.data;

      // Log response
      if (this.logger.info) {
        const responseBodyStr = typeof responseBody === 'string' ? responseBody : JSON.stringify(responseBody);
        this.logger.info(`Response ${requestMethod} ${requestUrl} - Status: ${statusCode}, Body: ${responseBodyStr}`);
      }

      if (
        statusCode >= ApiConstants.HTTP_STATUS_OK_START &&
        statusCode < ApiConstants.HTTP_STATUS_OK_END
      ) {
        if (!responseBody || (typeof responseBody === 'string' && responseBody.trim().length === 0)) {
          throw new SunbayNetworkException('Empty response body', false);
        }

        // Parse response with data field support
        const result = this.parseResponse<T>(responseBody, responseType);
        if (!result) {
          throw new SunbayNetworkException('Failed to parse response body', false);
        }

        // Check if response is successful
        if (result.code !== ApiConstants.RESPONSE_SUCCESS_CODE) {
          if (this.logger.error) {
            this.logger.error(
              `API error ${requestMethod} ${requestUrl} - code: ${result.code}, msg: ${result.msg}, traceId: ${result.traceId}`
            );
          }
          throw new SunbayBusinessException(
            result.code || ApiConstants.ERROR_CODE_PARAMETER_ERROR,
            result.msg || 'Unknown error',
            result.traceId
          );
        }

        return result;
      } else {
        const errorMessage = this.buildErrorMessage(statusCode, responseBody);
        if (this.logger.error) {
          this.logger.error(`HTTP error ${requestMethod} ${requestUrl} - Status: ${statusCode}, Message: ${errorMessage}`);
        }
        throw new SunbayNetworkException(errorMessage, false);
      }
    } catch (error: any) {
      if (error?.name === 'SunbayBusinessException' || error?.name === 'SunbayNetworkException') {
        throw error;
      }

      // Handle axios errors
      if (error.response) {
        // Server responded with error status
        const statusCode = error.response.status;
        const responseBody = error.response.data;
        const errorMessage = this.buildErrorMessage(statusCode, responseBody);
        if (this.logger.error) {
          this.logger.error(`HTTP error ${requestMethod} ${requestUrl} - Status: ${statusCode}, Message: ${errorMessage}`);
        }
        throw new SunbayNetworkException(errorMessage, false);
      } else if (error.request) {
        // Request made but no response received
        const isTimeout = error.code === 'ECONNABORTED' || error.message?.includes('timeout');
        if (isTimeout) {
          if (this.logger.warn) {
            this.logger.warn(`Request timeout ${requestMethod} ${requestUrl}: ${error.message || 'Unknown timeout'}`);
          }
        } else {
          if (this.logger.warn) {
            this.logger.warn(`Network error ${requestMethod} ${requestUrl}: ${error.message || 'No response received'}`);
          }
        }
        throw new SunbayNetworkException(
          `Network error: ${error.message || 'No response received'}`,
          error,
          isTimeout
        );
      } else {
        // Error setting up request
        throw new SunbayNetworkException(
          `Request error: ${error.message || 'Unknown error'}`,
          error,
          false
        );
      }
    }
  }

  /**
   * Format request headers for logging with sensitive information masked
   *
   * @param headers request headers
   * @return formatted headers string
   */
  private formatHeadersForLogging(headers: any): string {
    const headerEntries: string[] = [];
    
    // Handle different header formats (plain object, AxiosHeaders, etc.)
    const headerObj: Record<string, any> = {};
    
    if (headers && typeof headers === 'object') {
      // If headers is an AxiosHeaders object, convert it to plain object
      if (headers.get) {
        // AxiosHeaders has a get method
        const headerNames = [
          HttpClient.HEADER_AUTHORIZATION,
          HttpClient.HEADER_CONTENT_TYPE,
          HttpClient.HEADER_REQUEST_ID,
          HttpClient.HEADER_TIMESTAMP,
          HttpClient.HEADER_USER_AGENT,
        ];
        
        for (const name of headerNames) {
          const value = headers.get(name);
          if (value !== undefined && value !== null) {
            headerObj[name] = value;
          }
        }
        
        // Also get all other headers
        if (headers.toJSON) {
          const allHeaders = headers.toJSON();
          Object.assign(headerObj, allHeaders);
        }
      } else {
        // Plain object
        Object.assign(headerObj, headers);
      }
    }
    
    // Format headers
    for (const key in headerObj) {
      if (headerObj.hasOwnProperty(key)) {
        let value = headerObj[key];
        
        // Handle array values (axios may store headers as arrays)
        if (Array.isArray(value)) {
          value = value[0];
        }
        
        // Mask sensitive headers
        if (key.toLowerCase() === HttpClient.HEADER_AUTHORIZATION.toLowerCase()) {
          value = this.maskAuthorizationHeader(String(value));
        }
        
        headerEntries.push(`"${key}":"${String(value)}"`);
      }
    }
    
    return `{${headerEntries.join(', ')}}`;
  }

  /**
   * Mask authorization header value to hide sensitive information
   *
   * @param authValue original authorization header value
   * @return masked authorization header value
   */
  private maskAuthorizationHeader(authValue: string): string {
    if (!authValue || authValue.length === 0) {
      return '';
    }
    
    // If it starts with "Bearer ", mask the token part
    if (authValue.startsWith(ApiConstants.AUTHORIZATION_BEARER_PREFIX)) {
      const token = authValue.substring(ApiConstants.AUTHORIZATION_BEARER_PREFIX.length);
      if (token.length > 8) {
        // Show first 4 and last 4 characters, mask the middle
        return ApiConstants.AUTHORIZATION_BEARER_PREFIX + 
               token.substring(0, 4) + '****' + token.substring(token.length - 4);
      } else {
        // If token is too short, just show "****"
        return ApiConstants.AUTHORIZATION_BEARER_PREFIX + '****';
      }
    }
    
    // For other formats, mask completely
    return '****';
  }

  /**
   * Parse response with data field support
   * API returns: {"code":"0","msg":"Success","data":{...},"traceId":"..."}
   * Need to extract data field and merge with base response
   *
   * @param responseBody response body (can be object or string)
   * @param responseType response type class
   * @return parsed response object
   */
  private parseResponse<T extends BaseResponse>(
    responseBody: any,
    responseType: new () => T
  ): T | null {
    try {
      let rootNode: any;
      if (typeof responseBody === 'string') {
        rootNode = JSON.parse(responseBody);
      } else {
        rootNode = responseBody;
      }

      // Extract base fields (code, msg, traceId)
      const code = rootNode[ApiConstants.JSON_FIELD_CODE];
      const msg = rootNode[ApiConstants.JSON_FIELD_MSG];
      const traceId = rootNode[ApiConstants.JSON_FIELD_TRACE_ID];

      // Extract data field if exists
      const dataNode = rootNode[ApiConstants.JSON_FIELD_DATA];

      // Create response object
      let result: T;
      if (dataNode !== null && dataNode !== undefined) {
        // Merge data field with base response
        result = Object.assign(new responseType(), dataNode);
      } else {
        // No data field, parse entire response
        result = Object.assign(new responseType(), rootNode);
      }

      // Set base fields
      result.code = code;
      result.msg = msg;
      result.traceId = traceId;

      // Convert enum fields from code/string to enum
      this.convertEnumFields(result);

      // Add isSuccess method if not present
      if (!result.isSuccess) {
        (result as any).isSuccess = function (): boolean {
          return ApiConstants.RESPONSE_SUCCESS_CODE === this.code;
        };
      }

      return result;
    } catch (e: any) {
      // Fallback to direct parsing
      try {
        const parsed = typeof responseBody === 'string' ? JSON.parse(responseBody) : responseBody;
        const result = Object.assign(new responseType(), parsed);
        
        // Convert enum fields from code/string to enum
        this.convertEnumFields(result);
        
        if (!result.isSuccess) {
          (result as any).isSuccess = function (): boolean {
            return ApiConstants.RESPONSE_SUCCESS_CODE === this.code;
          };
        }
        return result;
      } catch (e2: any) {
        if (this.logger.debug) {
          this.logger.debug(`Failed to parse response with data field, fallback to direct parsing: ${e2.message || 'Unknown error'}`);
        }
        return null;
      }
    }
  }

  /**
   * Convert enum fields from code/string to enum type
   * 
   * @param result response object
   */
  private convertEnumFields(result: any): void {
    // Convert transactionStatus: API returns code (I, P, S, F, C)
    if (result.transactionStatus && typeof result.transactionStatus === 'string') {
      const status = TransactionStatus.fromCode(result.transactionStatus);
      if (status !== undefined) {
        result.transactionStatus = status;
      }
    }

    // Convert transactionType: API returns transaction type name (SALE, AUTH, etc.)
    if (result.transactionType && typeof result.transactionType === 'string') {
      const type = TransactionType.fromCode(result.transactionType);
      if (type !== undefined) {
        result.transactionType = type;
      }
    }

    // Convert entryMode: API returns entry mode name (MANUAL, SWIPE, etc.)
    if (result.entryMode && typeof result.entryMode === 'string') {
      const mode = EntryMode.fromCode(result.entryMode);
      if (mode !== undefined) {
        result.entryMode = mode;
      }
    }

    // Convert cardNetworkType: API returns card network type name (CREDIT, DEBIT, etc.)
    if (result.cardNetworkType && typeof result.cardNetworkType === 'string') {
      const networkType = CardNetworkType.fromCode(result.cardNetworkType);
      if (networkType !== undefined) {
        result.cardNetworkType = networkType;
      }
    }

    // Convert authenticationMethod: API returns authentication method name (NOT_AUTHENTICATED, PIN, etc.)
    if (result.authenticationMethod && typeof result.authenticationMethod === 'string') {
      const authMethod = AuthenticationMethod.fromCode(result.authenticationMethod);
      if (authMethod !== undefined) {
        result.authenticationMethod = authMethod;
      }
    }
  }

  /**
   * Build error message from HTTP status code and response body
   *
   * @param statusCode HTTP status code
   * @param responseBody response body
   * @return error message
   */
  private buildErrorMessage(statusCode: number, responseBody: any): string {
    let message = `HTTP ${statusCode}`;

    if (
      statusCode >= ApiConstants.HTTP_STATUS_CLIENT_ERROR_START &&
      statusCode < ApiConstants.HTTP_STATUS_CLIENT_ERROR_END
    ) {
      message += ' (Client Error)';
    } else if (statusCode >= ApiConstants.HTTP_STATUS_SERVER_ERROR_START) {
      message += ' (Server Error)';
    }

    if (responseBody) {
      const bodyStr =
        typeof responseBody === 'string' ? responseBody : JSON.stringify(responseBody);
      if (bodyStr && bodyStr.trim().length > 0) {
        message += ' - ' + bodyStr;
      }
    }

    return message;
  }

  /**
   * Sleep for specified milliseconds
   *
   * @param ms milliseconds to sleep
   */
  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

