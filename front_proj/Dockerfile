FROM node:lts-alpine as build-stage

WORKDIR /front

ADD . ./

CMD yarn install && yarn run serve

EXPOSE 8080
