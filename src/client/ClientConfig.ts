import { Logger } from '../logger/Logger';

/**
 * Client configuration interface
 *
 * @since 2025-12-24
 */
export interface ClientConfig {
  /**
   * API key (required)
   */
  apiKey: string;

  /**
   * Base URL (optional, default: https://open.sunbay.us)
   */
  baseUrl?: string;

  /**
   * Connection timeout in milliseconds (optional, default: 30000)
   */
  connectTimeout?: number;

  /**
   * Read timeout in milliseconds (optional, default: 60000)
   */
  readTimeout?: number;

  /**
   * Maximum retries for GET requests (optional, default: 3)
   */
  maxRetries?: number;

  /**
   * Maximum total connections in pool (optional, default: 200)
   */
  maxTotal?: number;

  /**
   * Maximum connections per route (optional, default: 20)
   */
  maxPerRoute?: number;

  /**
   * Logger instance (optional, default: DefaultLogger using console)
   * Users can optionally provide a logger object with debug/info/warn/error methods
   */
  logger?: Logger;
}

