/**
 * Authentication method class
 * API returns authentication method name (NOT_AUTHENTICATED, PIN, etc.), SDK converts to AuthenticationMethod instance
 *
 * @since 2025-12-24
 */
export class AuthenticationMethod {
  /**
   * Not authenticated (code: "NOT_AUTHENTICATED")
   */
  public static readonly NOT_AUTHENTICATED = new AuthenticationMethod('NOT_AUTHENTICATED');

  /**
   * PIN authentication (code: "PIN")
   */
  public static readonly PIN = new AuthenticationMethod('PIN');

  /**
   * Offline PIN (code: "OFFLINE_PIN")
   */
  public static readonly OFFLINE_PIN = new AuthenticationMethod('OFFLINE_PIN');

  /**
   * Bypass authentication (code: "BY_PASS")
   */
  public static readonly BY_PASS = new AuthenticationMethod('BY_PASS');

  /**
   * Signature authentication (code: "SIGNATURE")
   */
  public static readonly SIGNATURE = new AuthenticationMethod('SIGNATURE');

  private readonly code: string;

  private constructor(code: string) {
    this.code = code;
  }

  /**
   * Get authentication method code
   *
   * @return authentication method code
   */
  public getCode(): string {
    return this.code;
  }

  /**
   * Convert code to authentication method
   *
   * @param code authentication method code
   * @return authentication method, or undefined if code is invalid
   */
  public static fromCode(code: string): AuthenticationMethod | undefined {
    const codeMap: Record<string, AuthenticationMethod> = {
      'NOT_AUTHENTICATED': AuthenticationMethod.NOT_AUTHENTICATED,
      'PIN': AuthenticationMethod.PIN,
      'OFFLINE_PIN': AuthenticationMethod.OFFLINE_PIN,
      'BY_PASS': AuthenticationMethod.BY_PASS,
      'SIGNATURE': AuthenticationMethod.SIGNATURE,
    };
    return codeMap[code];
  }
}

