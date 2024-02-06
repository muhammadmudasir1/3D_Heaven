# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY 
# Expose the port your app runs on
EXPOSE 3500

# Specify environment variables
ENV POSTGRES_HOST=postgres
ENV POSTGRES_PORT=5432
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres
ENV POSTGRES_DB=db
ENV REDIS_HOST=redis
ENV REDIS_PORT=6379

# Install PostgreSQL client
RUN apt-get update && apt-get install -y postgresql-client
