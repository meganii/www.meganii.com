# !/bin/bash

if [ "$CF_PAGES_BRANCH" == "main" ]; then
  npm run build

elif [[ $CF_PAGES_BRANCH == bump_amp_* ]]; then
  npm run staging

else
  npm run start
fi