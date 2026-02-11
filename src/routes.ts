import { request, inputValidation } from './util/util'
import { ESIResponse } from './types'

type RouteFlag = 'shortest' | 'secure' | 'insecure'

export const routesModule = {
  /**
   * Get the systems between the origin and the destination.
   * @param origin Origin system ID
   * @param destination Destination system ID
   * @param flag Route planning flag
   * @param avoid Array of system IDs to avoid
   * @returns Array of system IDs representing the route
   */
  planRoute(
    origin: number,
    destination: number,
    flag: RouteFlag = 'secure',
    avoid: number[] = []
  ): Promise<ESIResponse> {
    const flagOptions: RouteFlag[] = ['shortest', 'secure', 'insecure']

    inputValidation({
      input: origin,
      type: 'number',
      message: `The function 'routes.planRoute' requires a origin!`,
    })
    inputValidation({
      input: destination,
      type: 'number',
      message: `The function 'routes.planRoute' requires a destination!`,
    })
    inputValidation({
      input: flag,
      type: 'string',
      options: flagOptions,
      message: `The input flag for 'routes.planRoute' must be 'shortest', 'secure' or 'insecure'!`,
    })

    return request({
      subUrl: `route/${origin}/${destination}`,
      query: {
        avoid,
        flag,
      },
    })
  },
}

export default routesModule