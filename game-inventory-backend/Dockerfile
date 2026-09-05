# Stage 1: Use a Maven image packaged with Eclipse Temurin Java 26
FROM maven:3.9-eclipse-temurin-26 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Stage 2: Create a lightweight runtime using Temurin JRE 26
FROM eclipse-temurin:26-jdk-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080

# Keep the memory flags capped to fit Render's 512MB free tier
ENTRYPOINT ["java", "-Xmx256m", "-Xms128m", "-jar", "app.jar"]

