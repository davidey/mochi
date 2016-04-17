FROM node:latest
MAINTAINER Davide Petrillo

RUN npm install -g webpack
RUN npm install -g webpack-dev-server
RUN npm install -g add-cors-to-couchdb

WORKDIR /tmp
COPY package.json /tmp/

RUN npm install

WORKDIR /usr/src/app
COPY . /usr/src/app/

RUN cp -a /tmp/node_modules /usr/src/app/

RUN add-cors-to-couchdb

EXPOSE 8080
