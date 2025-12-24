/**
 * Authentication method enum
 *
 * @since 2025-12-24
 */
export enum AuthenticationMethod {
  /**
   * Not authenticated
   */
  NOT_AUTHENTICATED = 'NOT_AUTHENTICATED',

  /**
   * PIN authentication
   */
  PIN = 'PIN',

  /**
   * Offline PIN
   */
  OFFLINE_PIN = 'OFFLINE_PIN',

  /**
   * Bypass authentication
   */
  BY_PASS = 'BY_PASS',

  /**
   * Signature authentication
   */
  SIGNATURE = 'SIGNATURE',
}

