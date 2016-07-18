#!/usr/bin/env bash

set -e -o pipefail

./scripts/env-info-and-check.sh

if [[ 0 ]]; then
    # Doesn't seem to be necessary. Disabling.
    travis_fold start install.globals
    set -x
    npm install -g gulp --no-optional
    set +x
    travis_fold end install.globals
fi
