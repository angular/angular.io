#!/usr/bin/env bash

set -e -o pipefail

TARGET=node_modules/terraform/lib/helpers/raw.js

# Around line 282 change from/to:
#   var namespace = sourcePath.split(".")[0].split("/")
#   var namespace = sourcePath.split('.').slice(0, -1).join('.').split('/')

if [ -e "$TARGET" ]; then
    perl -i.bak -pe 's/^(\s+var namespace.*split\("."\))\[0\]/\1.slice(0, -1).join(".")/' "$TARGET"
    echo "Patched '$TARGET'."
else
    echo "Nothing to patch. Can't find file '$TARGET'."
    exit 1;
fi
