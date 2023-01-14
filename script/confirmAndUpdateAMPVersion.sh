#!/bin/bash

CURRENT=$(cat amp-version.txt)
LATEST=$(npx amp runtime-version)

if [ "$LATEST" -gt "$CURRENT" ]
then
    echo "Update amp runtime version"
    npx amp download --dest themes/tailwindcss/static/amp
    sed -i -e "s/amp\/rtv\/$CURRENT/amp\/rtv\/$LATEST/g" ./themes/tailwindcss/layouts/partials/head.html ./themes/tailwindcss/static/sw.js 
    sed -i -e "s/$CURRENT/$LATEST/g" ./amp-version.txt
else
    echo "Same version"
fi
