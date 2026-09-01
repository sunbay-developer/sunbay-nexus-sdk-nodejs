import { TerminalTidItem } from './TerminalTidItem';

/**
 * Terminal information bound to a merchant
 *
 * @since 2026-09-01
 */
export interface TerminalItem {
  /**
   * Terminal serial number
   */
  sn?: string;

  /**
   * Device vendor / manufacturer
   */
  vendor?: string;

  /**
   * Device model
   */
  model?: string;

  /**
   * Time the terminal was bound to the merchant (ISO 8601)
   */
  createTime?: string;

  /**
   * TIDs assigned to this terminal by each payment channel (Processor).
   * A terminal may be onboarded to multiple processors, and each processor assigns its own TID.
   * Returns an empty array if no payment channel has been enabled for the terminal yet.
   */
  tidList?: TerminalTidItem[];
}
