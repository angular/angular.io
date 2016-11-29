 #!/usr/bin/env bash

set -ex -o pipefail

PREFIX=2.0.0-

if [ "$PREVIEW_BRANCH" != "master" ]; then
  PREVIEW_BRANCH=$PREFIX$(git ls-remote https://github.com/angular/angular | grep $LATEST_RELEASE_BRANCH)
  PREVIEW_BRANCH=${PREVIEW_BRANCH:0:13}
fi

./scripts/examples-install.sh
(cd public/docs/_examples && npm install angular/{core,common,compiler,platform-browser,platform-browser-dynamic,http,forms,router,upgrade}-builds#$PREVIEW_BRANCH --no-optional)
