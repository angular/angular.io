#!/usr/bin/env bash

set -e -o pipefail

BASE="public/docs/ts"
LATEST="$BASE/latest"
CACHE="$BASE/_cache"

FILES="
guide/architecture.jade
guide/attribute-directives.jade
guide/component-styles.jade
guide/dependency-injection.jade
guide/displaying-data.jade
guide/hierarchical-dependency-injection.jade
guide/lifecycle-hooks.jade
guide/pipes.jade
guide/security.jade
guide/server-communication.jade
guide/structural-directives.jade
guide/template-syntax.jade
glossary.jade
quickstart.jade
tutorial/toh-pt5.jade
tutorial/toh-pt6.jade"

function cacheRefresh() {
    local FILE_PATTERN="*"
    if [[ -n "$1" ]]; then
        FILE_PATTERN="$1"
    else
        echo "Argument missing: specify shell file glob pattern of files to be refreshed."
        exit 1;
    fi

    local allFound=true;
    
    for f in $FILES; do
        local srcPath="$LATEST/$f";
        local destPath="$CACHE/$f";
        local destDir=`dirname $destPath`;
        if [[ -e $srcPath ]]; then
            [[ -d "$destDir" ]] || (set -x; mkdir $destDir);
            case "$f" in
                (*$FILE_PATTERN*)
                    (set -x; cp $srcPath $destPath);;
                (*)
                    echo "SKIPPED $f";;
            esac
        else
            echo Cannot find $srcPath
            allFound=false;
        fi
    done

    [[ $allFound ]] || exit 1;
}

function cacheDiffSummary() {
    diff -qr -x "_*.*" "$CACHE/" "$LATEST/" | \
        grep -v "^Only in"
}

function cacheDiff() {
    local FILES="*$1*"
    cd $CACHE;
    # List files
    find . -name "$FILES" ! -name "*~" -exec diff -q {} ../latest/{} \;
    # Show differences
    find . -name "$FILES" ! -name "*~" -exec diff    {} ../latest/{} \;
}

function usage() {
    echo "Usage: cache.sh [-d | -l | -r pattern]"
    echo "  -d      diff cache and latest subdirectories"
    echo "  -l      list files subject to caching"
    echo "  -r pat  refresh files in cache matching pattern"
}

case "$1" in
    (-r|--refresh)        shift; cacheRefresh $@;;
    (-ds|--diff-summary)  shift; cacheDiffSummary $@;;
    (-d|--diff)           shift; cacheDiff $@;;
    (-l)  shift; printf "$FILES\n\n";;
    (*)   usage;
esac
