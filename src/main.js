import './style.css';

const config = CONFIG;

function title () {
  const app = document.getElementById('app');
  if (app)
    app.innerHTML = `
    <h1>
      ${config.appName}
    </h1>
    `;
}

title();
