import config from 'config';
import {expect} from 'chai';

describe('APP TEST', () => {
  it('env should be test', () => {
    expect(config.env).to.equal('test');
  });
});
