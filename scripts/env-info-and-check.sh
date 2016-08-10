#!/usr/bin/env bash

set -e -o pipefail

[[ -z "$NGIO_ENV_DEFS" ]] && . ./scripts/env-set.sh

travis_fold start env_info
echo ENVIRONMENT INFO
travis_fold start env_info.path
echo Path:
echo $PATH | tr : '\n'
echo
travis_fold end env_info.path
travis_fold start env_info.home
echo Home: $HOME
ls -la ~
echo 
travis_fold end env_info.home
travis_fold start env_info.pwd
echo Pwd: `pwd`
ls -la
echo
travis_fold end env_info.pwd
if [[ 0 ]]; then
    # Not needed anymore, but keeping it at least for the first commit for archival purposes.
    travis_fold start env_info.bash_profile
    echo Bash profile ------------------------------------------------------------
    cat ~/.bash_profile
    travis_fold end env_info.bash_profile
    travis_fold start env_info.bashrc
    echo Bashrc ------------------------------------------------------------------
    cat ~/.bashrc
    echo -------------------------------------------------------------------------
    travis_fold end env_info.bashrc
    travis_fold start env_info.build
    echo build.sh ----------------------------------------------------------------
    cat ~/build.sh
    echo -------------------------------------------------------------------------
    travis_fold end env_info.build
fi
travis_fold end env_info

echo ENVIRONMENT CONFIG CHECK:
if [[ -z "$NGIO_ENV_DEFS" ]]; then
    echo Environment variables are not being set. Aborting.
    exit 1;
else
    echo Environment variables successfully set.
fi
