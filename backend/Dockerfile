FROM node:18.14.2-alpine
WORKDIR /app
COPY . /app
RUN npm install --force
EXPOSE 3500
CMD node index.js

# FROM node:18.14.2-alpine

# # Install necessary dependencies for Puppeteer
# RUN apk add --no-cache \
#     udev \
#     ttf-freefont \
#     chromium \
#     nss \
#     freetype \
#     freetype-dev \
#     harfbuzz \
#     ca-certificates \
#     bash

# # Set environment variable to use Chromium from Puppeteer
# ENV PUPPETEER_EXECUTABLE_PATH="/usr/bin/chromium-browser"

# # Set working directory
# WORKDIR /app

# # Copy package.json and package-lock.json
# COPY package*.json ./

# # Install npm packages
# RUN npm install

# # Copy rest of the application
# COPY . .

# # Expose the port the app runs on
# EXPOSE 3500

# # Command to run the application
# CMD ["node", "--no-sandbox", "index.js"]