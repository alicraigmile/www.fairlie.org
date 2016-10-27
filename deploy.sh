#!/bin/bash

set -x

env=$1
username=
if [ -z $env ]
    then
        echo "No environment specified"
        exit 1
fi

host="www.$env.fairlie.xgusties.com"

[[ "$env" == "live" ]] && username="root"
[[ "$env" == "test" ]] && username="alic"

echo "Deploying to $host..."
rsync -av --exclude=.git . $(echo $username)@$(echo $host):/workspace/www.fairlie.org/

