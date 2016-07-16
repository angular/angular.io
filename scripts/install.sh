#!/usr/bin/env bash

set -e -o pipefail

cd `dirname $0`/..

if [[ "$(node --version)" < "v5" ]]; then
    echo "ERROR: bad version of node detected. If you have nvm installed, type:"
    echo "  nvm use"
    echo "Aborting installation."
    exit 1;
else
    echo "Node version: $(node --version)"
fi

echo "Installing main packages ..."
npm install --no-optional

echo "Patching ..."
source ./scripts/patch.sh

if [ "$TRAVIS" != "true" ]; then
    echo "Rebuilding node-sass, just in case ..."
    npm rebuild node-sass;
fi

echo "Installing packages for examples ..."
source ./scripts/examples-install.sh
set +x

echo "Installation done"