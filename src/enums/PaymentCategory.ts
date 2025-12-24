/**
 * Payment category enum
 *
 * @since 2025-12-24
 */
export enum PaymentCategory {
  /**
   * Card payment
   */
  CARD = 'CARD',

  /**
   * Credit card network
   */
  CARD_CREDIT = 'CARD-CREDIT',

  /**
   * Debit card network
   */
  CARD_DEBIT = 'CARD-DEBIT',

  /**
   * QR code merchant presented mode
   */
  QR_MPM = 'QR-MPM',

  /**
   * QR code customer presented mode
   */
  QR_CPM = 'QR-CPM',
}

