/**
 * Logger interface compatible with winston, pino, and other popular Node.js loggers
 * <p>
 * The SDK supports any logger that implements these methods (debug, info, warn, error).
 * Popular loggers like winston and pino are compatible with this interface.
 * </p>
 * <p>
 * If no logger is provided, the SDK uses console by default.
 * </p>
 *
 * @since 2025-12-24
 */
export interface Logger {
  /**
   * Log debug message
   */
  debug?(message: string, ...args: any[]): void;

  /**
   * Log info message
   */
  info?(message: string, ...args: any[]): void;

  /**
   * Log warning message
   */
  warn?(message: string, ...args: any[]): void;

  /**
   * Log error message
   */
  error?(message: string, ...args: any[]): void;
}

/**
 * Default logger implementation using console
 * <p>
 * This is the default logger used by the SDK. It uses console methods for logging.
 * Users can optionally provide winston, pino, or other logger instances.
 * </p>
 *
 * @since 2025-12-24
 */
export class DefaultLogger implements Logger {
  debug(message: string, ...args: any[]): void {
    if (process.env.DEBUG?.includes('sunbay-nexus-sdk')) {
      console.debug(`[sunbay-nexus-sdk] ${message}`, ...args);
    }
  }

  info(message: string, ...args: any[]): void {
    console.info(`[sunbay-nexus-sdk] ${message}`, ...args);
  }

  warn(message: string, ...args: any[]): void {
    console.warn(`[sunbay-nexus-sdk] ${message}`, ...args);
  }

  error(message: string, ...args: any[]): void {
    console.error(`[sunbay-nexus-sdk] ${message}`, ...args);
  }
}
