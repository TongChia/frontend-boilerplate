import './index.scss';
import * as config from 'CONFIG';

function title () {
  const app = document.getElementById('app');
  if (app)
    app.innerHTML = config.appName;
  else
    document.getElementsByTagName('body')[0].append(config.appName);
}

title();
