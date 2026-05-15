# Use a simple busybox image that listens on port 8081
FROM alpine:latest

# Install netcat to create a simple listening server
RUN apk add --no-cache netcat-openbsd

# Expose the port the app runs on
EXPOSE 8081

# Simple command to listen on port 8081 (replace with actual service when ready)
CMD while true; do nc -l -p 8081 -e /bin/sh -c 'echo -e "HTTP/1.1 200 OK\n\nBooking service placeholder"'; done