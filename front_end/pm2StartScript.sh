#!/bin/bash
yarn
yarn build
pm2 stop web-app
pm2 delete web-app
pm2 serve dist --name web-app -- 80
