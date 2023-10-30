FROM node:16

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app

COPY . /usr/src/app

RUN npm install

RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache
