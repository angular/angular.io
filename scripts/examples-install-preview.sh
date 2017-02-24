 #!/usr/bin/env bash

set -ex -o pipefail

./scripts/examples-install.sh
# For master branches (ng4) also install typescript@^2.1.5
if [[ "$PREVIEW_BRANCH" == "master" ]]; then
  EXTRA_PACKAGES="typescript@^2.1.5"
fi
(cd public/docs/_examples && npm install angular/{animations,core,common,compiler,compiler-cli,platform-browser,platform-browser-dynamic,platform-server,http,forms,router,tsc-wrapped,upgrade}-builds#$PREVIEW_BRANCH $EXTRA_PACKAGES --no-optional)
