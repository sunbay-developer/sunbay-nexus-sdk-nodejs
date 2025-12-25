/**
 * Entry mode class
 * API returns entry mode name (MANUAL, SWIPE, etc.), SDK converts to EntryMode instance
 *
 * @since 2025-12-24
 */
export class EntryMode {
  /**
   * Manual entry (code: "MANUAL")
   */
  public static readonly MANUAL = new EntryMode('MANUAL');

  /**
   * Swipe card (code: "SWIPE")
   */
  public static readonly SWIPE = new EntryMode('SWIPE');

  /**
   * Fallback swipe (code: "FALLBACK_SWIPE")
   */
  public static readonly FALLBACK_SWIPE = new EntryMode('FALLBACK_SWIPE');

  /**
   * Contact chip (code: "CONTACT")
   */
  public static readonly CONTACT = new EntryMode('CONTACT');

  /**
   * Contactless (code: "CONTACTLESS")
   */
  public static readonly CONTACTLESS = new EntryMode('CONTACTLESS');

  private readonly code: string;

  private constructor(code: string) {
    this.code = code;
  }

  /**
   * Get entry mode code
   *
   * @return entry mode code
   */
  public getCode(): string {
    return this.code;
  }

  /**
   * Convert code to entry mode
   *
   * @param code entry mode code
   * @return entry mode, or undefined if code is invalid
   */
  public static fromCode(code: string): EntryMode | undefined {
    const codeMap: Record<string, EntryMode> = {
      'MANUAL': EntryMode.MANUAL,
      'SWIPE': EntryMode.SWIPE,
      'FALLBACK_SWIPE': EntryMode.FALLBACK_SWIPE,
      'CONTACT': EntryMode.CONTACT,
      'CONTACTLESS': EntryMode.CONTACTLESS,
    };
    return codeMap[code];
  }
}

