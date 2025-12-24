import { randomUUID } from 'crypto';

/**
 * ID generator utility
 *
 * @since 2025-12-24
 */
export class IdGenerator {
  private constructor() {
    // Utility class, prevent instantiation
  }

  /**
   * Generate UUID
   *
   * @return UUID string
   */
  public static generateUUID(): string {
    return randomUUID();
  }

  /**
   * Generate request ID
   *
   * @return request ID
   */
  public static generateRequestId(): string {
    return IdGenerator.generateUUID();
  }
}

