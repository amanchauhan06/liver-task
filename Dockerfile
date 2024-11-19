# Use Node.js 16 Alpine as base image
FROM node:16-alpine

# Install Redis
RUN apk add --no-cache redis

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Expose ports for Node.js and Redis
EXPOSE 3000 6379

# Create a startup script
COPY docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh

# Use the startup script as entrypoint
ENTRYPOINT ["/docker-entrypoint.sh"]