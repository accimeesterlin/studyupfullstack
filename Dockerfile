FROM node:7

WORKDIR /app

COPY . /app

RUN npm install; npm install -g nodemon

EXPOSE 3000


