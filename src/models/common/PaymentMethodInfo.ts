/**
 * Payment method information
 *
 * @since 2025-12-24
 */
export interface PaymentMethodInfo {
  /**
   * Payment category: CARD (bank card)/CARD-CREDIT (credit card network)/CARD-DEBIT (debit card network)/QR-MPM (QR code merchant present mode)/QR-CPM (QR code customer present mode)
   */
  category?: string;

  /**
   * Specific payment method: WECHAT (WeChat)/ALIPAY (Alipay) etc. For card payments, usually only category needs to be specified
   */
  id?: string;
}

