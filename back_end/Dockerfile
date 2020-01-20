FROM adoptopenjdk/openjdk8:latest

RUN mkdir -p /opt/app
ENV PROJECT_HOME /opt/app

COPY build/libs/*.jar $PROJECT_HOME/restapi.jar

WORKDIR $PROJECT_HOME

EXPOSE 8080
ENTRYPOINT ["java","-Dspring.data.mongodb.uri=mongodb://rest-api-mongo:27017/rest-api-mongo", "-Djava.security.egd=file:/dev/./urandom", "-DJWT_SECRET=$JWT_SECRET", "-DACCESS_KEY=$ACCESS_KEY", "-DSECRET_KEY=$SECRET_KEY", "-jar","restapi.jar"]