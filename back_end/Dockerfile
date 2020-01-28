FROM adoptopenjdk/openjdk8:latest

RUN mkdir -p /opt/app
ENV PROJECT_HOME /opt/app

WORKDIR $PROJECT_HOME

EXPOSE 8080

COPY . $PROJECT_HOME

EXPOSE 8080

CMD chmod 777 scripts/*.sh

ENTRYPOINT ./scripts/build.sh