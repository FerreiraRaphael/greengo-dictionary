ARG NODE_VERSION

FROM node:12.4.0-alpine

RUN mkdir /home/app
WORKDIR /home/app

CMD yarn dev
