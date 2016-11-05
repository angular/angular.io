#!/usr/bin/env bash
#
# This script currently requires that the site have been generated
# under $SITE and that it is being served via http://localhost:8080.

set -e -o pipefail

[[ -z "$NGIO_ENV_DEFS" ]] && . ./scripts/env-set.sh > /dev/null
if [[ "x$1" == "x-v" ]]; then VERBOSE=1; shift; fi

SITE=./www

CHECK_FOR=dart-bad-api-links

LOGFILE_PREFIX=$CHECK_FOR-log
LOGFILE_FULL=$TMP/$LOGFILE_PREFIX-full.txt
LOGFILE=$TMP/$LOGFILE_PREFIX.txt

if [[ ! -d $SITE ]]; then
    echo "Missing site folder $SITE"
    exit 1;
fi

cd $SITE
echo "" > $LOGFILE_FULL

# We don't check cookbook pages since they are all empty.
# We don't check api pages because there are currently too many broken links.
for f in docs/dart/latest/{,guide/,tutorial/}*.html; do
  echo "Checking links in $f";
  $(npm bin)/blc -e --get http://localhost:8080/$f >> $LOGFILE_FULL
done
echo ""

echo "Listing broken links, if any:"
grep -i broken $LOGFILE_FULL | grep -v Finished || true
echo ""

echo "Listing links to TS api pages from Dart docs pages, if any:"
grep /api/ $LOGFILE_FULL | grep -v '/api/$' | grep -v /angular2. || true
echo ""

echo "For details consult the full log $LOGFILE_FULL"