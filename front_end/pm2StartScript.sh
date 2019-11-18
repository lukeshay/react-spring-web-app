#!/bin/bash
pm2 stop start
pm2 delete start
yarn
export PORT=80
pm2 start node_modules/react-scripts/scripts/start.js
