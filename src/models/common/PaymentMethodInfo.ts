/**
 * EBT sub-payment method. Only applicable when paymentMethod.category = EBT and paymentMethod.id = EBT.
 *
 * @since 2025-12-24
 */
export type EbtSubId = 'SNAP' | 'VOUCHER' | 'BENEFIT';

/**
 * Payment method information
 *
 * @since 2025-12-24
 */
export interface PaymentMethodInfo {
  /**
   * Payment category: CARD (bank card)/CARD-CREDIT (credit card network)/CARD-DEBIT (debit card network)/QR-MPM (QR code merchant present mode)/QR-CPM (QR code customer present mode)/EBT etc.
   */
  category?: string;

  /**
   * Specific payment method: WECHAT (WeChat)/ALIPAY (Alipay)/EBT etc. For card payments, usually only category needs to be specified
   */
  id?: string;

  /**
   * Sub-payment method. When category = CARD, must not be specified. When category = EBT and id = EBT, optional; if specified, must be one of SNAP, VOUCHER, BENEFIT
   */
  subId?: EbtSubId;
}

