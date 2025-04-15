# Use amazonlinux:2023 as the base image
FROM amazonlinux:2023

# Set environment variables
ENV JAVA_HOME=/usr/lib/jvm/java-17-amazon-corretto

# Update system packages
RUN dnf update -y && \
    # Install Git
    dnf install -y git && \
    # Install required packages for Gradle
    dnf install -y findutils which tar gzip procps && \
    # Install Java 17 Amazon Corretto
    dnf install -y java-17-amazon-corretto-devel && \
    # Set up NodeSource repository and install Node.js 18
    curl -fsSL https://rpm.nodesource.com/setup_18.x | bash - && \
    dnf install -y nodejs && \
    # Verify installations
    java -version && \
    node -v && \
    npm -v && \
    # Clean up to reduce image size
    dnf clean all && \
    rm -rf /var/cache/dnf

# Set working directory
WORKDIR /app

# Create directories for both applications
RUN mkdir -p /app/spring-boot-app /app/nextjs-app

# Expose commonly used ports
# 8080 for Spring Boot
# 3000 for Next.js
EXPOSE 8080 3000

# Default command to keep container running
CMD ["bash"]