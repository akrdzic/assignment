FROM node:10.15.3

# Create app directory
WORKDIR /usr/src/app

RUN npm install -g nodemon