#!/bin/bash
docker run \
  -e JWT_SECRET=$JWT_SECRET \
  -e REFRESH_SECRET=$REFRESH_SECRET \
  -e ACCESS_KEY=$ACCESS_KEY \
  -e SECRET_KEY=$SECRET_KEY \
  --entrypoint ./scripts/test.sh \
  rest-api:latest || exit 1
