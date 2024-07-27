import { FeatureFlagClient } from '@ssense/feature-flag';
import configuration from '../../config/default';

const featureFlags = configuration().featureFlags;
export type FeatureFlagType = typeof featureFlags;
export type FeatureFlagClientType = FeatureFlagClient<FeatureFlagType>;
