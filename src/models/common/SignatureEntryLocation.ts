/**
 * Signature entry location.
 * ON_SCREEN: terminal screen signature; ON_RECEIPT: receipt signature; NONE: no signature.
 *
 * @since 2026-07-07
 * @deprecated Use {@link SignatureConfig} instead.
 */
export type SignatureEntryLocation = 'ON_SCREEN' | 'ON_RECEIPT' | 'NONE';

/**
 * Signature configuration. Replaces the deprecated signatureEntryLocation field.
 *
 * When the entire signatureConfig is not provided, the SUNBAY platform signature configuration is used by default.
 *
 * @since 2026-08-06
 */
export interface SignatureConfig {
  /**
   * Whether to use SUNBAY platform's signature configuration.
   * When true, platform configuration is used and entryLocation/threshold are ignored.
   * When false, the configuration provided in this request is used.
   * @default true
   */
  useHostConfig?: boolean;

  /**
   * Signature entry location. Required when useHostConfig is false.
   * ON_SCREEN: terminal screen signature; ON_RECEIPT: receipt signature; NONE: no signature.
   */
  entryLocation?: SignatureEntryLocation;

  /**
   * Signature threshold amount in smallest currency unit.
   * When transaction amount >= this value, signature is required; below this value, signature is skipped.
   * Only effective when useHostConfig is false and entryLocation is not NONE.
   * When not provided, signature is required for all amounts.
   */
  threshold?: number;
}
