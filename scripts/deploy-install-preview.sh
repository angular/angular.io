 #!/usr/bin/env bash

set -ex -o pipefail

./scripts/deploy-install.sh
(cd ../angular && git checkout master)