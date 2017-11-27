FROM node:8-alpine
MAINTAINER "moalmeida" <moalmeida@koinosystems.com>

RUN mkdir -p /app
COPY . /app
WORKDIR /app
RUN yarn

CMD ["npm", "start"]
