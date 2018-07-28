import './index.css';

const config = CONFIG;

function title () {
  const app = document.getElementById('app');
  if (app)
    app.innerHTML = `
    <h1>
      ${config.appName}
    </h1>
    `;
  else
    document.getElementsByTagName('body')[0].append(config.appName);
}

title();
