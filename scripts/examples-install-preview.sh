 #!/usr/bin/env bash

set -ex -o pipefail

./scripts/examples-install.sh
(cd public/docs/_examples && npm install angular/{core,common,compiler,platform-browser,platform-browser-dynamic,http,forms,router,upgrade}-builds#$PREVIEW_BRANCH --no-optional)
