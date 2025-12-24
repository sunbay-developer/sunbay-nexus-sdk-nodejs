import * as os from 'os';
import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * User-Agent utility for generating SDK User-Agent string
 * <p>
 * Format: SunbayNexusSDK-{Language}/{SDKVersion} {Language}/{LanguageVersion} {OS}/{OSVersion}
 * Example: SunbayNexusSDK-Node.js/1.0.0 Node.js/18.17.0 Darwin/25.1.0
 * </p>
 *
 * @since 2025-12-24
 */
export class UserAgentUtil {
  private static readonly SDK_NAME = 'SunbayNexusSDK-Node.js';
  private static readonly LANGUAGE = 'Node.js';
  private static readonly UNKNOWN_VERSION = 'unknown';

  private static cachedUserAgent: string | null = null;

  private constructor() {
    // Utility class, prevent instantiation
  }

  /**
   * Generate User-Agent string
   * <p>
   * Format: SunbayNexusSDK-Node.js/{SDKVersion} Node.js/{NodeVersion} {OS}/{OSVersion}
   * </p>
   *
   * @return User-Agent string
   */
  public static getUserAgent(): string {
    if (UserAgentUtil.cachedUserAgent === null) {
      UserAgentUtil.cachedUserAgent = UserAgentUtil.buildUserAgent();
    }
    return UserAgentUtil.cachedUserAgent;
  }

  /**
   * Build User-Agent string dynamically
   *
   * @return User-Agent string
   */
  private static buildUserAgent(): string {
    const sdkVersion = UserAgentUtil.getSdkVersion();
    const nodeVersion = UserAgentUtil.getNodeVersion();
    const osName = UserAgentUtil.normalizeOsName(os.type());
    const osVersion = os.release() || UserAgentUtil.UNKNOWN_VERSION;

    return `${UserAgentUtil.SDK_NAME}/${sdkVersion} ${UserAgentUtil.LANGUAGE}/${nodeVersion} ${osName}/${osVersion}`;
  }

  /**
   * Get SDK version from package.json
   *
   * @return SDK version, or "unknown" if not available
   */
  private static getSdkVersion(): string {
    try {
      // Try to get version from package.json
      const packageJsonPath = join(__dirname, '../../package.json');
      const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
      if (packageJson && packageJson.version && typeof packageJson.version === 'string') {
        return packageJson.version;
      }
    } catch (e) {
      // Ignore, fall through to default
    }
    return UserAgentUtil.UNKNOWN_VERSION;
  }

  /**
   * Get Node.js version
   *
   * @return Node.js version
   */
  private static getNodeVersion(): string {
    return process.version || UserAgentUtil.UNKNOWN_VERSION;
  }

  /**
   * Normalize OS name to match specification format
   * Examples:
   * - "Darwin" -> "Darwin"
   * - "Windows_NT" -> "Windows"
   * - "Linux" -> "Linux"
   *
   * @param osName original OS name
   * @return normalized OS name
   */
  private static normalizeOsName(osName: string): string {
    if (!osName || osName.length === 0) {
      return UserAgentUtil.UNKNOWN_VERSION;
    }

    const lowerOsName = osName.toLowerCase();
    if (lowerOsName.includes('darwin') || lowerOsName.includes('mac')) {
      return 'Darwin';
    } else if (lowerOsName.includes('windows')) {
      return 'Windows';
    } else if (lowerOsName.includes('linux')) {
      return 'Linux';
    } else if (lowerOsName.includes('unix')) {
      return 'Unix';
    }

    // Return original if no match
    return osName;
  }
}

