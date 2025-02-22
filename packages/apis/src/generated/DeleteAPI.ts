import {InfluxDB} from '@influxdata/influxdb-client'
import {APIBase, RequestOptions} from '../APIBase'
import {DeletePredicateRequest} from './types'

export interface PostDeleteRequest {
  /** Deletes data from an InfluxDB bucket. */
  body: DeletePredicateRequest
  /** Specifies the organization to delete data from. */
  org?: string
  /** Specifies the bucket to delete data from. */
  bucket?: string
  /** Specifies the organization ID of the resource. */
  orgID?: string
  /** Specifies the bucket ID to delete data from. */
  bucketID?: string
}
/**
 * Delete API
 */
export class DeleteAPI {
  // internal
  private base: APIBase

  /**
   * Creates DeleteAPI
   * @param influxDB - an instance that knows how to communicate with InfluxDB server
   */
  constructor(influxDB: InfluxDB) {
    this.base = new APIBase(influxDB)
  }
  /**
   * Delete data.
   * See {@link https://docs.influxdata.com/influxdb/v2.1/api/#operation/PostDelete }
   * @param request - request parameters and body (if supported)
   * @param requestOptions - optional transport options
   * @returns promise of response
   */
  postDelete(
    request: PostDeleteRequest,
    requestOptions?: RequestOptions
  ): Promise<void> {
    return this.base.request(
      'POST',
      `/api/v2/delete${this.base.queryString(request, [
        'org',
        'bucket',
        'orgID',
        'bucketID',
      ])}`,
      request,
      requestOptions,
      'application/json'
    )
  }
}
