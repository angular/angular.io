#!/usr/bin/env bash

set -e -o pipefail

[[ -z "$NGIO_ENV_DEFS" ]] && . ./scripts/env-set.sh
[[ -n "$TRAVIS" ]] && . ./scripts/env-info-and-check.sh

(set -x; npm install -g gulp --no-optional)
