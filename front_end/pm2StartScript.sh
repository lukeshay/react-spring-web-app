#!/bin/bash
pm2 stop web-app
pm2 delete web-app
yarn
yarn build
pm2 serve dist --name web-app -- -p 80
