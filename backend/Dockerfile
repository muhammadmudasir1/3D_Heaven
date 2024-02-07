FROM node:18.14.2-alpine
WORKDIR /my_app
ADD package.json /my_app/package.json 
COPY . /my_app/
RUN npm install --force
CMD ["node","index.js" ]
EXPOSE 3500

# FROM node:18.14.2-alpine
# WORKDIR /app
# COPY package.json /app
# RUN npm install --force
# COPY . /app
# EXPOSE 3500
# CMD ["node", "index.js"]
