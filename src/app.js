import './index.scss';

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
