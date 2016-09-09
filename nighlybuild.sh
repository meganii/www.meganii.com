_token=$1

post_data='{ "build_parameters": { "BUNDLE_UPDATE": "true" } }'

curl \
--header "Accept: application/json" \
--header "Content-Type: application/json" \
--data "$post_data" \
--request POST https://circleci.com/api/v1/project/meganii/meganii.com/tree/master?circle-token=${_token}
