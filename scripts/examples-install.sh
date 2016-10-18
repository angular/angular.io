#!/usr/bin/env bash

set -ex -o pipefail

(cd public/docs/_examples && npm install --no-optional)
npm run webdriver:update --prefix public/docs/_examples
gulp add-example-boilerplate
