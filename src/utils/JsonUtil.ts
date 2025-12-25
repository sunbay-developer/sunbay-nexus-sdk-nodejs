import { SunbayBusinessError } from '../errors/SunbayBusinessError';

/**
 * JSON utility class
 *
 * @since 2025-12-24
 */
export class JsonUtil {
  private static readonly OBJECT_MAPPER_OPTIONS = {
    // Ignore unknown properties when deserializing
    ignoreUnknownProperties: true,
    // Ignore null values when serializing
    skipNullValues: true,
  };

  private constructor() {
    // Utility class, prevent instantiation
  }

  /**
   * Convert object to JSON string
   *
   * @param obj object
   * @return JSON string
   */
  public static toJson(obj: any): string | null {
    if (obj === null || obj === undefined) {
      return null;
    }
    try {
      return JSON.stringify(obj, (key, value) => {
        // Skip null values
        if (value === null && JsonUtil.OBJECT_MAPPER_OPTIONS.skipNullValues) {
          return undefined;
        }
        return value;
      });
    } catch (e: any) {
      throw new SunbayBusinessError(
        'Failed to serialize object to JSON',
        e?.message || String(e)
      );
    }
  }

  /**
   * Parse JSON string to object
   *
   * @param json JSON string
   * @param clazz target class (not used in JavaScript, kept for compatibility)
   * @return object
   */
  public static fromJson<T>(json: string | null, clazz?: new () => T): T | null {
    if (json === null || json === undefined || json.length === 0) {
      return null;
    }
    try {
      return JSON.parse(json) as T;
    } catch (e: any) {
      throw new SunbayBusinessError(
        'Failed to parse JSON to object',
        e?.message || String(e)
      );
    }
  }

  /**
   * Get ObjectMapper-like instance (for compatibility)
   * In JavaScript, we use JSON directly
   *
   * @return ObjectMapper-like instance
   */
  public static getObjectMapper(): any {
    return {
      readTree: (json: string) => {
        return JSON.parse(json);
      },
      treeToValue: (node: any, clazz: any) => {
        return node;
      },
    };
  }
}

