/**
 * Batch close report print option.
 * TOTAL: summary only; DETAIL: transaction details only; BOTH: summary + details;
 * NONE: no report; AUTO: use SUNBAY platform configuration.
 *
 * @since 2026-08-06
 */
export type BatchClosePrintReceipt = 'TOTAL' | 'DETAIL' | 'BOTH' | 'NONE' | 'AUTO';
