import { env } from '@ssense/env';
import devConfig from './configuration.development';
import prodConfig from './configuration.production';
import testConfig from './configuration.test';

const appName = env('APP_NAME', 'ms-shippingxp');
const nodeEnv = env('NODE_ENV', 'development');

export default () => ({
  appName,
  appId: `${appName}-${nodeEnv}`,
  userAgent: appName,
  version: env('DD_VERSION', '1.0.0'),
  port: env('APP_PORT', 8080),
  env: nodeEnv,
  shutdownWaitTimeout: env('SHUTDOWN_WAIT_TIMEOUT', 5000),
  logger: {
    enabled: true,
    level: env('LOG_LEVEL', 3),
  },
  accessLogger: {
    enabled: true,
  },
  appMetrics: {
    host: env('NODE_IP', '127.0.0.1'),
    prefix: 'ssense.ms_sxp',
    globalTags: [`service:${appName}`, `env:${nodeEnv}`],
  },
  documentation: {
    enabled: false,
  },
  featureFlags: {
    isDmShippingDebugModeEnabled: false,
  },
  launchDarklySDKKey: env('LAUNCH_DARKLY_SDK_KEY', ''),
  // TODO: Uncomment the below code once the redis is setup
  // launchDarklyRedis: {
  //     host: env('LAUNCH_DARKLY_REDIS_HOST', 'localhost'),
  //     port: env('LAUNCH_DARKLY_REDIS_PORT', 6379),
  // },

  ...(
    process.env.NODE_ENV === 'production' ? prodConfig() :
      process.env.NODE_ENV === 'development' ? devConfig() :
        process.env.NODE_ENV === 'test' ? testConfig() : {}
  )
});
