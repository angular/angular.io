#!/usr/bin/env bash

set -e -o pipefail

[[ -z "$NGIO_ENV_DEFS" ]] && . ./scripts/env-set.sh

if  [[ -z "$(type -t dart)" ]]; then
    travis_fold start install.dart
    # curl https://storage.googleapis.com/dart-archive/channels/stable/release/latest/sdk/dartsdk-linux-x64-release.zip > $TMP/dartsdk.zip
    
    DART_ARCHIVE=https://storage.googleapis.com/dart-archive/channels
    ARCH=x64
    VERS=stable/release/latest/sdk
    OS_ZIP=dartsdk-$_OS_NAME-$ARCH-release.zip
    URL=$DART_ARCHIVE/$VERS/$OS_ZIP

    echo "Installing Dart SDK from:"
    echo "  $URL"

    [[ ! -d "$TMP" ]] && mkdir "$TMP"
    [[ ! -d "$PKG" ]] && mkdir "$PKG"

    curl $URL > "$TMP/$OS_ZIP" 2> /dev/null

    if [[ "1000" -lt "$(wc -c $TMP/$OS_ZIP | awk '{print $1}')" ]]; then
        unzip "$TMP/$OS_ZIP" -d "$PKG" > /dev/null
        rm -f "$TMP/$OS_ZIP"
        # PATH is set in ./scripts/env-set.sh
        dart --version
    else
        echo FAILED to download Dart SDK. Check URL.
    fi
    travis_fold end install.dart
else
    echo Dart SDK appears to be installed: `type dart`
    # PATH is set in ./scripts/env-set.sh
    dart --version
fi
