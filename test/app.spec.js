import config from 'config';

describe('APP TEST', () => {
  test('env should be test', () => {
    expect(config.env).toBe('test');
  });
});
