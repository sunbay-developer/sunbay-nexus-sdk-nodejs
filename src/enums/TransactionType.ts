/**
 * Transaction type class
 * API returns transaction type name (SALE, AUTH, etc.), SDK converts to TransactionType instance
 *
 * @since 2025-12-24
 */
export class TransactionType {
  /**
   * Sale transaction (code: "SALE")
   */
  public static readonly SALE = new TransactionType('SALE');

  /**
   * Authorization (pre-auth) (code: "AUTH")
   */
  public static readonly AUTH = new TransactionType('AUTH');

  /**
   * Forced authorization (code: "FORCED_AUTH")
   */
  public static readonly FORCED_AUTH = new TransactionType('FORCED_AUTH');

  /**
   * Incremental authorization (code: "INCREMENTAL")
   */
  public static readonly INCREMENTAL = new TransactionType('INCREMENTAL');

  /**
   * Post authorization (pre-auth completion) (code: "POST_AUTH")
   */
  public static readonly POST_AUTH = new TransactionType('POST_AUTH');

  /**
   * Refund (code: "REFUND")
   */
  public static readonly REFUND = new TransactionType('REFUND');

  /**
   * Void (code: "VOID")
   */
  public static readonly VOID = new TransactionType('VOID');

  private readonly code: string;

  private constructor(code: string) {
    this.code = code;
  }

  /**
   * Get transaction type code
   *
   * @return transaction type code
   */
  public getCode(): string {
    return this.code;
  }

  /**
   * Convert code to transaction type
   *
   * @param code transaction type code
   * @return transaction type, or undefined if code is invalid
   */
  public static fromCode(code: string): TransactionType | undefined {
    const codeMap: Record<string, TransactionType> = {
      'SALE': TransactionType.SALE,
      'AUTH': TransactionType.AUTH,
      'FORCED_AUTH': TransactionType.FORCED_AUTH,
      'INCREMENTAL': TransactionType.INCREMENTAL,
      'POST_AUTH': TransactionType.POST_AUTH,
      'REFUND': TransactionType.REFUND,
      'VOID': TransactionType.VOID,
    };
    return codeMap[code];
  }
}

