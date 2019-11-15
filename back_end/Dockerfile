FROM adoptopenjdk/openjdk8:latest

RUN mkdir -p /opt/app
ENV PROJECT_HOME /opt/app

COPY build/libs/*.jar $PROJECT_HOME/restapi.jar

WORKDIR $PROJECT_HOME

EXPOSE 8080
ENTRYPOINT ["java","-Dspring.data.mongodb.uri=mongodb://restapi-mongo:27017/springmongo-demo", "-Djava.security.egd=file:/dev/./urandom","-jar","restapi.jar"]