Frontend Boilerplate
===
Maintainer: [Tong Chia](http://www.tongchia.me)  
> A stable front-end boilerplate. In order to adapt to different frameworks and platforms such as: react, angular, backbone, electron, condova ...    

#### ES6/ES7 Support  
[<img src="https://s3-us-west-2.amazonaws.com/svgporn.com/logos/babel.svg" width="384" alt="babel"/>](https://babeljs.io/)  
#### Compiler & Helper  
[<img src="https://s3-us-west-2.amazonaws.com/svgporn.com/logos/gulp.svg" width="84" alt="gulp"/>](http://gulpjs.com/)
[<img src="https://cdn.svgporn.com/logos/webpack.svg" width="160" alt="webpack"/>](http://webpack.github.io/)
[<img src="https://s3-us-west-2.amazonaws.com/svgporn.com/logos/postcss.svg" width="164" alt="postcss"/>](https://github.com/postcss/postcss)
[<img src="https://s3-us-west-2.amazonaws.com/svgporn.com/logos/browsersync.svg" width="128" alt="gulp"/>](http://www.browsersync.io/)  
#### Testing
[<img src="https://s3-us-west-2.amazonaws.com/svgporn.com/logos/karma.svg" width="186" alt="karma"/>](http://karma-runner.github.io/)
[<img src="https://s3-us-west-2.amazonaws.com/svgporn.com/logos/mocha.svg" width="160" alt="mocha"/>](http://mochajs.org/)
[<img src="https://s3-us-west-2.amazonaws.com/svgporn.com/logos/chai.svg" width="160" alt="chai"/>](http://chaijs.com/)  
#### Lint
[<img src="https://s3-us-west-2.amazonaws.com/svgporn.com/logos/eslint.svg" width="160" alt="eslint"/>](http://eslint.org/)  


## Guide
```sh
> git clone "https://github.com/TongChia/frontend-boilerplate.git" my-app
> cd my-app
> npm install
> npm run serve
```


## Description
#### Directory
```sh
.
├── .tmp/
├── config/
│   ├── gulp/
│   │   ├── browsersync.task.js
│   │   ├── misc.task.js
│   │   └── webpack.task.js
│   ├── webpack/
│   │   ├── app.js
│   │   ├── base.js
│   │   └── dll.js
│   ├── default.js
│   ├── development.js
│   ├── production.js
│   └── test.js
├── src/
│   ├── app.js
│   ├── index.html
│   └── index.scss
├── test/
├── dist/
├── .babelrc
├── .dockerignore
├── .editorconfig
├── .eslintrc
├── .gitignore
├── LICENSE
├── README.md
├── gulpfile.js
├── webpack.config.js
└── package.json
```

#### Config
- webpack config  
  - base  
  - app  
  - dll  
- gulp task  
  - webpack  
- "env".js

enabled **cssnext** by default  

**With ENV switch different modes**  

#### ENV
- NODE_ENV  
  ex: `NODE_ENV=production`  
  Affect the webpack configuration to dev, build or test mode.  
- PORT  
  Browser-sync server port.
- WATCH  
  ex: `WATCH=true`  
  Enable webpack **watch** mode.  
  Enabled in dev env by default.  
- TARGET  
  ex: `TARGET=browser`  
- DLL_FILES  
  ex: `DLL_FILES=vendor.dll.js,react.dll.js`  
  If exists, load `DllReferencePlugin` to webpack for optimize the compiler.  
  Gulp task will auto add it when configured.

## TODO
- [ ] Yeoman Generator  
