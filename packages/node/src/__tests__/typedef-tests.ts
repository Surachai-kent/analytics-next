import { AnalyticsNode } from '../'

/**
 * These are general typescript definition tests;
 * They aren't meant to be run by anything but the typescript compiler.
 */
export default {
  'analytics.VERSION should be readonly': () => {
    const analytics = new AnalyticsNode({ writeKey: 'abc' })
    // should work
    analytics.VERSION

    // @ts-expect-error - should not be possible
    analytics.VERSION = 'foo'
  },

  'track/id/pg/screen/grp calls should require either userId or anonymousId':
    () => {
      const analytics = new AnalyticsNode({ writeKey: 'abc' })
      const method: 'track' | 'identify' | 'page' | 'screen' | 'group' = 'track'

      // @ts-expect-error - no userID
      analytics[method]({ event: 'foo' })

      analytics[method]({ event: 'foo', userId: 'bar' })
      analytics[method]({ event: 'foo', anonymousId: 'bar' })
      analytics[method]({ event: 'foo', anonymousId: 'bar', userId: 'bar' })
    },

  'alias does not need a userId': () => {
    const analytics = new AnalyticsNode({ writeKey: 'abc' })

    // @ts-expect-error - no userId
    analytics.alias({ previousId: 'old_id_either_anon_or_regular' })

    analytics.alias({
      userId: 'new',
      previousId: 'old_id_either_anon_or_regular',
    })

    analytics.alias({
      // @ts-expect-error - anonymousId is not valid
      anonymousId: 'old_id_either_anon_or_regular',
      previousId: 'foo',
    })
  },
}
