/**
 * Transaction status class
 * API returns code (I, P, S, F, C), SDK converts to TransactionStatus instance
 *
 * @since 2025-12-24
 */
export class TransactionStatus {
  /**
   * Initial state (code: "I")
   */
  public static readonly INITIAL = new TransactionStatus('I');

  /**
   * Transaction processing. Channel called but no result obtained, or unexpected
   * exception returned. (code: "P")
   */
  public static readonly PROCESSING = new TransactionStatus('P');

  /**
   * Transaction successful (code: "S")
   */
  public static readonly SUCCESS = new TransactionStatus('S');

  /**
   * Transaction failed (code: "F")
   */
  public static readonly FAIL = new TransactionStatus('F');

  /**
   * Transaction closed (code: "C")
   */
  public static readonly CLOSED = new TransactionStatus('C');

  private readonly code: string;

  private constructor(code: string) {
    this.code = code;
  }

  /**
   * Get transaction status code
   *
   * @return status code (I, P, S, F, C)
   */
  public getCode(): string {
    return this.code;
  }

  /**
   * Convert code to transaction status
   *
   * @param code status code (I, P, S, F, C)
   * @return transaction status, or undefined if code is invalid
   */
  public static fromCode(code: string): TransactionStatus | undefined {
    const codeMap: Record<string, TransactionStatus> = {
      'I': TransactionStatus.INITIAL,
      'P': TransactionStatus.PROCESSING,
      'S': TransactionStatus.SUCCESS,
      'F': TransactionStatus.FAIL,
      'C': TransactionStatus.CLOSED,
    };
    return codeMap[code];
  }
}

