#!/usr/bin/env bash

set -e -o pipefail

[[ -z "$NGIO_ENV_DEFS" ]] && . ./scripts/env-set.sh

if [[ -e "$NG2_REPO" ]]; then
    echo Angular repo is already present at: $NG2_REPO
else
    travis_fold start install.ng2
    echo GETTING Angular from GitHub ...
    set -x
    git clone https://github.com/angular/angular.git $NG2_REPO
    git -C $NG2_REPO checkout $LATEST_RELEASE
    set +x
    travis_fold end install.ng2
fi

if [[ -e "$NG2DART_REPO" ]]; then
    echo Angular2 Dart repo is already present at: $NG2DART_REPO
elif [[ -n "$TRAVIS" ]]; then
    ./scripts/install-ng2dart.sh
# else
#    echo WARNING: no Angular2 Dart repo found at: $NG2DART_REPO
fi

echo INSTALLED repos:
ls -ld ../a*
