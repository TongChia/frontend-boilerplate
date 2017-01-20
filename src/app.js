import './index.scss';
import * as config from '$config';

function title () {
  const app = document.getElementById('app');
  if (app)
    app.innerHTML = config.appName;
  else
    document.getElementsByTagName('body')[0].append(config.appName);
}

title();
