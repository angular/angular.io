#!/usr/bin/env bash

if [[ -z "$NGIO_ENV_DEFS" ]]; then
    export ANSI_YELLOW="\033[33;1m"
    export ANSI_RESET="\033[0m"
    echo -e "${ANSI_YELLOW}Setting environment variables from scripts/env.sh${ANSI_RESET}"

    export NGIO_ENV_DEFS=1

    export NG2_REPO=../angular
    export NG2DART_REPO=$NG2_REPO-dart

    if [ ! $(type -t travis_fold) ]; then
        # In case this is being run locally. Turn travis_fold into a noop.
        travis_fold () { return; }
        # Alternative definition:
        # travis_fold () { echo -en "travis_fold:${1}:${2}"; }
    fi
    export -f travis_fold

    case "$(uname -a)" in
        Darwin\ *) _OS_NAME=macos ;;
        Linux\ *) _OS_NAME=linux ;;
        *) _OS_NAME=linux ;;
    esac
    export _OS_NAME

    : ${TMP:=$HOME/tmp}
    : ${PKG:=$TMP/pkg}
    export TMP
    export PKG

    if [[ -z "$(type -t dart)" && ! $PATH =~ */dart-sdk/* ]]; then
        export DART_SDK="$PKG/dart-sdk"
        # echo Updating PATH to include access to Dart bin.
        export PATH="$DART_SDK/bin:$PATH"
        export PATH="$HOME/.pub-cache/bin:$PATH"
    fi
fi
