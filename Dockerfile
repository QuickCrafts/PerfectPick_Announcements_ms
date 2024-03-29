FROM node:16-alpine

RUN npm install -g ts-node

WORKDIR /perfectpick_announcements_ms

COPY package*.json ./


COPY . .

RUN npm install

EXPOSE 4000

CMD ["npm","start"]