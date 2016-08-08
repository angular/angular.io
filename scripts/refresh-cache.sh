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
quickstart.jade
tutorial/toh-pt6.jade"

function main() {
    local allFound=true;
    
    for f in $FILES; do
        local srcPath="$LATEST/$f";
        local destPath="$CACHE/$f";
        local destDir=`dirname $destPath`;
        if [[ -e $srcPath ]]; then
            [[ -d "$destDir" ]] || (set -x; mkdir $destDir);
            (set -x; cp $srcPath $destPath)
        else
            echo Cannot find $srcPath
            allFound=false;
        fi
    done

    [[ $allFound ]] || exit 1;
}
    
main;
