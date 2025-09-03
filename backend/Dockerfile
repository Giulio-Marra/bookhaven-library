# Usa JDK 17 basato su Debian (più compatibile di Alpine)
FROM eclipse-temurin:17-jdk

WORKDIR /app

# Copia Maven Wrapper e pom.xml
COPY mvnw pom.xml ./
COPY .mvn .mvn

# Rendi mvnw eseguibile
RUN chmod +x mvnw

# Scarica le dipendenze offline
RUN ./mvnw dependency:go-offline

# Copia tutto il progetto
COPY . .

# Costruisci il jar senza test
RUN ./mvnw clean package -DskipTests

# Espone la porta di Spring Boot
EXPOSE 8080

# Avvio del jar
CMD ["java", "-jar", "target/bookhaven-backend-0.0.1-SNAPSHOT.jar"]

