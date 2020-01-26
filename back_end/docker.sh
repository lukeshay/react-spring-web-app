#!/bin/bash
docker build -t rest-api . || exit 1

#docker run -e JWT_SECRET=$JWT_SECRET \
#  -e REFRESH_SECRET=$REFRESH_SECRET \
#  -e ACCESS_KEY=$ACCESS_KEY \
#  -e SECRET_KEY=$SECRET_KEY \
#  rest-api:latest || exit 1

docker-compose up -d || exit 1
