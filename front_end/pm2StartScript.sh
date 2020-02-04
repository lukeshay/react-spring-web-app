#!/bin/bash
yarn build || exit 1
pm2 update || exit 1
#pm2 stop web-app
#pm2 delete web-app
#yarn deploy
# mv -f dist /var/www/web_app/dist
