/* global describe, it */
import chai from 'chai';
import config from 'CONFIG';

chai.should();

const v = 1 + 1;
const appName = config.appName;

describe('One mocha test', () => {
  it('v should be 2', () => {
    v.should.be.equal(2);
  });

  it('v should be 2', () => {
    appName.should.be.equal('frontend boilerplate test');
  });
});
