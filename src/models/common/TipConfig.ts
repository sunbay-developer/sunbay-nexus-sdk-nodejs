/**
 * Tip suggestion configuration
 *
 * @since 2025-05-15
 */
export interface TipSuggestions {
  /**
   * Fee mode: RATE (percentage) or AMOUNT (fixed amount)
   */
  feeMode: 'RATE' | 'AMOUNT';

  /**
   * Suggested tip values. When feeMode is RATE, values represent percentages (e.g., 15 = 15%).
   * When feeMode is AMOUNT, values represent amounts in smallest currency unit.
   */
  values: number[];
}

/**
 * Tip configuration for on-screen tip prompts
 *
 * @since 2025-05-15
 */
export interface TipConfig {
  /**
   * Whether to show on-screen tip prompt
   */
  onScreenTip: boolean;

  /**
   * Tip mode: ON_SALE (tip during sale) or AFTER_SALE (tip after sale)
   */
  tipMode: 'ON_SALE' | 'AFTER_SALE';

  /**
   * Whether tip amount includes tax
   */
  tipWithTax: boolean;

  /**
   * Tip suggestion configuration
   */
  suggestions?: TipSuggestions;
}
