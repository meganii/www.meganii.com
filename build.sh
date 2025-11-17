# !/bin/bash
export GOPRIVATE=github.com/meganii/vault-content,github.com/meganii/affiliate-data,github.com/meganii/amazon-product-data,github.com/meganii/tweet-data
git config --global url."https://${GO_MODULE_TOKEN_MEGANII_COM}:@github.com/".insteadOf "https://github.com/"
hugo mod graph
go version
hugo build --logLevel info
npx -y pagefind --site public 
