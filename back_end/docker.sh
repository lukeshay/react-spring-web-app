#!/bin/bash

./gradlew clean build
docker-compose down --rmi all
docker-compose up -d