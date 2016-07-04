#!/usr/bin/env bash

set -ex -o pipefail

npm install --no-optional
(cd public/docs/_examples && npm install --no-optional)
(cd public/docs/_examples/_protractor && npm install --no-optional)
npm run webdriver:update --prefix public/docs/_examples/_protractor
gulp add-example-boilerplate
