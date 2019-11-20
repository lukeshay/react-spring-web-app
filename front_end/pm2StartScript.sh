#!/bin/bash
pm2 stop start
pm2 delete start
yarn
yarn build
pm2 serve dist
