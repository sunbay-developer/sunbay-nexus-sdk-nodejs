/**
 * Card network type class
 * API returns card network type name (CREDIT, DEBIT, etc.), SDK converts to CardNetworkType instance
 *
 * @since 2025-12-24
 */
export class CardNetworkType {
  /**
   * Credit card (code: "CREDIT")
   */
  public static readonly CREDIT = new CardNetworkType('CREDIT');

  /**
   * Debit card (code: "DEBIT")
   */
  public static readonly DEBIT = new CardNetworkType('DEBIT');

  /**
   * EBT (Electronic Benefit Transfer) (code: "EBT")
   */
  public static readonly EBT = new CardNetworkType('EBT');

  /**
   * EGC (Electronic Gift Card) (code: "EGC")
   */
  public static readonly EGC = new CardNetworkType('EGC');

  /**
   * Unknown card type (code: "UNKNOWN")
   */
  public static readonly UNKNOWN = new CardNetworkType('UNKNOWN');

  private readonly code: string;

  private constructor(code: string) {
    this.code = code;
  }

  /**
   * Get card network type code
   *
   * @return card network type code
   */
  public getCode(): string {
    return this.code;
  }

  /**
   * Convert code to card network type
   *
   * @param code card network type code
   * @return card network type, or undefined if code is invalid
   */
  public static fromCode(code: string): CardNetworkType | undefined {
    const codeMap: Record<string, CardNetworkType> = {
      'CREDIT': CardNetworkType.CREDIT,
      'DEBIT': CardNetworkType.DEBIT,
      'EBT': CardNetworkType.EBT,
      'EGC': CardNetworkType.EGC,
      'UNKNOWN': CardNetworkType.UNKNOWN,
    };
    return codeMap[code];
  }
}

