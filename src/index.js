import './index.scss';
import _ from 'lodash';

// const {omit} = _;

const obj = {
  foo: 'bar',
  bar: 'foo',
  msg: 'Hello! Tong~'
};

function hello () {
  const ele = document.getElementById('hello');
  ele.innerHTML = obj.msg;
}

hello();
