import { BaseResponse, BaseResponseImpl } from '../common/BaseResponse';
import { TerminalItem } from '../common/TerminalItem';

/**
 * Merchant terminals query response
 *
 * @since 2026-09-01
 */
export interface MerchantTerminalsQueryResponse extends BaseResponse {
  /**
   * Merchant ID (echoed from the request)
   */
  merchantId?: string;

  /**
   * Opaque pagination token for retrieving the next page.
   * Only present when more terminals are available; absence indicates the end of the list.
   */
  nextToken?: string;

  /**
   * Terminals on the current page
   */
  terminals?: TerminalItem[];
}

export class MerchantTerminalsQueryResponseImpl extends BaseResponseImpl implements MerchantTerminalsQueryResponse {
  public merchantId?: string;
  public nextToken?: string;
  public terminals?: TerminalItem[];
}
