/**
 * Transaction status enum
 *
 * @since 2025-12-24
 */
export enum TransactionStatus {
  /**
   * Initial state
   */
  INITIAL = 'INITIAL',

  /**
   * Transaction processing. Channel called but no result obtained, or unexpected
   * exception returned.
   */
  PROCESSING = 'PROCESSING',

  /**
   * Transaction successful
   */
  SUCCESS = 'SUCCESS',

  /**
   * Transaction failed
   */
  FAIL = 'FAIL',

  /**
   * Transaction closed
   */
  CLOSED = 'CLOSED',
}

/**
 * Transaction status code mapping
 * API returns code (I, P, S, F, C), not enum name
 */
const TRANSACTION_STATUS_CODE_MAP: Record<string, TransactionStatus> = {
  'I': TransactionStatus.INITIAL,
  'P': TransactionStatus.PROCESSING,
  'S': TransactionStatus.SUCCESS,
  'F': TransactionStatus.FAIL,
  'C': TransactionStatus.CLOSED,
};

/**
 * Transaction status code to enum name mapping
 */
const TRANSACTION_STATUS_CODE_TO_NAME: Record<string, string> = {
  'I': 'INITIAL',
  'P': 'PROCESSING',
  'S': 'SUCCESS',
  'F': 'FAIL',
  'C': 'CLOSED',
};

/**
 * Transaction status utilities
 */
export class TransactionStatusUtil {
  /**
   * Get transaction status code
   *
   * @param status transaction status enum
   * @return status code (I, P, S, F, C)
   */
  public static getCode(status: TransactionStatus): string {
    const codeMap: Record<TransactionStatus, string> = {
      [TransactionStatus.INITIAL]: 'I',
      [TransactionStatus.PROCESSING]: 'P',
      [TransactionStatus.SUCCESS]: 'S',
      [TransactionStatus.FAIL]: 'F',
      [TransactionStatus.CLOSED]: 'C',
    };
    return codeMap[status] || '';
  }

  /**
   * Get transaction status description
   *
   * @param status transaction status enum
   * @return status description
   */
  public static getDesc(status: TransactionStatus): string {
    return status.toString();
  }

  /**
   * Convert code to transaction status enum
   *
   * @param code status code (I, P, S, F, C)
   * @return transaction status enum, or undefined if code is invalid
   */
  public static fromCode(code: string): TransactionStatus | undefined {
    return TRANSACTION_STATUS_CODE_MAP[code];
  }

  /**
   * Convert code or enum name to transaction status enum
   * Supports both code (I, P, S, F, C) and enum name (INITIAL, PROCESSING, etc.)
   *
   * @param value code or enum name
   * @return transaction status enum, or undefined if value is invalid
   */
  public static fromValue(value: string): TransactionStatus | undefined {
    if (!value) {
      return undefined;
    }
    
    // Try code first (I, P, S, F, C)
    const fromCode = TRANSACTION_STATUS_CODE_MAP[value];
    if (fromCode !== undefined) {
      return fromCode;
    }
    
    // Try enum name (INITIAL, PROCESSING, etc.)
    const upperValue = value.toUpperCase();
    if (upperValue in TransactionStatus) {
      return TransactionStatus[upperValue as keyof typeof TransactionStatus] as TransactionStatus;
    }
    
    return undefined;
  }
}

