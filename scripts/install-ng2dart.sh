#!/usr/bin/env bash

set -e -o pipefail

[[ -z "$NGIO_ENV_DEFS" ]] && . ./scripts/env-set.sh

./scripts/install-dart-sdk.sh

travis_fold start install.ng2dart
if  [[ -z "$(type -t dart)" ]]; then
    echo "No Dart SDK: aborting install of Angular2/Dart"
    exit 1;
elif [[ -e "$NG2DART_REPO" ]]; then
    echo Angular2/Dart found at: $NG2DART_REPO
else
    echo GETTING Angular2/Dart from pub package ...
    set -x
    # Get ng2dart via pub on ng.io pubspec.yaml
    pub upgrade > /dev/null

    NG2DART_PUB=`find ~/.pub-cache/ -type d -name "angular2*" | xargs ls -dtr | tail -1`

    cp -r $NG2DART_PUB $NG2DART_REPO
fi

# Run pub on ng2dart
(cd $NG2DART_REPO && pub get)
set +x
travis_fold end install.ng2dart
