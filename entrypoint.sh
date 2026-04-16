#!/bin/sh
echo "注入環境變數至 /env.js"
envsubst < /usr/share/nginx/html/env.template.js > /usr/share/nginx/html/env.js
nginx -g "daemon off;"