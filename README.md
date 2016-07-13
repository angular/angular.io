# Angular.io
[![Build Status][travis-badge]][travis-badge-url]

Angular.io는 Angular2의 **문서**를 위한 사이트입니다.

이 사이트는 Angular 2, Angular 1, Angular Material, 그리고 AngularFire를 포함한
angular와 관련된 유용한 자료들의 링크를 포함하고 있습니다.

## 이슈(Issues)

**Developer Guide, Cookbook, 그리고 code sample issues 는 _이곳에만_**
[Angular.io](https://github.com/angular/angular.io/issues) github repo에 남겨주시기 바랍니다.

Angular와 관련있는 **Angular API issues, cheatsheet corrections, feature requests, defect reports, and technical questions**concerning Angular itself의 내용들은 [**angular source code**](https://github.com/angular/angular/issues) github repo에 남겨주시기 바랍니다. 위의 주제들은 저희가 이곳에서 처리하거나 angular repo로 재작성을 해달라고 요청할 수 없습니다.

## 도움을 줄 수 있는 방법(How you can help)

이슈를 제기하는 것도 좋지만 **pull requests**를 통해 내용을 제출하는 것이 docs에 더 좋습니다!

[Angular.io에 기여하기](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md)는 이곳을 참고해주세요.

##  개발 설정(Development Setup)
이 사이트는 node와 npm에 많이 의존하고 있습니다.

1. 최신버전의 node와 npm을 사용하시기 바랍니다. : 설치되어 있지 않다면 [nvm](https://github.com/creationix/nvm)을 이용해 node를 설치하세요.

1. npm package를 *글로벌영역*에 설치하세요 : `npm install -g harp gulp`

1. 이 repo와 [angular source code repo](https://github.com/angular/angular)를 같은 폴더에 클론하세요.
클론된 2개의 repo는 반드시 같은 폴더 내에 있어야 합니다.

1. `angular.io/`의 기본폴더로 이동하세요.

1. `npm install`을 이용하여 *모든 문서들*의 로컬 패키지들을 설치하세요.
> 만약 node v.5+를 이용한다면, 별도로 `node-sass`를 설치해야 합니다.: `npm rebuild node-sass`

1. [아래](#code-sample-development)의 개발 준비를 위한 샘플코드를 참고하세요

## 내용 구성(Content Development)
모든 문서의 내용은 Jade의 [구문](http://jade-lang.com/reference/)으로 쓰여졌습니다.
공백이 중요한 언어의 엄격한 기준에 유의하시기 바랍니다.
내용을 편집할 때 *당신이 타이핑하면서* 변한 것을 확인하기 위해서
gulp `serve-and-sync` 명령어[아래 참조](#serve-and-sync) 를 사용하기를 강력하게 추천합니다.

이 문서는 특정 스타일과 믹스인을 사용하고 있습니다.
해당 내용에 대해서는 [스타일가이드 문서](https://angular.io/docs/ts/latest/styleguide.html)를 참고하세요.

jade문서 파일들은 `public/docs`아래 각 언어별 폴더에 있습니다.
예를 들면, 타입스크립트 문서는 모두 `public/docs/ts/latest`에 있습니다.
예시)
- `public/docs/ts/latest/quickstart.jade`
- `public/docs/ts/latest/guide/architecture.jade`
- `public/docs/ts/latest/cookbook/component-communication.jade`
- `public/docs/ts/latest/tutorial/toh-pt5.jade`

### Local server with watches and browser reload
 1. 루트 폴더인 `angular.io/`로 현재폴더를 변경하세요
 1. `gulp serve-and-sync` 를 실행하세요.
 1. localhost:3000으로 브라우저가 실행되고, 변경사항은 자동으로 반영됩니다.

<a id="serve-and-sync"></a>
만약 개발가이드(dev guide)와 같이 문서들 중 일부만 동작시킬 거라면, 파일시스템 중 일부만 감시(watch)하도록 세부적인 gulp task를 사용할 수 있습니다.

* `gulp serve-and-sync` : 모든 로컬 Jade/Sass파일, API 소스와 예저들, 그리고 개발가이드 파일 감시(watch)
* `gulp serve-and-sync-api` : API 소스와 예제 파일들만 감시(watch)
* `gulp serve-and-sync-devguide` : 개발가이드(dev guide)파일만 감시
* `gulp build-and-serve` : 로컬 Jade/Sass 파일만 감시

## 코드 샘플 개발(Code Sample Development)

모든 문서들은 샘플코드와 플렁커(plunkers)에 의해 지원됩니다.
이런 코드는 `public/docs/_examples`폴더안에, 세부 폴더 아래, 언어 트랙에 따라 나누어져 있습니다.

예를 들면, 타입스크립트 퀵스타트 샘플은 `public/docs/_examples/quickstart/ts`에 있습니다.

모든 샘플들은 일관된 폴더 구조로 되어있습니다. 또한 Angular2의 최신 버전을 포함하며, 동일한 스타일과 npm 패키지를 사용합니다.
이런 일관성은 gulp-driven 툴 덕분에 가능합니다.
로컬에서 샘플을 실행하고, 제대로 작동하는지 확인하기 위해서,
아래의 추가적인 단계를 거쳐야 합니다 :

1. 현재폴더를 `public/docs/_examples`로 변경하세요.

1. 모든 샘플에서 사용하기 위해 `npm install`을 통해 정규 노드 패키지를 설치하세요.

1. `cd ../../..`로 `angular.io`의 루트폴더로 돌아가세요.

1. `gulp add-example-boilerplate`을 실행시키세요. (윈도우의 경우 관리자권한으로 실행하세요)
그것을 통해 정규 파일들을 샘플 디렉토리들로 복사하고, 노드모듈(node_modules)과 타이핑(typings)를 위해 심볼릭링크(symlinks)를 만들 수 있습니다.

이제 특정 샘플의 언어 디렉토리(예,`public/docs/_examples/quickstart/ts`)로 현재폴더를 변경 후 실행하세요.
- `npm start` :  컴파일 감시/실행(compile-with-watch)과 브라우저 감시/실행(serve-in-browser-with-watch)를 함께 실행
- `npm run tsc` : 컴파일 실행
- `npm run lite` : 브라우저 감시 및 실행

기타 옵션은 `package.json`에 스크립트를 참고하세요.
플렁커(plunker)에서 코드 실행을 보고 싶다면 `plunkr.no-link.html`를 참고하세요.
(우선 플렁커 생성 또는 업데이트를 위해 `gulp build-plunkers`를 먼저 실행하세요)

예제들에 린트 에러(lint errors)가 없는지 반드시 확인하세요.
- `gulp lint`

### 샘플 엔드-투-엔드 테스트(Sample end-to-end tests)

모든 샘플들은 어느정도 엔드-투-엔드 테스트를 통과해야 합니다 :
- `gulp run-e2e-tests` : 타입스크립트와 자바스크립트 테스트 실시
- `gulp run-e2e-tests --lang=dart` : 다트 테스트 실시
- `gulp run-e2e-tests --lang=all` : 타입스크립트, 자바스크립트, 다트 테스트 실시
- `gulp run-e2e-tests --filter=quickstart` : 이름으로, 실행하는 예제 필더링
- `gulp run-e2e-tests --fast` : npm 설치, 웹드라이버 업데이트, 보일러플레이트 복사 무시하기

옵션을 조합하여 사용할 수 있습니다.

### 프로젝트 리셋하기(Resetting the project)
만약 민트 상태로 리셋시키고 싶다면, 아래 명령어를 실행시키세요. 많은 비추적 파일(untracked files)을 생성할 것입니다 :

- `git clean -xdf`

리눅스/OSX 사용자의 경우, 프로젝트 셋업 시 아래 경로의 스크립트를 참고하세요 :

- `./scripts/install.sh`


## 사용 기술(Technology Used)
- Angular 1.x: Angular의 제품 준비 버젼
- Angular Material: Angular.js의 재료디자인(Material Design) 구현
- Gulp: 노드 기반 툴
- Harp: 전처리가 내장된 정적 웹 서버
- Sass: 전문가 수준의 CSS 확장언어
- Normalize: 브라우저 간 HTML 기본 스타일의 일관성을 유지하도록 돕는 CSS
- Grids: 사용자맞춤형 Sass/CSS 그리드 프레임워크
- Prettify: 자바스크립트 모듈과 CSS 소스코드의 신택스 하이라이트
- Icomoon: 사용자 지정 기본 아이콘 글꼴


## 라이센스
Google 제공 ©2010-2016. 코드 라이센스 [MIT-style License](https://github.com/angular.io/blob/master/LICENSE). 문서 라이센스 [CC BY 4.0](http://creativecommons.org/licenses/by/4.0/).

[travis-badge]: https://travis-ci.org/angular/angular.io.svg?branch=master
[travis-badge-url]: https://travis-ci.org/angular/angular.io
