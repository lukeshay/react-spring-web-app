#!/bin/bash

./gradlew clean build || exit 1
docker-compose build || exit 1
docker-compose up -d restapi || exit 1
