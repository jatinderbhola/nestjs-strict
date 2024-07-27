export class MockLoggerService {
  get logger() {
    return { info: jest.fn(), error: jest.fn() }; // Mock methods as needed
  }
}
