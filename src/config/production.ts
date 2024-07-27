import defaultConfig from './configuration';

export default () => ({
  ...defaultConfig,
  documentation: {
    enabled: false,
  },
});
