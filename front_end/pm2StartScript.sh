#!/bin/bash
pm2 stop web-app
pm2 delete web-app
yarn build
yarn deploy
