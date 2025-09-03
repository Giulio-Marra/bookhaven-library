FROM eclipse-temurin:17-jdk

WORKDIR /app

# Copia tutto il progetto
COPY . .

# Rendi mvnw eseguibile
RUN chmod +x mvnw

# Scarica le dipendenze offline
RUN ./mvnw dependency:go-offline

# Costruisci il jar senza test
RUN ./mvnw clean package -DskipTests

EXPOSE 8080

CMD ["java", "-jar", "target/bookhaven-backend-0.0.1-SNAPSHOT.jar"]

