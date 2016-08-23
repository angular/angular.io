#!/usr/bin/env bash

set -e -o pipefail

[[ -z "$NGIO_ENV_DEFS" ]] && . ./scripts/env-set.sh > /dev/null
if [[ "x$1" == "x-v" ]]; then VERBOSE=1; shift; fi

SITE=./www

CHECK_FOR=bad-code-excerpt

LOGFILE_PREFIX=$CHECK_FOR-log
LOGFILE_FULL=$TMP/$LOGFILE_PREFIX-full.txt
LOGFILE=$TMP/$LOGFILE_PREFIX.txt

SKIPFILE_BASE=$CHECK_FOR-skip-patterns.txt
SKIPFILE_SRC=./scripts/config/$SKIPFILE_BASE
SKIPFILE=$TMP/$SKIPFILE_BASE

if [[ ! -d $SITE ]]; then
    echo "Missing site folder $SITE"
    exit 1;
fi

travis_fold start $CHECK_FOR
echo "Searching site for HTML files containing bad code excerpts (BAD FILENAME)."
echo

if [[ -n "$VERBOSE" ]]; then
    travis_fold start $CHECK_FOR-details
    echo "Full file list with grep details:"
    find $SITE -type f -name "*.html" -exec grep -Hne "BAD FILENAME" {} \; | tee $LOGFILE_FULL
    travis_fold end $CHECK_FOR-details
    echo
else
    echo "Full file list:"
    find $SITE -type f -name "*.html" -exec grep -le "BAD FILENAME" {} \; | tee $LOGFILE_FULL
fi

echo
echo "Skip patterns for paths of files known to have issues ($SKIPFILE_SRC):"

perl -pe 's/(\s+|\s*#.*)$/\n/g' $SKIPFILE_SRC | \
    # Remove blank lines \
    grep '.' > $SKIPFILE
cat $SKIPFILE
echo
echo "File list excluding those matching skip patterns:"
grep -v -E -f $SKIPFILE $LOGFILE_FULL | tee $LOGFILE || true

if [[ ! -s $LOGFILE ]]; then
    echo "No matches, all is good!"
    travis_fold end $CHECK_FOR
else
    exit 1;
fi
