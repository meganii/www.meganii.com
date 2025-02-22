# !/bin/bash

if [ "$CF_PAGES_BRANCH" == "main" ]; then
  npm run build
  npx -y pagefind --site public 
else
  npm run staging
fi