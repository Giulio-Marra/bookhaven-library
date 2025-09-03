FROM eclipse-temurin:21-jdk

WORKDIR /app

# Copy Maven wrapper and pom.xml
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Make mvnw executable
RUN chmod +x ./mvnw

# Download dependencies (this layer will be cached)
RUN ./mvnw dependency:go-offline -B

# Copy source code
COPY src ./src

# Build the application
RUN ./mvnw clean package -DskipTests

EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "target/bookhaven-0.0.1-SNAPSHOT.jar"]