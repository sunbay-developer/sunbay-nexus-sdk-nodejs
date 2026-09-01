import { SunbayBusinessError } from '../errors/SunbayBusinessError';
import { ApiConstants } from '../constants/ApiConstants';

/**
 * JSON utility class
 *
 * @since 2025-12-24
 */
export class JsonUtil {
  private constructor() {
    // Utility class, prevent instantiation
  }

  /**
   * Convert object to JSON string, omitting null values
   *
   * @param obj object
   * @return JSON string
   */
  public static toJson(obj: any): string | null {
    if (obj === null || obj === undefined) {
      return null;
    }
    try {
      return JSON.stringify(obj, (_key, value) => {
        if (value === null) {
          return undefined;
        }
        return value;
      });
    } catch (e: any) {
      throw new SunbayBusinessError(
        ApiConstants.ERROR_CODE_PARAMETER_ERROR,
        `Failed to serialize object to JSON: ${e?.message || String(e)}`
      );
    }
  }
}

