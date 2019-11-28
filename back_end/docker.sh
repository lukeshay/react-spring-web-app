#!/bin/bash

./gradlew clean build
docker-compose build restapi
docker-compose up --no-deps -d restapi
