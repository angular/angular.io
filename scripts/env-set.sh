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

    export TMP=$HOME/tmp
    export PKG=$TMP/pkg

    export DART_SDK="$PKG/dart-sdk"
    if [[ ! $PATH =~ */dart-sdk/* ]]; then
        echo Updating PATH
        export PATH="$DART_SDK/bin:$PATH"
        export PATH="$HOME/.pub-cache/bin:$PATH"
    fi
fi
