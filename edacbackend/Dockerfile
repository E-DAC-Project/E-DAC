# ---------- Build stage ----------
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /workspace


# Copy the build files first to leverage Docker layer caching
COPY pom.xml .
# If you use Maven Wrapper, copy mvnw + .mvn as well
# COPY mvnw .
# COPY .mvn .mvn


# Pre-fetch dependencies (optional but speeds up builds)
RUN mvn -q -B -e -DskipTests dependency:go-offline || true


# Now copy sources and build
COPY src ./src
RUN mvn -q -DskipTests package


# ---------- Runtime stage ----------
FROM eclipse-temurin:17-jre
WORKDIR /app


# Copy the fat jar built by Spring Boot
COPY --from=build /workspace/target/*.jar app.jar


# Allow passing JVM opts from the outside
ENV JAVA_OPTS=""


EXPOSE 8080
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]