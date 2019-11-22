#!/bin/bash

./gradlew clean build
docker ps | awk 'NR != 1{print $1}' | xargs docker stop
docker images | awk 'NR != 1{print $3}' | xargs docker rmi
docker system prune -f
docker-compose up -d