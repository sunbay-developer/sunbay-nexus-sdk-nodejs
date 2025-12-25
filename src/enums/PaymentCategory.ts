/**
 * Payment category class
 * API returns payment category value (CARD, CARD-CREDIT, etc.), SDK converts to PaymentCategory instance
 *
 * @since 2025-12-24
 */
export class PaymentCategory {
  /**
   * Card payment (code: "CARD")
   */
  public static readonly CARD = new PaymentCategory('CARD');

  /**
   * Credit card network (code: "CARD-CREDIT")
   */
  public static readonly CARD_CREDIT = new PaymentCategory('CARD-CREDIT');

  /**
   * Debit card network (code: "CARD-DEBIT")
   */
  public static readonly CARD_DEBIT = new PaymentCategory('CARD-DEBIT');

  /**
   * QR code merchant presented mode (code: "QR-MPM")
   */
  public static readonly QR_MPM = new PaymentCategory('QR-MPM');

  /**
   * QR code customer presented mode (code: "QR-CPM")
   */
  public static readonly QR_CPM = new PaymentCategory('QR-CPM');

  private readonly code: string;

  private constructor(code: string) {
    this.code = code;
  }

  /**
   * Get payment category code
   *
   * @return payment category code
   */
  public getCode(): string {
    return this.code;
  }

  /**
   * Convert code to payment category
   *
   * @param code payment category code
   * @return payment category, or undefined if code is invalid
   */
  public static fromCode(code: string): PaymentCategory | undefined {
    const codeMap: Record<string, PaymentCategory> = {
      'CARD': PaymentCategory.CARD,
      'CARD-CREDIT': PaymentCategory.CARD_CREDIT,
      'CARD-DEBIT': PaymentCategory.CARD_DEBIT,
      'QR-MPM': PaymentCategory.QR_MPM,
      'QR-CPM': PaymentCategory.QR_CPM,
    };
    return codeMap[code];
  }
}

