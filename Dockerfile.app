FROM node:latest
MAINTAINER Davide Petrillo

RUN npm install -g webpack
RUN npm install -g webpack webpack-dev-server

WORKDIR /tmp
COPY package.json /tmp/

RUN npm install

WORKDIR /usr/src/app
COPY . /usr/src/app/

RUN cp -a /tmp/node_modules /usr/src/app/

RUN webpack-dev-server

EXPOSE 8080
