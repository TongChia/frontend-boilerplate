const defaultBundleDllName = 'dll';

function Vendors (_hlp, _pkg) {
  const hlpCnf = _hlp || require('../helper.js');
  const pkgCnf = _pkg || require('../../package.json');

  if (!hlpCnf.libraries || !pkgCnf.dependencies)
    return {};

  this._libs = hlpCnf.libraries;
  this._deps = pkgCnf.dependencies;
}

Vendors.prototype.getEffectiveModules = function () {
  const modules = {};
  const deps = Object.keys(this._deps);
  const depsUp = deps.join(',');
  const libs = this._libs.map(l => {
    if (typeof l == 'string')
      return {name: l};
    if (typeof l == 'object' && l.name && ( !l.type || l.type == 'npm'))
      return l;
  });

  libs.forEach(l => {
    if (l && depsUp.match(l.name)) {
      if ((!l.bundle || l.bundle == defaultBundleDllName)) {
        if (!modules[defaultBundleDllName])
          modules[defaultBundleDllName] = [];
        modules[defaultBundleDllName].push(l.name);
      }
      else if (l.bundle && l.bundle != defaultBundleDllName) {
        if (!modules[l.bundle])
          modules[l.bundle] = [];
        modules[l.bundle].push(l.name);
      }
    }
  });

  this._modules = modules;

  return this._modules;
};

Vendors.prototype.getManifest = function () {
  const entry = this._modules || this.getEffectiveModules();
  this._manifest = Object.keys(entry).map(m => `${m}.manifest.json`);
  return this._manifest;
};

Vendors.prototype.getBundle = function () {
  const entry = this._modules || this.getEffectiveModules();
  this._bundle = Object.keys(entry).map(m => `${m}.bundle.js`);
  return this._bundle;
};

Vendors.prototype.getBundleJsTags = function () {
  const bundle = this._bundle || this.getBundle();
  this._tags = bundle.map(js => `<script type="text/javascript" src="${js}"></script>`);
  return this._tags;
};

// TODO: depsUp.match has bug
// TODO: support custom modules
// TODO: write cache file to tmp dir

module.exports = Vendors;
