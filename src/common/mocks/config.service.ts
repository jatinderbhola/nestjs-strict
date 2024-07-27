export class MockConfigService {
  get(key: string): any {
    const mockValues: { [key: string]: any } = {
      appName: 'Test App',
      version: '1.0.0',
      env: 'test',
      launchDarklySDKKey: 'mock-sdk-key',
      featureFlags: {
        isTrueTestFlagEnabled: true,
        isFalseTestFlagEnabled: false,
      },
    };
    return mockValues[key];
  }
}
