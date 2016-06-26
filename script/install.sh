#!/usr/bin/env bash

set -ex -o pipefail

npm install --no-optional
(cd public/docs/_examples && npm install)
(cd public/docs/_examples/_protractor && npm install)
npm run webdriver:update --prefix public/docs/_examples/_protractor
gulp add-example-boilerplate
