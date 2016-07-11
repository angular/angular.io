#!/usr/bin/env bash

set -ex -o pipefail

(cd ../ && git clone https://github.com/angular/angular.git --branch $LATEST_RELEASE)