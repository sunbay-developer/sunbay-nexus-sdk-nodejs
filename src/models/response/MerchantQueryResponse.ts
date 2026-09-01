import { BaseResponse, BaseResponseImpl } from '../common/BaseResponse';
import { MerchantMidItem } from '../common/MerchantMidItem';

/**
 * Merchant query response
 *
 * @since 2026-09-01
 */
export interface MerchantQueryResponse extends BaseResponse {
  /**
   * Merchant ID
   */
  merchantId?: string;

  /**
   * "Doing Business As" name — the merchant's public/trading name shown to customers
   */
  dbaName?: string;

  /**
   * Merchant Category Code (ISO 18245)
   */
  mcc?: string;

  /**
   * ISO 3166-1 alpha-3 country code
   */
  country?: string;

  /**
   * State or province name
   */
  stateName?: string;

  /**
   * City name
   */
  cityName?: string;

  /**
   * Street address
   */
  street?: string;

  /**
   * Full detailed address (street number, suite, etc.)
   */
  detailAddress?: string;

  /**
   * Postal / ZIP code
   */
  zipCode?: string;

  /**
   * Merchant status. Y: active, N: inactive
   */
  status?: string;

  /**
   * Merchant creation time (ISO 8601)
   */
  createTime?: string;

  /**
   * MIDs assigned to this merchant by each payment channel (Processor).
   * A merchant may be onboarded to multiple processors, and each processor assigns its own MID.
   * Returns an empty array if no payment channel has been enabled yet.
   */
  midList?: MerchantMidItem[];
}

export class MerchantQueryResponseImpl extends BaseResponseImpl implements MerchantQueryResponse {
  public merchantId?: string;
  public dbaName?: string;
  public mcc?: string;
  public country?: string;
  public stateName?: string;
  public cityName?: string;
  public street?: string;
  public detailAddress?: string;
  public zipCode?: string;
  public status?: string;
  public createTime?: string;
  public midList?: MerchantMidItem[];
}
