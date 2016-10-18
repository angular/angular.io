#!/usr/bin/env bash

set -e -o pipefail

[[ -z "$NGIO_ENV_DEFS" ]] && . ./scripts/env-set.sh
[[ -n "$TRAVIS" ]] && . ./scripts/env-info-and-check.sh

if [ -z "$TRAVIS" ]; then
    set -x
    npm install -g gulp --no-optional
    set +x
fi
