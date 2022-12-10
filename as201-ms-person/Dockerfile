FROM openjdk:17
VOLUME /tmp
EXPOSE 8085
ADD ./target/ms-person-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]